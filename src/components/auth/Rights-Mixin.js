export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      // 获取权限列表数据
      const {data: {data, meta}} = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取权限列表数据失败')
      this.rightsList = data
      console.log(data)
    }
  }
}
