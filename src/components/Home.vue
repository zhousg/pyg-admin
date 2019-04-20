<template>
  <el-container class="home_container">
    <el-header class="home_header">Header</el-header>
    <el-container>
      <el-aside class="home_aside" width="200px">Aside</el-aside>
      <el-main class="home_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home_container{
  height: 100%;
}
.home_header{
  background: #373D41;
}
.home_aside{
  background: #333744;
}
.home_main{
  background: #EAEDF1;
}
</style>
