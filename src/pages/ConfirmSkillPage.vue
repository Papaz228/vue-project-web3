<template>
  <div class="confirm-skill">
    <h2>Confirm Skill</h2>
    <div class="form-group">
      <label for="request-index">Request Index:</label>
      <input v-model.number="requestIndex" id="request-index" type="number" placeholder="Enter Request Index" />
    </div>
    <div class="form-group">
      <label for="comment">Comment:</label>
      <input v-model="comment" id="comment" type="text" placeholder="Enter Comment" />
    </div>
    <button class="confirm-button" @click="handleConfirmSkill">Confirm Skill</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      requestIndex: 0,
      comment: '',
    };
  },
  methods: {
    ...mapActions(['confirmSkill']),
    async handleConfirmSkill() {
      if (!this.requestIndex) {
        console.error('Please enter a valid request index.');
        return;
      }

      const success = await this.confirmSkill(this.requestIndex - 1, this.comment);

      if (success) {
        console.log('Skill confirmed successfully!');
      } else {
        console.error('Failed to confirm skill.');
      }
    },
  },
};
</script>

<style scoped>
.confirm-skill {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="number"],
input[type="text"] {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
