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
            <el-input v-model="reqParams.query" placeholder="请输入内容">
              <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="dialogFormVisible = true" plain>添加用户</el-button>
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
          :current-page="reqParams.pagenum"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog width="400px" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    // 定义  校验函数
    const checkMobile = (rule, value, callback) => {
      // rule 规则信息  value 验证的输入框的值  callback回调函数 (成功 失败)
      // 1开头 3456789 后面9数字
      // callback回调函数 (成功 不传任何 失败 传失败信息 错误对象)
      if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('手机号不对'))
      callback()
    }
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
      total: 0,
      // 标识当前对话框是否显示
      dialogFormVisible: false,
      // 添加用户表单对象数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          {required: true, message: '用户名必填', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码必填', trigger: 'blur'},
          {min: 6, max: 18, message: '密码6-18个字符串', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱必填', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号必填', trigger: 'blur'},
          // 手机号必须自定义校验规则  通过自己的函数来校验 （rule,value,callback）
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
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
    },
    search () {
      // 根据当前搜索关键字 去查询第一页的数据
      this.reqParams.pagenum = 1
      this.getData()
    },
    addSubmit () {
      // 添加成功后
      // this.dialogFormVisible = false
      // 输入的时候进行数据的验证
      // 请求前点击提交的时候 还要验证一次
    }
  }
}
</script>

<style scoped>
</style>
