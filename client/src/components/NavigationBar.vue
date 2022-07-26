<template>
  <div id="nav-bar">
    <div id="nav-bar__left">
      <!-- <h5>SWE6633 - Group 5 </h5> -->
      <router-link to="/"><b-button variant="primary" >Home</b-button></router-link>
      <router-link to="/projects"><b-button variant="primary" class="mx-3">Projects</b-button></router-link>
      <router-link to="/users"><b-button variant="primary" class="mr-3">Users</b-button></router-link>

    </div>
    <div id="nav-bar__right">
      <!-- <router-link to="/projects"><b-button variant="primary" class="mx-3">Projects</b-button></router-link> -->
      <!-- <router-link to="/users"><b-button variant="primary" >Users</b-button></router-link> -->
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>
#nav-bar {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(230, 230, 230);
  margin: 0px 0px 40px 0px;
}
</style>