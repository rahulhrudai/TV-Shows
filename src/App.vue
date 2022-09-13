<template>
  <div>
    <NavigationBar/>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import NavigationBar from './Components/NavigationBar'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>
