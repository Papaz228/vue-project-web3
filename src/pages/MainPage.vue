<template>
    <div class="main-page">
      <h1>Main page</h1>
      <div class="user-info">
        <h2>User address: {{ $store.state.userAddress }}</h2>
        <h2>User chain id: {{ $store.state.chainId }}</h2>
      </div>
      <button class="connect-button" @click="connectionWallet">Connect Wallet</button>
      <h1>Users:</h1>
      <div v-if="$store.state.userProfiles">
        <div v-for="currentUser in $store.state.userProfiles" :key="currentUser" class="user-profile" @click="navigateToUser(currentUser)">
          {{ currentUser.name }}
        </div>
      </div>
      <div v-else>No users</div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions(['connectWallet', 'fetchAllUserProfiles']),
      navigateToUser(currentUser) {
        this.$router.push({ path: '/user-profile', query: { user: currentUser } });
      },
      async connectionWallet() {
        await this.connectWallet();
        await this.fetchAllUserProfiles();
      },
    },
  };
  </script>
  
  <style scoped>
  .main-page {
    text-align: center;
  }
  
  .user-info {
    margin-bottom: 20px;
  }
  
  .connect-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .user-profile {
    margin: 10px;
    padding: 10px;
    font-size: 18px;
    background-color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .user-profile:hover {
    background-color: #e0e0e0;
  }
  </style>
  