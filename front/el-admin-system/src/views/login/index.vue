<template>
  <div class="login-page">
    <div id="login" class="layer bg" />
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img class="avatar" src="../../assets/logo.png">
      </div>
      <!-- 表单部分 -->
      <div class="form-group" @keydown.enter="hadleLogin">
        <el-card>
          <el-form
            ref="loginForm"
            label-position="left"
            :rules="rules"
            :model="formLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="formLogin.username"
                type="text"
                placeholder="用户名"
              >
                <i slot="prepend" class="el-icon-user-solid" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formLogin.password"
                type="password"
                placeholder="密码"
              >
                <i slot="prepend" class="el-icon-lock" />
              </el-input>
            </el-form-item>
            <el-form-item prop="role">
              <el-input
                type="text"
                placeholder="登录角色"
                :value="formatRole(formLogin.role)"
                readonly
              >
                <i
                  slot="prepend"
                  class="el-icon-connection"
                />
                <template slot="append">
                  <el-select v-model="formLogin.role" style="width:38px" size="mini">
                    <el-option label="管理员" value="admin" />
                    <el-option label="编辑" value="editor" />
                    <el-option label="游客" value="visitor" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input
                v-model="formLogin.captcha"
                type="text"
                placeholder="- - - -"
                class="captcha-input"
              >
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img class="captcha" :src="captcha" @click="resetCaptcha">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="button-login"
                :loading="loginLoading"
                @click.native.prevent="hadleLogin"
              >
                登录
              </el-button>
            </el-form-item>

          </el-form>
        </el-card>
      </div>
      <!-- 帮助按钮 -->
      <!-- <el-button type="info" class="button-help">
        关于
        <i class="el-icon-info" />
      </el-button> -->
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
require('particles.js')
import config from './config/default'
import md5 from 'md5'
export default {
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
        captcha: '',
        role: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        role: [{ required: true, message: '请输入选择角色', trigger: 'change' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      captcha: '/api/user/captcha',
      loginLoading: false,
      redirect: '',
      otherQuery: null
    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       const query = route.query
  //       if (query) {
  //         this.redirect = query.redirect
  //         this.otherQuery = this.getOtherQuery(query)
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    // 初始化例子插件, 背景
    // eslint-disable-next-line no-undef
    particlesJS('login', config)
  },
  methods: {
    resetCaptcha() {
      this.captcha = '/api/user/captcha?_t=' + new Date().getTime()
    },
    // 提交登陆信息
    hadleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true
          const formData = { ...this.formLogin }
          formData.password = md5(formData.password)
          this.$store.dispatch('user/login', formData).then(res => {
            this.$notify({
              title: '登陆成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            }, 1000)
          }).catch(() => {
            this.resetCaptcha()
          })
        }
        this.loginLoading = false
      })
    },
    formatRole(role) {
      switch (role) {
        case 'admin':
          return '管理员'
        case 'editor':
          return '编辑'
        case 'visitor':
          return '游客'
        default:
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((prev, cur) => {
        if (cur !== 'redirect') {
          prev[cur] = query[cur]
        }
        return prev
      }, {})
    }
  }
}
</script>

<style lang="scss">
.login-page {
  .captcha-input {
    .el-input-group__append {
      padding: 0 !important;
    }
  }
  .el-card__body {
    padding-top: 70px;
  }
  // 输入框左边的图表区域缩窄
  .el-input-group__prepend {
    padding: 0px 14px;
  }
}
</style>
<style lang="scss" scoped>
.login-page {
  background-color: #edf4fa;
  height: 100%;
  position: relative;
  // 层
  .layer {
    position: absolute;
    height: 100%;
    width: 100%;
    &.flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
  // 背景
  .bg {
    canvas {
      display: block;
      margin: 0px;
      padding: 0px;
    }
  }
  // logo
  .logo-group {
    margin-top: -75px - 70px;
    position: relative;
    top: 60px;
    .avatar {
      border-radius: 50%;
      height: 100px;
    }
  }
  // 登陆表单
  .form-group {
    width: 300px;
    // 重新设置卡片阴影
    .el-card {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
    // 登陆按钮
    .button-login {
      width: 100%;
    }

    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .captcha {
      width: 80px;
      height: 32px;
    }
  }
  // 帮助按钮
  .button-help {
    width: 300px;
    margin-top: 20px;
  }
}
</style>
