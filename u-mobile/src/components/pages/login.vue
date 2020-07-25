<template>
  <div>
    <van-nav-bar
      id="navBar"
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-form @submit="onSubmit" class="logForm">
      <van-field
        v-model="logInfo.phone"
        name="asyncPhone"
        label="手机号"
        placeholder="请填写手机号"
        :rules="[
          { pattern: asyncPhone, required: true, message: '请填写正确的手机号' }
        ]"
      />
      <van-field
        v-model="logInfo.password"
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
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin } from "../../utils/axios";
import { Dialog } from "vant";

export default {
  data() {
    return {
      checkbox: false,
      title: "登录",
      asyncPhone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      asyncPassword: /^[a-z0-9_-]{6,18}$/,
      logInfo: {
        phone: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/content"
      });
    },
    onClickRight() {
      this.$router.push({
        path: "/register"
      });
    },
    clear() {
      this.logInfo = {
        phone: "",
        password: ""
      };
    },
    onSubmit(values) {
      //values是当前所有填写的数据符合对应的rules的时候，submit返回的验证后的值，如果又一个值没成功，values都是空
      if (values) {
        userLogin(this.logInfo).then(res => {
          if (res.data.code == 200) {
            console.log(res);
            // 把登录信息存储到本地存储中
            sessionStorage.setItem("userInfo",JSON.stringify(res.data.list));
            // 登录成功跳转到content页面
            this.$router.push("/content")
          } else if (res.data.code == 500) {
            Dialog.alert({
              title: "错误",
              message: res.data.msg
            }).then(() => {
              this.clear()
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/footer.css";
.active {
  color: orangered !important;
}
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
.logForm {
  padding: 50px 20px 0 20px;
}
</style>
