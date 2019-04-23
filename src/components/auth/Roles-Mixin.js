export default {
  name: 'Roles',
  data () {
    return {
      rolesList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
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
