<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <div class="router-container">
      <router-view/>
    </div>

  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
export default {
  components: {
    NavigationBar
  },
}
</script>
<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
.router-container {
  max-width: 1000px;
  margin: 0px auto;
}
.btn {
  font-size: 14px !important;
  font-weight: bold !important;
  text-transform: uppercase;
  margin: 10px 0px 20px 0px;
}
.content-container {
  margin: 20px 40px;
}
</style>
