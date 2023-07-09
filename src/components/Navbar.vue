<template>
  <div class="navbar">
    <button @click="$router.push('/')">Main</button>
    <button @click="$router.push('/my-profile')">My Profile</button>
    <button @click="$router.push('/request-confirmation')">Trust Request Confirmation</button>
    <button @click="$router.push('/upload-diploma')">Upload Diploma</button>
  </div>
</template>

<script>
export default {
  name: 'navbar-item',
};
</script>

<style scoped>
.navbar {
  text-align: center;
  margin-bottom: 20px;
}

.navbar button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #218838;
}
</style>
