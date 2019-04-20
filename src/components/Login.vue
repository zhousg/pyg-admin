<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png" alt="">
      <el-button type="primary">主要按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
  .login_container {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ccc, #105763);
  }

  .login_container .box {
    width: 400px;
    height: 250px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    border-radius: 4px;
    background: linear-gradient(45deg, #D2ECF1, #efefef);
  }
  .login_container .box img{
    width: 200px;
    display: block;
    margin: 15px auto;
  }
</style>
