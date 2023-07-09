<template>
  <div class="trust-requests-page">
    <h2>Trust Requests Page</h2>
    <div v-if="trustRequests.length > 0">
      <div v-for="(request, index) in trustRequests" :key="index" class="trust-request">
        <p>{{ request }}</p>
        <button class="confirm-button" @click="confirmRequest(request)">Confirm</button>
      </div>
    </div>
    <div v-else>
      <h3>No requests found.</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      trustRequests: [],
    };
  },
  methods: {
    ...mapActions(['getUserTrustRequests', 'confirmTrustRequest']),
    async confirmRequest(request) {
      await this.confirmTrustRequest(request);
      this.trustRequests = await this.getUserTrustRequests(this.$store.state.userAddress);
      console.log('Confirmed request:', request);
    },
    async loadTrustRequests() {
      this.trustRequests = await this.getUserTrustRequests(this.$store.state.userAddress);
    },
  },
  async mounted() {
    await this.loadTrustRequests();
  },
};
</script>

<style scoped>
.trust-requests-page {
  text-align: center;
}

.trust-request {
  margin: 10px;
}

.confirm-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #218838;
}
</style>
