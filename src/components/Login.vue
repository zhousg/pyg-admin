<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png" alt="">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-account" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-eye-slash" type="password" placeholder="请输入密码"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度6-18个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      // 验证表单
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 发送登录的请求
          // 通过 async await 获取响应的结果 去进行处理
          const {data: {data, meta}} = await this.$http.post('login', this.form)
          if (meta.status !== 200) return this.$message.error(meta.msg || '登录失败')
          // 登录成功
          // 保存token  sessionStorage
          sessionStorage.setItem('token', data.token)
          // 跳转 首页
          this.$router.push('/home')
        }
      })
    }
  }
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
    padding: 0 15px;
    box-sizing: border-box;
  }

  .login_container .box img {
    width: 200px;
    display: block;
    margin: 15px auto;
  }
</style>
