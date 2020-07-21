<template>
  <div>
    <!-- 弹框内容 -->
    <el-dialog
      :title="addInfo.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="addInfo.dialogIsShow"
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
          label="上级菜单："
          :label-width="formLabelWidth"
          prop="pid"
          placeholder="请选择菜单"
        >
          <el-select v-model="menuInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in getStateMenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
              {{ item.title }}</el-option
            >
            <!-- <el-option label="商城管理" :value="2">商城管理</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.type" label="1">目录</el-radio>
          <el-radio v-model="menuInfo.type" label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuInfo.type == 1"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuInfo.icon"></el-input>
        </el-form-item>
        <el-form-item
          v-if="menuInfo.type == 2"
          label="菜单地址："
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuInfo.url"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
          <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          type="primary"
          @click="subInfo('menuInfo')"
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
import { getMenuAdd, getMenuEdit, getMenuInfo } from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
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
      formLabelWidth: "100px", //label宽度
      rules: {
        title: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur"
          }
        ],
        pid: [
          {
            required: true,
            message: "请选择菜单",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMenuList"])
  },
  methods: {
    //获取菜单列表事件
    ...mapActions(["getActionMenuList"]),
    // 关闭弹窗事件
    cancel() {
      this.reset();
      this.$emit("cancel", false);
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
          if (this.addInfo.isAdd) {
            // console.log(this.menuInfo, "表单信息");
            //调取添加接口
            getMenuAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                //清空输入框
                this.cancel();
                //添加成功后，重新查询列表
                this.getActionMenuList();
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
            getMenuEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                //清空输入框
                this.cancel();
                //添加成功后，重新查询列表
                this.getActionMenuList();
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
    //编辑
    update(id) {
      //给编辑id赋值
      this.editId = id;
      //调取菜单查询一条数据
      getMenuInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.menuInfo = res.data.list;
          this.menuInfo.type = this.menuInfo.type.toString();
          this.menuInfo.status = this.menuInfo.status.toString();
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
