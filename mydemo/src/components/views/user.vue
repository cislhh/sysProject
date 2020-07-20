<template>
  <div v-cloak>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button @click="add" type="primary" size="small">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table :data="getStateUserList" border style="width: 100%" row-key="id">
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">正常</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="item">
          <el-button size="small" type="primary" @click="update(item.row.uid)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="del(item.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="pageInfo.size"
      @current-change="getPage"
    >
    </el-pagination>
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '管理员添加' : '管理员编辑'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item
          label="所属角色："
          :label-width="formLabelWidth"
          prop="roleid"
          placeholder="请选择菜单"
        >
          <el-select v-model="menuInfo.roleid" placeholder="请选择">
            <el-option
              v-for="item in getStateRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
              >{{ item.rolename }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item
          label="用户名称："
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="menuInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.password"></el-input>
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
//引入管理员接口
import {
  getuserCount,
  getuserList,
  getuserAdd,
  getuserInfo,
  getuserEdit,
  getuserDelete,
  getuserLnfo
} from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "../common/breadCrumb";
export default {
  data() {
    return {
      //定义总条目
      count: 0,
      menuInfo: {
        status: "1",
        roleid: "",
        username: "",
        password: ""
      },
      pageInfo: {
        size: 2,
        page: 1
      },
      isAdd: true, //添加状态
      formLabelWidth: "100px", //label宽度
      dialogIsShow: false, //是否出现弹框
      // defaultKey: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        roleid: [{ required: true, message: "请选择所属角色", trigger: "blur" }]
      }
    };
  },
  components: {
    breadCrumb
  },
  computed: {
    ...mapGetters(["getStateMenuList", "getStateRoleList", "getStateUserList"])
  },
  mounted() {
    //组件一加载就调取管理员接口
    this.getActionRoleList();
    // this.$store.dispatch("getActionUserList",this.pageInfo);
    this.getCount();
  },
  methods: {
    //获取管理员列表事件
    ...mapActions([
      "getActionRoleList",
      "getActionMenuList",
      "getActionUserList"
    ]),
    //添加
    add() {
      // console.log(1);
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    //  编辑
    update(uid) {
      this.dialogIsShow = true;
      this.isAdd = false;
      //调取管理员查询一条数据
      // this.$http
      //   .get("/api/api/menuinfo", {
      //     params: { id }
      //   })
      getuserInfo({ uid }).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.list);
          this.menuInfo = res.data.list;
          this.menuInfo.status = this.menuInfo.status.toString();
        }
      });
    },
    // 删除
    del(uid) {
      this.$confirm("确定删除这条数据吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除逻辑
          // this.$http.post("/api/api/menudelete", { id })
          getuserDelete({ uid }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getCount();
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
        status: "1",
        roleid: "",
        username: "",
        password: ""
      };
    },
    //提交
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //根据isAdd状态判断执行接口
          if (this.isAdd) {
            //调取添加接口
            //对管理员权限进行数据类型转化（根据后端要求转换相应类型）
            this.menuInfo.roleid = this.menuInfo.roleid.toString();
            getuserAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                // console.log(this.menuInfo)
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getCount();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.menuInfo;
            //调取更新接口
            // this.$http.post("/api/api/menuedit", data)
            getuserEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getCount();
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
    },
    //封装获取总条目接口
    getCount() {
      //调取总条数接口
      getuserCount().then(res => {
        // console.log(res,"123")
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          //如果当前不是第一页平且只有一条数据就让页面的数量--（和action中的list关联）
          if (this.pageInfo.page != 1 && this.getStateUserList.length == 1) {
            this.pageInfo.page--;
          }
          //调取获取用户接口列表的行动
          this.$store.dispatch("getActionUserList", this.pageInfo);
        }
      });
    },
    //当页面发生变化的时候，触发该方法进行页面切换
    getPage(n) {
      // console.log(n,"触发")n是当前页面
      this.pageInfo.page = n;

      //重新调取列表页面
      this.$store.dispatch("getActionUserList", this.pageInfo);
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
.el-pagination{
    float:right;
    margin-top 20px;
}
</style>
