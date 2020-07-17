<template>
  <div v-cloak>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button @click="add" type="primary" size="small">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="上级编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button @click="update(item.row.id)" size="small" type="primary"
            >编辑</el-button
          >
          <el-button @click="del(item.row.id)" size="small" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item
          label="菜单名称："
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="menuInfo.title"></el-input>
        </el-form-item>
        <el-form-item
          label="上级编号："
          :label-width="formLabelWidth"
          prop="pid"
        >
          <el-select v-model="menuInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option label="系统管理" :value="1">系统管理</el-option>
            <el-option label="商城管理" :value="2">商城管理</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.type" label="1">目录</el-radio>
          <el-radio v-model="menuInfo.type" label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标：" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址：" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.url"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
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
//引入菜单接口
import { getMenuList } from "../../utils/axios";
import breadCrumb from "../common/breadCrumb";
export default {
  data() {
    return {
      menuInfo: {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1"
      },
      tableData: [],
      isAdd: true, //添加状态
      formLabelWidth: "100px", //label宽度
      dialogIsShow: false, //是否出现弹框
      editId: 0,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择菜单", trigger: "blur" }]
      }
    };
  },
  components: {
    breadCrumb
  },
  mounted() {
    //组件一加载就调取菜单接口
    this.getMenuList();
  },
  methods: {
    //获取菜单列表事件
    getMenuList() {
      // this.$http
      //   .get("/api/api/menulist")
      getMenuList()//这里的getmenulist取的是上面从axios中引入的菜单列表获取接口
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      //调取菜单查询一条数据
      this.$http
        .get("/api/api/menuinfo", {
          params: { id }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.menuInfo = res.data.list;
            this.menuInfo.type = this.menuInfo.type.toString();
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
          this.$http.post("/api/api/menudelete", { id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getMenuList();
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
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1"
      };
    },
    //提交

    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //根据isAdd状态判断执行接口
          if (this.isAdd) {
            console.log(this.menuInfo, "表单信息");
            //调取添加接口
            this.$http.post("/api/api/menuadd", this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getMenuList();
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
            this.$http.post("/api/api/menuedit", data).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getMenuList();
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
