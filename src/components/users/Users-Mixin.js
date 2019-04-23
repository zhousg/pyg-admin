// 满足模块化规范
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
        pagesize: 5
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
      },
      // 控制分配角色对话框的显示隐藏
      roleDialogFormVisible: false,
      // 选中角色的值
      roleValue: '',
      // 当前用户的 用户名
      roleUserName: '',
      // 当前用户的 角色
      roleUserRoleName: '',
      // 用户的ID
      roleUserId: '',
      // 角色下拉所有选项
      options: [],
      /* 数据和编辑相关 */
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
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
    async showEditDialogFormVisible (id) {
      // 显示编辑对话框
      this.editDialogFormVisible = true
      // 可能需要重置表单
      // 填充数据
      // 发请求需要用户的ID
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      // 把数据展示表单内
      this.editForm = data
    },
    editSubmit () {
      // 编辑的提交
      // 整个表单的校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 校验成功
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success('修改成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
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
      // 输入的时候进行数据的验证
      // 请求前点击提交的时候 还要验证一次
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 请求后台
          const {data: {meta}} = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          // 添加成功后
          this.dialogFormVisible = false
          // 更新列表
          this.getData()
        }
      })
    },
    showDialogForm () {
      // 注意： 只有先渲染 找到dom
      // 显示添加对话框
      this.dialogFormVisible = true
      // 重置表单  内容  验证

      // 等对话框组件渲染完毕在去做dom操作
      // setTimeout(() => {
      //   this.$refs.addForm.resetFields()
      // }, 0)
      // 下一帧  要做的事情
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    delUsers (id) {
      // 删除用户 ID
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {meta}} = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {})
    },
    async updateState (id, newState) {
      // id 用户的ID newState 已改变的状态
      // console.log(id, newState)
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    },
    async showRoleDialogFormVisible (row) {
      // 打开对话框
      this.roleDialogFormVisible = true
      // 渲染下拉菜单
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data
      // 当前用户的信息  获取用户信息
      // const {data: {data: ud, meta: um}} = await this.$http.get(`users/${id}`)
      // if (um.status !== 200) return this.$message.error('获取用户失败')
      // console.log(ud)
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
    },
    async changeRole () {
      const {data: {meta}} = await this.$http.put(`users/${this.roleUserId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleDialogFormVisible = false
      this.getData()
    }
    // 需求：编辑功能
    // 1. 准备编辑对话框  根据添加对话框修改
  }
}
