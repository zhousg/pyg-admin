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
      },
      /* 编辑相关的数据 */
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        roleName: [
          {required: true, message: '角色名称必填', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述必填', trigger: 'blur'}
        ]
      },
      /* 分配权限相关的数据 */
      rightDialogFormVisible: false,
      rightTree: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        // 数据结构中 下一级数据的字段名称
        children: 'children',
        // 显示的文字  的数据字段的名称
        label: 'label'
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 显示分配权限的对话框
    showRightDialog () {
      this.rightDialogFormVisible = true
    },
    // 分配权限
    rightSubmit () {
    },
    // 删除权限
    delRights (row, rightId) {
      this.$confirm('是否删除该权限?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {data, meta}} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        // 更新整个列表  重新展开后  看到操作结果
        // this.getData()
        // 局部更新 当前行的数据  child 数据
        // 当前修改后返回的数据 就是child数据
        // 处理成需要的数据结构
        data.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
        row.child = data
      }).catch(() => {})
    },
    // 显示编辑对话框
    showEditDialog (role) {
      this.editDialogFormVisible = true
      // 填充默认数据
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        // 获取 填充  问题：重置表单的数据  会 清除row的数据
        // this.editForm = role
        // 使用ajax的数据
        const {data: {data, meta}} = await this.$http.get(`roles/${role.id}`)
        if (meta.status !== 200) return this.$message.error('获取角色失败')
        this.editForm = data
      })
    },
    // 提交编辑
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 注意ID是 roleId
          const {data: {meta}} = await this.$http.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑角色失败')
          this.$message.success('编辑角色成功')
          // 关闭编辑对话框  更新列表
          this.editDialogFormVisible = false
          this.getData()
        }
      })
    },
    // 删除
    delRoles (id) {
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {meta}} = await this.$http.delete(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {})
    },
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
