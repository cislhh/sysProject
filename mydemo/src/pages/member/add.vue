<template>
  <div>
    <!-- 弹框内容 -->
    <el-dialog
      :title="addInfo.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="addInfo.dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="memberInfo.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="memberInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="memberInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="memberInfo.status" label="1">启用</el-radio>
          <el-radio v-model="memberInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          type="primary"
          @click="subInfo('memberInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('memberInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入菜单接口
import { getmemberAdd, getmemberEdit, getmemberInfo } from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      memberInfo: {
        uid: 0,
        phone: "",
        nickname: "",
        password: "",
        status: "1"
      },
      formLabelWidth: "100px", //label宽度
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "长度11位数字",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "长度2到8位字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "长度6到18位字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMemberList"])
  },
  methods: {
    //获取菜单列表事件
    ...mapActions(["getActionMemberList"]),
    // 关闭弹窗事件
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    //重置输入内容
    reset() {
      this.memberInfo = {
        uid: 0,
        phone: "",
        password: "",
        nickname: "",
        password: "",
        status: "1"
      };
    },
    
    //编辑
    update(id) {
      //给编辑id赋值
      this.editId = id;
      //调取菜单查询一条数据
      getmemberInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.memberInfo = res.data.list;
          this.memberInfo.status = this.memberInfo.status.toString();
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
