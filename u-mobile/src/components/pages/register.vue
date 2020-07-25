<template>
  <div>
    <!-- <my-header :titleName="title"></my-header> -->
    <van-nav-bar
      id="navBar"
      title="注册"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-form @submit="onSubmit" class="regForm">
      <van-field
        v-model="regInfo.nickname"
        name="asyncName"
        label="昵称"
        placeholder="请填写昵称"
        :rules="[
          { pattern: asyncName, required: true, message: '请填写3到8位字符' }
        ]"
      />
      <van-field
        v-model="regInfo.phone"
        name="asyncPhone"
        label="手机号"
        placeholder="请填写手机号"
        :rules="[
          { pattern: asyncPhone, required: true, message: '请填写正确的手机号' }
        ]"
      />
      <van-field
        v-model="regInfo.password"
        type="password"
        name="asyncPassword"
        label="密码"
        placeholder="请填写密码"
        :rules="[
          {
            pattern: asyncPassword,
            required: true,
            message: '请正确填写6-18位密码'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <van-field
        name="asyncCheckbox"
        :rules="[{ required: true, message: '请认真阅读并勾选' }]"
      >
        <template #input>
          <van-checkbox v-model="checkbox" shape="square" />
          &nbsp;&nbsp;&nbsp;&nbsp;<span
            >我已经阅读并且同意使用条款和隐私政策</span
          >
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import { userRegister } from "../../utils/axios";
export default {
  data() {
    return {
      checkbox: false,
      title: "注册",
      asyncName: /^[a-z0-9_-]{3,8}$/,
      asyncPhone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      asyncPassword: /^[a-z0-9_-]{6,18}$/,
      asyncCheckbox: "",
      regInfo: {
        nickname: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/content"
      });
    },
    onClickRight() {
      this.$router.push({
        path: "/login"
      });
    },
    clear(){
      this.checkbox = false,
      this.regInfo= {
        nickname: "",
        phone: "",
        password: ""
      }
    },
    onSubmit(values) {
      //values是当前所有填写的数据符合对应的rules的时候，submit返回的验证后的值，如果又一个值没成功，values都是空
      if (values) {
        userRegister(this.regInfo).then(res=>{
          if (res.data.code==200) {
            this.clear();
            this.$router.push("/login");
          }
        })
      }
    }
  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/footer.css";
#navBar {
  background-color: orange;
}
#navBar /deep/ .van-ellipsis {
  color: white !important;
}
#navBar /deep/ .van-nav-bar__text {
  color: white !important;
}
#navBar /deep/ .van-nav-bar__arrow {
  color: white !important;
}
.regForm {
  padding: 50px 20px 0 20px;
}
</style>
