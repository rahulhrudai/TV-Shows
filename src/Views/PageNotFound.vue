<template>
<div>
    <img class="card-img-top rounded" src="../assets/PageNotFound.jpg" alt="Page Not Found"/>
      <center>
        <h3 class="card-text p-3">This Page Doesn't Exist</h3>
        <b-button pill variant="info" @click="goToHome">Go To Home Page</b-button>
      </center>
      </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
img{
  display: block;
  width:50%;
  height:auto;
  margin-left: auto;
  margin-right: auto;
  margin-top:20px;
  border:5px solid black;
}
</style>
