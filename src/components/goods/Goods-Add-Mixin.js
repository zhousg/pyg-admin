export default {
  name: 'Goods-Add',
  data () {
    return {
      // 是当前步骤的索引
      active: 0,
      // 添加商品表单数据
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          {required: true, message: '商品名称必填', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '分类必须是第三级', trigger: 'change'}
        ],
        goods_price: [
          {required: true, message: '商品价格必填', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '商品数量必填', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '商品重量必填', trigger: 'blur'}
        ]
      },
      // 级联相关的数据
      categoryList: [],
      categoryValues: []
    }
  },
  watch: {
    categoryValues (now, old) {
      // 当 categoryValues 值改变的时候
      // form.goods_cat 赋值
      // 如果 categoryValues 的长度不等于3  就不赋值清空
      if (now.length === 3) {
        // 以为','分割的分类列表
        this.form.goods_cat = now.join(',')
      } else {
        this.form.goods_cat = ''
        // this.categoryValues = []
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // changeTab (tab) {
    //   // 根据当去的tab的位置 去切换步骤条的位置
    //   // tab 当请点击的tab的实例对象  包含一些信息
    //   // console.log(tab)  tab.index 就是索引正好对应 步骤条的active数据
    //   this.active = +tab.index
    // },
    handleChange () {
    },
    async getData () {
      // 获取三级分类数据  且赋值给级联组件
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
    },
    changeTabBefore (activeName, oldActiveName) {
      console.log(activeName, oldActiveName)
      // console.log('阻止')
      // 对整个表单进行校验
      // 如果校验失败 阻止切换
      // return false 即可阻止   必须在当前函数的作用域下有效
      // return Promise 对象 执行 reject 阻止
      if (oldActiveName === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              // 校验成功  随着tab的索引去切步骤条
              this.active = +activeName
              resolve()
            } else {
              reject(new Error('校验表单失败'))
            }
          })
        })
      } else {
        // 如果不是第一个选项  随着tab的索引去切步骤条
        this.active = +activeName
      }
    }
  }
}
