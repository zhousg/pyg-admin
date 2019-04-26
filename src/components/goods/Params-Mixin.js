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
  // 计算属性：函数的名字就是一个数据的字段名称  使用和data中申明的数据一样
  computed: {
    id: function () {
      // 为了严谨  程序更加健壮
      if (this.categoryValues.length === 3) {
        return this.categoryValues[2]
      } else {
        return null
      }
    }
  },
  methods: {
    // 隐藏input事件
    hideInput (row) {
      row.inputShow = false
      if (row.inputValue) {
        // 当前input输入的内容 追加到 attr_vals 中
        row.attr_vals.push(row.inputValue)
        // 把修改好的数据给后台
        this.editAttr(row)
        row.inputValue = ''
      }
    },
    // 显示input的事件
    showInput (row) {
      row.inputShow = true
      // dom.focus() 获取焦点  dom 当前行的input
      console.log(this.$refs['input' + row.attr_id])
      this.$nextTick(() => {
        this.$refs['input' + row.attr_id].focus()
      })
    },
    // tag关闭事件
    delTag (row, i) {
      // 删除tag的效果  并没有真正的去修改后台的数据
      row.attr_vals.splice(i, 1)
      // 把修改好的数据给后台
      this.editAttr(row)
    },
    async editAttr (row) {
      // 根据现在的arr去修改后台的参数的值
      const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(',')
      })
      if (meta.status !== 200) return this.$message.error('更新参数值失败')
      this.$message.success('更新参数值成功')
    },
    // 删除参数
    delParams (attrId) {
      this.$confirm('是否删除该参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // :id 传 分类的ID
        const id = this.categoryValues[2]
        // :attrid 就是当前的参数ID
        const {data: {meta}} = await this.$http.delete(`categories/${id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error('删除参数失败')
        this.$message.success('删除参数成功')
        // 更新当前的列表
        this.getParams()
      }).catch(() => {})
    },
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    addSubmit () {
      // 提交添加的参数
      this.$refs.addForm.validate(async valid => {
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

        // data attr_vals是一个字符串 条件动态参数的时候才需要转换数组
        if (this.activeName === 'many') {
          data.forEach(item => {
            // 如果attr_vals=''  去使用split() 产生 ['']
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
            // 添加字段 inputShow 控制tag和input显示隐藏
            item.inputShow = false
            item.inputValue = ''
          })
        }

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
