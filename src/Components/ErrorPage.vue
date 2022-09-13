<template>
  <div class="text-center">
    <h3 class="m-5">Error : {{ error }}</h3>
    <b-button pill variant="info" @click="goToHome">Go To Home Page</b-button>
  </div>
</template>
<script>
export default {
  name: 'ErrorPage',
  props: ['error'],
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>
