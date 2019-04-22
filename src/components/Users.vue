<template>
  <div class="users_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 和 添加按钮 镂空 -->
      <!-- 槽宽  :gutter="20"  :span="6" 多少份  默认24份-->
      <el-row :gutter="20">
        <el-col :span="6">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <!-- 使用当前行的数据  scope.row  状态 scope.row.mg_state -->
            <!-- el-switch 默认使用布尔值  如果为true激活 反之...  -->
            <!-- active-color="#13ce66" 激活   inactive-color="#ff4949" 没激活颜色 -->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button-group>
            <el-button icon="el-icon-edit" round></el-button>
            <el-button icon="el-icon-delete" round></el-button>
            <el-button icon="el-icon-setting" round></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pager_container">
        <el-pagination
          @current-change="changePager"
          :page-size="reqParams.pagesize"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      // 用户列表
      userList: [],
      // 传参
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 总条数
      total: 0
    }
  },
  mounted () {
    // 用户列表数据获取
    this.getData()
  },
  methods: {
    async getData () {
      // 1. get请求  参数本来url?后面
      // 2. 联想post传参  post(url,{参数})
      // 3. get传参  get(url,{params:{参数}})
      const {data: {data, meta}} = await this.$http.get('users', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取用户属性失败')
      // 列表数据
      this.userList = data.users
      // 总条数
      this.total = data.total
    },
    changePager (newPage) {
      // 进行分页查询  需求：当前页码
      // 获取数据 前 要使用当前页码
      this.reqParams.pagenum = newPage
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
