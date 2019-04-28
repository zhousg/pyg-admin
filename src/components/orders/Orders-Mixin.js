export default {
  name: 'Orders',
  data () {
    return {
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      ordersList: [],
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    search () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    async getData () {
      const {data: {data, meta}} = await this.$http.get('orders', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取订单信息失败')
      this.ordersList = data.goods
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    }
  }
}
