export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      /* 添加相关的数据 */
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          {required: true, message: '角色名称必填', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述必填', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 显示添加对话框
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加操作
    addSubmit () {
      // 整个表单验证
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 提交添加请求
          const {data: {meta}} = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          // 关闭对话框  更新列表数据
          this.addDialogFormVisible = false
          this.getData()
        }
      })
    },
    async getData () {
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      // 表格的data对数据格式是有固定的要求
      // 以前数据中没有 children 选项
      // 默认认为 有展开内容 而且回去使用children数据
      // 如果数据的结构不符合要求  报错
      // {id: 1, roleName: '管理员', roleDesc: '管理员123'}
      // 把后台返回的数据 处理一下  去除children数据  保留children有的数据
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.rolesList = data
    }
  }
}
