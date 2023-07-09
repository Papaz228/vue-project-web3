<template>
  <div class="rate-skill">
    <h2>Rate Skill</h2>
    <div class="skill-info">
      <label>Skill Name: {{ skillName }}</label>
      <div class="form-group">
        <label>Rating (1-5):</label>
        <input v-model.number="rating" type="number" min="1" max="5" />
      </div>
      <div class="form-group">
        <label>Comment:</label>
        <input v-model="comment" type="text" placeholder="Enter Your Comment" />
      </div>
    </div>
    <button class="rate-button" @click="handleRateSkill">Rate Skill</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      rating: 1,
      comment: '',
      skillName: '',
      targetUser: ''
    };
  },
  methods: {
    ...mapActions(['rateSkill']),
    async handleRateSkill() {
      if (!this.skillName || this.rating < 1 || this.rating > 5) {
        console.error('Please enter a valid Skill Name and Rating between 1 and 5.');
        return;
      }

      const success = await this.rateSkill([this.skillName, this.rating, this.comment, this.targetUser]);

      if (success) {
        console.log('Skill rated successfully!');
      } else {
        console.error('Failed to rate skill.');
      }
    },
  },
  mounted() {
    let [skillName, targetUser] = this.$route.query.user;
    this.skillName = skillName;
    this.targetUser = targetUser;
  },
};
</script>

<style scoped>
.rate-skill {
  text-align: center;
}

.skill-info {
  margin-bottom: 20px;
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

.rate-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.rate-button:hover {
  background-color: #218838;
}
</style>
