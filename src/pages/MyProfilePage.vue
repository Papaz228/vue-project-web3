<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <template v-if="userProfileExists">
      <div class="profile-item">
        <label>Name:</label>
        <span>{{ $store.state.userProfile.name }}</span>
      </div>
      <div class="profile-item">
        <label>Contact Information:</label>
        <span>{{ $store.state.userProfile.contactInformation }}</span>
      </div>
      <div class="profile-item">
        <label>Social Links:</label>
        <span>{{ $store.state.userProfile.socialLinks }}</span>
      </div>
      <div class="profile-item">
        <label>User Address:</label>
        <span>{{ $store.state.userProfile.userProfileAddress }}</span>
      </div>
      <div class="profile-item">
        <label>Add Skill:</label>
        <input v-model="newSkill" type="text" placeholder="Enter Skill" />
        <button @click="addUserSkill">Add Skill</button>
      </div>
      <div class="profile-images">
        <div v-for="(url, index) in profileImageURLs" :key="index">
          <img :src="url" :alt="'Profile Image ' + (index + 1)" />
        </div>
      </div>
      <div v-if="userSkills.length > 0">
        <h3>User Skills:</h3>
        <ul>
          <li v-for="skill in userSkills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
      <div v-if="userRatings.length > 0">
        <h3>User Ratings:</h3>
        <h4>Summary Rating: {{ summarize }}</h4>
        <ul>
          <li v-for="rate in userRatings" :key="rate">{{ rate }}</li>
        </ul>
      </div>
    </template>
    <template v-else>
      <h3>No profile found.</h3>
      <create-profile @profile-created="handleProfileCreated" />
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newSkill: "",
      userSkills: [],
      userRatings: [],
      summarize: 0,
      profileImageURLs: [],
    };
  },
  computed: {
    userProfileExists() {
      const { userProfile } = this.$store.state;
      return userProfile && userProfile.name && userProfile.contactInformation && userProfile.socialLinks;
    },
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'fetchAllUserSkills', 'fetchAllUserRatings', 'addSkill', 'getUserSkillRatingsAverage', 'getUserTokenLinks']),
    async handleProfileCreated() {
      await this.fetchUserProfile(this.$store.state.userAddress);
    },
    async addUserSkill() {
      if (!this.newSkill) {
        console.error('Please enter a skill.');
        return;
      }

      const success = await this.addSkill(this.newSkill);
      if (success) {
        console.log('Skill added successfully!');
      } else {
        console.error('Failed to add skill.');
      }
      this.userSkills = await this.fetchAllUserSkills(this.$store.state.userAddress);
      this.newSkill = '';
    },
  },
  async mounted() {
    await this.fetchUserProfile(this.$store.state.userAddress);
    this.userSkills = await this.fetchAllUserSkills(this.$store.state.userAddress);
    this.userRatings = await this.fetchAllUserRatings(this.$store.state.userAddress);
    this.summarize = await this.getUserSkillRatingsAverage(this.$store.state.userAddress);
    this.profileImageURLs = await this.getUserTokenLinks(this.$store.state.userAddress);
  },
};
</script>

<style scoped>
.user-profile {
  text-align: center;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.profile-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-item label {
  font-weight: bold;
  margin-right: 10px;
}

.profile-item span {
  font-size: 16px;
}

.profile-item input {
  padding: 5px;
  margin-right: 10px;
}

.profile-item button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.profile-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.profile-images img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 5px;
}

h3 {
  margin-bottom: 10px;
}

h4 {
  margin-top: 10px;
}
</style>
