export default {
  name: 'Params',
  data () {
    return {
      // 分类级联相关的数据
      categoryList: [],
      // 当前选中的分类的数据包含每一级的分类ID
      categoryValues: [],
      // tabs相关的数据
      activeName: 'many',
      // 控制按钮的禁用状态
      disabled: true,
      // 动态参数列表
      manyAttrs: [],
      // 静态参数列表
      onlyAttrs: [],
      // 对话框相关数据
      addDialogFormVisible: false,
      addForm: {
        attr_name: ''
      },
      addRules: {
        attr_name: [
          {required: true, message: '参数名称必填', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    addSubmit () {
      // 提交添加的参数
      this.$refs.addForm.validate(async valid =>{
        if (valid) {
          // 发请求
          // 获取第三级分类的ID
          const id = this.categoryValues[2]
          const {data: {meta}} = await this.$http.post(`categories/${id}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          })
          if (meta.status !== 201) return this.$message.error('添加参数失败')
          this.$message.success('添加参数成功')
          // 更新列表
          this.getParams()
          // 关闭对话框
          this.addDialogFormVisible = false
        }
      })
    },
    handleChange () {
      // 选择了分类的时候
      this.getParams()
    },
    handleClick () {
      // 切换tab的时候
      this.getParams()
    },
    async getData () {
      // 获取三级分类数据  且赋值给级联组件
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
    },
    async getParams () {
      // 获取参数列表数据  获取的两种
      // 传递的数据需要准备   三级分类ID  当前选中的参数类型 动态 静态 activeName
      //  三级分类ID  首先要判断是否有三级分类
      const len = this.categoryValues.length
      if (len === 3) {
        // 选了三级
        const id = this.categoryValues[len - 1]
        // 发请求获取数据
        const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {
          params: {sel: this.activeName}
        })
        if (meta.status !== 200) return this.$message.error('获取参数数据失败')
        // 参数列表获取成功 显示列表 依赖数据  data定义数据
        // 给谁赋值数据？？？  根据当前选中的tab去给  manyAttrs onlyAttrs 赋值
        // 根据当前的 activeName 去找到对应的列表  赋值
        this[`${this.activeName}Attrs`] = data
        this.disabled = false
      } else {
        // 没选三级
        // 清空当前不符合要求的选择
        this.categoryValues = []
        this.disabled = true
      }
    }
  }
}
