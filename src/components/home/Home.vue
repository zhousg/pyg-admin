<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button icon="iconfont icon-menu" @click="toggleMenu()" size="mini" circle></el-button>
      <span class="title">品优购后台管理系统</span>
      <el-button class="logout" type="danger" size="mini" round @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside" :width="collapse?'65px':'180px'">
        <el-menu
          :default-active="$route.name"
          router
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          style="border: none; margin-top: 5px"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--一级菜单-->
          <!-- 注意： 一级菜单 index 和 二级菜单 index 是有从属关系的 -->
          <!-- 一级菜单的索引 id  二级菜单的索引  item.id-lastItem.id -->
          <el-submenu :index="item.id.toString()" v-for="(item,i) in menus" :key="item.id">
            <template slot="title">
              <i :class="['iconfont',iconArr[i]]"></i>
              <span>&nbsp;{{item.authName}}</span>
            </template>
            <!--二级菜单  只要index唯一就可以了 -->
            <el-menu-item :index="lastItem.path" v-for="lastItem in item.children" :key="lastItem.id">
              <i class="el-icon-menu"></i>
              <span>{{lastItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      menus: [],
      iconArr: ['icon-user-fill', 'icon-cog', 'icon-shoppingcart', 'icon-file', 'icon-chart-area']
    }
  },
  mounted () {
    // 获取菜单数据
    this.getData()
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    async getData () {
      // 获取数据
      const {data: {data, meta}} = await this.$http.get('menus')
      // 判断获取是否成功  注意：添加操作 201  其他操作 200
      if (meta.status !== 200) return this.$message.error('获取菜单失败')
      // 已经成功  修改data中的菜单数据
      this.menus = data
      // 更新视图  前提是视图用了该数据
      // 去视图 用户指令  渲染出来
    },
    logout () {
      // 思考： 清除token  就是退出   但是跳转登录页
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home_container{
  height: 100%;
}
.home_header{
  background: #373D41;
  line-height: 60px;
}
.home_aside{
  background: #333744;
}
.home_main{
  background: #fff;
}
  .title{
    color: #ccc;
    font-size: 18px;
    padding-left: 20px;
  }
  .logout{
    float: right;
    margin-top: 15px;
  }
</style>
