<template>
  <div class="roles_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain>添加角色</el-button>
      <el-table :data="rolesList">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!--一级权限-->
            <el-row>
              <el-col :span="4">
                <el-tag closable>权限管理</el-tag>
                <span class="el-icon-caret-right"></span>
              </el-col>
              <el-col :span="20">
                <!--二级权限-->
                <el-row>
                  <el-col :span="8">
                    <el-tag closable type="success">角色列表</el-tag>
                    <span class="el-icon-caret-right"></span>
                  </el-col>
                  <el-col :span="16">
                    <!--三级权限-->
                    <el-tag closable type="warning">添加角色</el-tag>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-tag closable type="success">角色列表</el-tag>
                    <span class="el-icon-caret-right"></span>
                  </el-col>
                  <el-col :span="16">
                    <!--三级权限-->
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                    <el-tag closable type="warning">添加角色</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="100px"></el-table-column>
        <el-table-column property="roleName" label="角色名称"></el-table-column>
        <el-table-column property="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit"  round></el-button>
              <el-button icon="el-icon-delete"  round></el-button>
              <el-button icon="el-icon-setting" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import mixin from './Roles-Mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
</style>
