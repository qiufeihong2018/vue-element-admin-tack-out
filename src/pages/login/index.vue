<template>
  <div class="login">
    <div class="logo"><img src="media/login-logo.png" alt="logo"></div>
    <div class="container">
      <div class="title">
        <span>xx网络安全监控系统V 1.0</span>
      </div>
      <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'

  export default {
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        return callback()
      }
      const checkPassword = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'))
        }
        return callback()
      }
      return {
        ruleForm: {
          username: '',
          pass: ''
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          pass: [
            { validator: checkPassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapState(['is-login'])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/')
            return
          }
          this.$notify.error({
            title: '错误',
            message: '账号密码错误'
          })
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    width: 400px
    margin: 10% auto 0
    text-align: center
    .logo
      img
        width: 130px
        height: 130px
        background-color: #fff
        border-radius: 50%
    .container
      width: 362px
      box-sizing: border-box
      padding: 53px 41px 20px
      margin: 60px auto 0
      border: 1px solid #51d9ff
      border-radius: 10px
      background: rgba(6, 6, 123, 0.5)
      .title
        color: #51d9ff
        margin-bottom: 47px
        font-size: 23px
        text-indent: 7px
        font-weight: bold
      .el-form
        margin-left: -95px
        .el-input
          margin-bottom: 10px
        .el-button
          margin-top: 8px
          width: 120px
          height: 50px
          font-size: 20px
          background-color: #51d9ff
          color: #06067b
          font-weight: bold
          letter-spacing: 20px
          text-indent: 10px
          border-radius: 5px

  .bg
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    position: fixed
    z-index: -1
    background-size: cover
    background-repeat: no-repeat
    background-image: url(media/login-bg.jpg)

</style>
