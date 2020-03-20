<template>
  <div class="login-container">
    <div class="logo">
      <img src="@/assets/login/logo.png" alt="">
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="title">用户登录</div>
      </div>
      <el-form-item prop="username">
        <span class="ion">
          <img src="@/assets/login/user.png" alt="">
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="ion">
          <img src="@/assets/login/psd.png" alt="">
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" class="button-lo" @click.native.prevent="handleLogin">立即登录
      </el-button>
    </el-form>
    <div class="bottom-text" />
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import cookie from 'js-cookie'
export default {
    name: 'Login',
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能少于6位数字'))
            } else {
                callback()
            }
        }
        return {
            // 用户名密码
            loginForm: {
                username: '',
                password: ''
            },
            // 密码验证规则
            loginRules: {
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false, // 登录按钮的状态
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
    // 登录方法
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    login(this.loginForm.username, this.loginForm.password).then(res => {
                        cookie.set('token', res.result.token) // localhost    ddxc.xyyun.co
                        cookie.set('aid', res.result.id)
                        this.$store.state.user.admin_id = res.result.id
                        sessionStorage.setItem('admin_id', res.result.id)
                        this.$router.push('/')
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #5e5e5e;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $light_gray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(62, 206, 185, 1);
    background: white;
    color: #454545;
    width: 67%;
    margin: 0 auto 22px;
  }
  .el-form-item__content{
  display: flex;
  align-items: center;
}
}
</style>

<style lang="scss" scoped>
$bg: #f4f4f4;
$dark_gray: #889aa4;
$light_gray: #000000;
.logo {
  width: 100%;
  height: 324px;
  background-color: #2CA9FC;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .bottom-text{
    height: 75px;
    line-height: 75px;
    font-size: 27px;
    text-align: center;
    color: $bg;
    background-color: #2CA9FC;
    margin-top: 60px;
  }
  .ion{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    img{
      width: 28px;
      height: 28px;
    }
  }
  .button-lo {
    width: 100%;
    background-color: #2CA9FC;
    color: white;
    border: 0;
    border-radius: 0;
    padding: 22px 0;
    font-size: 27px;
  }
  .login-form {
    position: relative;
    width: 560px;
    max-width: 100%;
    padding: 60px 0 0;
    margin: 80px auto 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(175, 175, 175, 0.5);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 24px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
