<template>
  <div class="users_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 和 添加按钮 镂空 -->
      <!-- 槽宽  :gutter="20"  :span="6" 多少份  默认24份-->
      <el-row :gutter="20">
        <el-col :span="6">
            <el-input v-model="reqParams.query" placeholder="请输入内容">
              <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="showDialogForm()" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <!-- 使用当前行的数据  scope.row  状态 scope.row.mg_state -->
            <!-- el-switch 默认使用布尔值  如果为true激活 反之...  -->
            <!-- active-color="#13ce66" 激活   inactive-color="#ff4949" 没激活颜色 -->
            <el-switch
              @change="updateState(scope.row.id,scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="showEditDialogFormVisible(scope.row.id)" round></el-button>
              <el-button icon="el-icon-delete" @click="delUsers(scope.row.id)" round></el-button>
              <el-button icon="el-icon-setting" @click="showRoleDialogFormVisible(scope.row)" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
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
    <!--添加用户-->
    <el-dialog width="400px" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!--分配角色-->
    <el-dialog width="400px" title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form label-width="100px" autocomplete="off">
        <el-form-item label="当前用户：">
          {{roleUserName}}
        </el-form-item>
        <el-form-item label="当前用户：">
          {{roleUserRoleName}}
        </el-form-item>
        <el-form-item label="分配角色：">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑用户-->
    <el-dialog width="400px" title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
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
import mixin from './Users-Mixin'
export default {
  // 混入  USERS-MIXIN 文件代码
  mixins: [mixin]
}
</script>

<style scoped>
</style>
