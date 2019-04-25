<template>
  <div class="cate_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="showAddDialog()">添加分类</el-button>
      <el-table
        :data="categories"
        :indent="50"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id">
        <el-table-column
          prop="cat_name"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="cat_deleted"
          label="是否有效">
          <template slot-scope="scope">
            <i v-if="!scope.row.cat_deleted" class="el-icon-success" style="color: green"></i>
            <i v-else class="el-icon-error" style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">一级分类</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level===1">二级分类</el-tag>
            <el-tag type="warning" v-if="scope.row.cat_level===2">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="showEditDialog()" round></el-button>
              <el-button icon="el-icon-delete" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager_container">
        <el-pagination
          @current-change="changePager"
          :page-size="reqParams.pagesize"
          :current-page="reqParams.pagenum"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加分类对话框  title 对话框的标题-->
    <!-- addDialogFormVisible 通过数据控制对话框的显示和隐藏 -->
    <el-dialog title="添加分类" width="400px" :visible.sync="addDialogFormVisible">
      <!-- model属性绑定表单数据对象  label-width 文字的宽度-->
      <!-- rules属性添加校验规则对象的  -->
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="100px" autocomplete="off">
        <el-form-item label="父级分类">
          <!-- 需要级联显示 -->
          <!-- expand-trigger hover 鼠标经过就展开-->
          <!-- options 指定选项的数据 -->
          <!-- v-model 指定选择级联数据的时候去修改的  字段 -->
          <!-- 级联的选择的结果：是一个数组 [一级分类ID,二级分类的ID] -->
          <!-- @change="handleChange" 选择事件 指定了一个处理函数 handleChange-->
          <!-- props =｛value:'选项对象的id字段',label:'选项对象的名称字段'｝ -->
          <el-cascader
            style="width: 100%"
            :props="{value:'cat_id',label:'cat_name'}"
            expand-trigger="hover"
            :change-on-select="true"
            :options="categoryList"
            v-model="categoryValues">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog title="编辑分类" width="400px" :visible.sync="editDialogFormVisible">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="100px" autocomplete="off">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './Categories-Mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>
