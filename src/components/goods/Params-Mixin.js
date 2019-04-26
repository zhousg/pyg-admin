export default {
  name: 'Params',
  data () {
    return {
      // 分类级联相关的数据
      categoryList: [],
      categoryValues: [],
      // tabs相关的数据
      activeName: 'many',
      disabled: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleChange () {
    },
    async getData () {
      // 获取三级分类数据  且赋值给级联组件
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      console.log(data)
      this.categoryList = data
    }
  }
}
