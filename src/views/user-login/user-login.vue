<template>
  <div class="user-login">
    <div class="logo">
      <icon-svg iconHref="icon-yinle2" />
    </div>
    <div class="login-form">
      <a-form :form="loginForm">
        <a-form-item>
          <a-input
            v-decorator="['phone', config.phone]"
            placeholder="请输入手机号"
          >
            <a-icon slot="prefix" type="mobile" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="['password', config.password]"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="login">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      modalshow: true,
      loginForm: this.$form.createForm(this),
      config: {
        phone: {
          rules: [{ required: true, message: '请输入手机号码' }]
        },
        password: {
          rules: [{ required: true, message: '请输入密码' }]
        }
      }
    };
  },
  methods: {
    login() {
      const {
        loginForm: { validateFields }
      } = this;
      validateFields(async (err, val) => {
        if (!err) {
          this.userLogin(val);
          this.$emit('logining');
        }
      });
    },
    ...mapActions(['userLogin'])
  }
};
</script>

<style lang="less">
.user-login {
  .logo {
    text-align: center;
    svg {
      width: 60px;
      height: 60px;
    }
  }
  .ant-form {
    margin-top: 30px;
  }
  .ant-btn {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
