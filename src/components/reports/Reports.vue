<template>
  <div class="reports_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div ref="box"  class="box"></div>
    </el-card>
  </div>
</template>

<script>
/* 1. 引入 echarts 插件 */
import echarts from 'echarts'
/* 2. 准备一个容器 */
/* 3. 实例化echarts对象 需要容器dom */
/* 4. 需要符合echarts规则的配置项 */
/* 5. 设置配置项给实例 */
export default {
  name: 'Reports',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  mounted () {
    // const dom = this.$refs.box
    // const myEcharts = echarts.init(dom)
    /* const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    } */
    // options 需要去后台获取

    // myEcharts.setOption(this.options)
    this.getData()
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('reports/type/1')
      if (meta.status !== 200) return this.$message.error('获取报表数据失败')
      // 后台给的配置项  和 现在的options 进行合并 然后给图表使用
      const myEcharts = echarts.init(this.$refs.box)
      // Object.assign(o1,o2)  注意：如果有相同key 后面的生效
      const options = {...this.options, ...data}
      myEcharts.setOption(options)
    }
  }
}
</script>

<style scoped>
  .box {
    width: 600px;
    height: 450px;
  }
</style>
