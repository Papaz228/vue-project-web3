<template>
  <div class="user">
    <div class="user-info">
      <div>Name: {{ user.name }}</div>
      <div>Contact Information: {{ user.contactInformation }}</div>
      <div>Social Links: {{ user.socialLinks }}</div>
      <div>User Profile Address: {{ user.userProfileAddress }}</div>
    </div>
    <button class="trust-button" @click="sendTrust">Send Trust Request</button>
    <button class="show-skills-button" @click="showSkills">Show Skills</button>
    <div v-if="showSkillsFlag">
      <h3>User Skills:</h3>
      <div v-for="skill in userSkills" :key="skill">
        {{ skill }}
        <button class="rate-skill-button" @click="rateSkill(skill, user.userProfileAddress)">Rate This Skill</button>
      </div>
      <button class="show-ratings-button" @click="showRatings">Show Ratings</button>
      <div v-if="showRatingsFlag">
        <h3>User Ratings:</h3>
        <h4>Rating Summary: {{ summarize }}</h4>
        <div v-for="rate in userRatings" :key="rate">
          {{ rate }}
        </div>
      </div>
    </div>
    <button class="show-diplomas-button" @click="showDiplomas">Show Diplomas</button>
    <div v-if="showDiplomasFlag">
      <h3>Diplomas:</h3>
      <div v-for="(url, index) in profileImageURLs" :key="index">
        <img :src="url" :alt="'Profile Image ' + (index + 1)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      showSkillsFlag: false,
      showRatingsFlag: false,
      showDiplomasFlag: false,
      userSkills: [],
      userRatings: [],
      user: {},
      summarize: 0,
      profileImageURLs: [],
    };
  },

  methods: {
    ...mapActions({
      fetchUserSkills: 'fetchAllUserSkills',
      fetchUserRatings: 'fetchAllUserRatings',
      getUserSkillRatingsAverage: 'getUserSkillRatingsAverage',
      getUserTokenLinks: 'getUserTokenLinks',
      sendTrustRequest: 'sendTrustRequest',
    }),

    async showSkills() {
      this.showSkillsFlag = true;
      this.userSkills = await this.fetchUserSkills(this.user.userProfileAddress);
    },

    async showRatings() {
      this.showRatingsFlag = true;
      this.userRatings = await this.fetchUserRatings(this.user.userProfileAddress);
      this.summarize = await this.getUserSkillRatingsAverage(this.user.userProfileAddress);
    },

    async showDiplomas() {
      this.showDiplomasFlag = true;
      this.profileImageURLs = await this.getUserTokenLinks(this.user.userProfileAddress);
      console.log(this.profileImageURLs);
    },

    async sendTrust() {
      this.sendTrustRequest(this.user.userProfileAddress);
    },

    rateSkill(skill, user) {
      this.showSkillsFlag = false;
      this.showRatingsFlag = false;
      this.$router.push({ path: '/rate-skill', query: { user: [skill, user] } });
    },
  },

  mounted() {
    let [username, contactInformation, socialLinks, userProfileAddress] = this.$route.query.user;
    this.user = { name: username, contactInformation: contactInformation, socialLinks: socialLinks, userProfileAddress: userProfileAddress };
  },
};
</script>

<style scoped>
.user {
  text-align: center;
}

.user-info {
  margin-bottom: 20px;
}

.trust-button,
.show-skills-button,
.show-ratings-button,
.show-diplomas-button,
.rate-skill-button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.show-skills-button:hover,
.show-ratings-button:hover,
.show-diplomas-button:hover,
.rate-skill-button:hover {
  background-color: #218838;
}

.user-skills,
.user-ratings {
  margin-bottom: 20px;
}

.user-skills li,
.user-ratings li {
  margin: 5px;
}

h3 {
  margin-bottom: 10px;
}

h4 {
  margin-top: 10px;
}

.show-diplomas-button {
  margin-top: 20px;
}

.profile-images img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 5px;
}
</style>
