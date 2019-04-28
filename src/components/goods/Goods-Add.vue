<template>
  <div class="goods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="请按照步骤录入商品信息"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-steps style="margin: 15px 0" align-center :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-tabs :before-leave="changeTabBefore" tab-position="left" >
        <el-tab-pane label="基本信息">
          <el-form ref="form" :model="form" :rules="rules" label-width="200px" autocomplete="off">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                clearable
                style="width: 200px"
                expand-trigger="hover"
                :options="categoryList"
                v-model="categoryValues"
                :props="{value:'cat_id',label:'cat_name'}"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="form.goods_price" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="form.goods_number" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="form.goods_weight" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form label-width="200px">
            <el-form-item v-if="item.attr_vals" v-for="(item,i) in manyAttrs" :key="i" :label="item.attr_name">
              <el-tag v-for="(tag,i) in item.attr_vals.split(',')" :key="i">{{tag}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-width="200px">
            <el-form-item v-if="item.attr_vals" v-for="(item,i) in onlyAttrs" :key="i" :label="item.attr_name">
              <el-tag style="width: 300px">{{item.attr_vals}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- action 图片上传提交的地址 -->
          <!-- upload 是一个相对地址  相对 baseURL  -->
          <el-upload
            :on-success="handleSuccess"
            :action="action"
            :headers="headers"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="form.goods_introduce"></quill-editor>
          <el-button style="margin-top: 20px" type="success" @click="addSubmit()">保存商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mixin from './Goods-Add-Mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
.el-tag{
  margin: 5px;
}

</style>
