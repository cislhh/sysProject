<template>
  <div v-cloak>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button @click="add" type="primary" size="small">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table
      :data="getStateRoleList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">正常</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="item">
          <el-button size="small" type="primary" @click="update(item.row.id)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="del(item.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '角色添加' : '角色编辑'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item
          label="角色名称："
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="menuInfo.rolename"></el-input>
        </el-form-item>

        <el-form-item
          label="角色权限："
          :label-width="formLabelWidth"
          prop="rolename"
          
        >
          <el-tree
            :data="getStateMenuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            :default-checked-keys="defaultKey"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.status" label="1">正常</el-radio>
          <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('menuInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('menuInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入角色接口
import {
  getRoleAdd,
  getRoleInfo,
  getRoleEdit,
  getRoleDelete
} from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "../common/breadCrumb";
export default {
  data() {
    return {
      menuInfo: {
        rolename: "",
        menus: "",
        status: "1"
      },
      isAdd: true, //添加状态
      formLabelWidth: "100px", //label宽度
      dialogIsShow: false, //是否出现弹框
      editId: 0,
      defaultKey:[],
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  components: {
    breadCrumb
  },
  computed: {
    ...mapGetters(["getStateMenuList", "getStateRoleList"])
  },
  mounted() {
    //组件一加载就调取角色接口
    //触发才调取vuex中的角色列表
    this.getActionRoleList();
    this.getActionMenuList();
  },
  methods: {
    //获取角色列表事件
    ...mapActions(["getActionRoleList", "getActionMenuList"]),
    //添加
    add() {
      console.log(1);
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    //  编辑
    update(id) {
      this.dialogIsShow = true;
      this.isAdd = false;
      //给id赋值
      this.editId = id;
      //调取角色查询一条数据
      // this.$http
      //   .get("/api/api/menuinfo", {
      //     params: { id }
      //   })
      getRoleInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.menuInfo = res.data.list;
          this.defaultKey = this.menuInfo.menus
                        ? this.menuInfo.menus.split(',')
                        : []
          this.menuInfo.status = this.menuInfo.status.toString();
        }
      });
    },
    // 删除
    del(id) {
      this.$confirm("确定删除这条数据吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除逻辑
          // this.$http.post("/api/api/menudelete", { id })
          getRoleDelete({ id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getActionRoleList();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 关闭弹窗事件
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    //重置输入内容
    reset() {
      this.menuInfo = {
        rolename: "",
        menus: "",
        status: "1"
      };
      this.$refs.tree.setCheckedKeys([]); //重置树形结构的key值
    },
    //提交

    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.menuInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
          //根据isAdd状态判断执行接口
          if (this.isAdd) {
            //调取添加接口
            // console.log(this.menuInfo)
            console.log(this.$refs.tree.getCheckedKeys())
            //对角色权限进行数据类型转化（根据后端要求转换相应类型）
            getRoleAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionRoleList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.menuInfo;
            data.id = this.editId;
            //调取更新接口
            // this.$http.post("/api/api/menuedit", data)
            getRoleEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionRoleList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
[v-clock]{
    dispaly:none
}

.el-button {
    margin-bottom: 10px;
}

.el-input {
    width: 85%;
}
</style>
