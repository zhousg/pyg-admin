<template>
  <div class="params_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意：只有第三级分类才能设置参数。"
        type="warning"
        show-icon>
      </el-alert>
      <el-form style="margin: 15px 0">
        <el-form-item label="选择商品分类：">
          <el-cascader
            expand-trigger="hover"
            :options="categoryList"
            v-model="categoryValues"
            :props="{value:'cat_id',label:'cat_name'}"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <!-- activeName 就是当前选中的tab的name的值  -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="success" :disabled="disabled">添加动态参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button type="success" :disabled="disabled">添加静态参数</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mixin from './Params-Mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>
