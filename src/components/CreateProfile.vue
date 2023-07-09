<template>
  <div class="create-profile">
    <h2>Create Profile</h2>
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="name" id="name" type="text" placeholder="Enter Name" />
    </div>
    <div class="form-group">
      <label for="contact-info">Contact Information:</label>
      <input v-model="contactInfo" id="contact-info" type="text" placeholder="Enter Contact Information" />
    </div>
    <div class="form-group">
      <label for="social-links">Social Links:</label>
      <input v-model="socialLinks" id="social-links" type="text" placeholder="Enter Social Links" />
    </div>
    <button class="create-profile-button" @click="handleCreateProfile">Create Profile</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'create-profile',
  data() {
    return {
      name: '',
      contactInfo: '',
      socialLinks: '',
    };
  },
  methods: {
    ...mapActions({
      createProfile: 'createProfile',
    }),
    async handleCreateProfile() {
      if (!this.name || !this.contactInfo) {
        console.error('Please enter both Name and Contact Information.');
        return;
      }
      const success = await this.createProfile([this.name, this.contactInfo, this.socialLinks]);

      if (success) {
        console.log('Profile created successfully!');
      } else {
        console.error('Failed to create profile.');
      }
      this.$emit('profile-created');
    },
  },
};
</script>

<style scoped>
.create-profile {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"] {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-profile-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-profile-button:hover {
  background-color: #218838;
}
</style>
