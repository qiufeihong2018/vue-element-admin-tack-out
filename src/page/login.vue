<template>
  <div class="page-login">
    <div class="page-login-layer page-login-layer-area">
      <ul class="circles">
        <li v-for="n in 15" :key="n"></li>
      </ul>
    </div>
    <div class="page-login-layer page-login-layer-time" flex="main:center">
      {{time}}
    </div>
    <div class="page-login-layer">
      <div class="page-login-content" flex="dir:top main:justify cross:center box:justify">
        <div class="page-login-content-main" flex="dir:top main:center cross:center">
          <!--表单-->
          <div class="page-login-form">
            <el-card shadow="nerver">
              <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                <el-form-item prop="username">
                  <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                    <i slot="prepend" class="el-icon-user-solid" />
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.password" placeholder="密码">
                    <i slot="prepend" class="el-icon-collection" /></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input type="text" v-model="formLogin.code" placeholder="- - - -">
                    <template slot="prepend">验证码</template>
                    <template slot="append">
                      <img class="login-code" src="./image/login-code.png"></img>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button @click="submitForm('loginForm')" type="primary" class="button-login">登录</el-button>
              </el-form>
            </el-card>
            <p class="page-login-options" flex="main:justify cross:center">
              <span>忘记密码</span>
              <span>注册用户</span>
            </p>
            <el-button class="page-login-quick" size="default" type="info" @click="dialogVisible=true">
              快速选择用户（测试功能）
            </el-button>
          </div>
        </div>
        <div class="page-login-content-footer">
          <p class="page-login-content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
          <p class="page-login-content-footer-copyright">
            Copyright 2019 www.qiufeihong.top出品
            <a href="https://github.com/qiufeihong2018">@qiufeihong</a>
          </p>
        </div>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin:-20px 0 -10px 0">
        <el-col v-for="(user,index) in users" :key="index" :span="8">
          <div class="page-login-quick-user" @click="handleUserBtnClick(user)">
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import {
    login,
    getAdminInfo
  } from '@/api/getData'
  import {
    mapActions,
    mapState
  } from 'vuex'
  import dayjs from 'dayjs'

  export default {
    data() {
      return {
        timeInterval: '',
        time: dayjs().format('HH:mm:ss'),
        // 快速选择用户
        dialogVisible: false,
        users: [{
          name: '管理员',
          username: 'admin',
          password: 'admin'
        }, {
          name: '编辑',
          username: 'editor',
          password: 'editor'
        }, {
          name: '用户1',
          username: 'user1',
          password: 'user1'
        }],
        // 表单
        formLogin: {
          username: 'admin',
          password: 'admin',
          code: 'v9am'
        },
        // 校验
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        },
      }
    },
    mounted() {
      this.timeInterval = setInterval(() => {
        this.refreshTime()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timeInterval)
    },
    // computed: {
    //   ...mapState(['adminInfo']),
    // },
    methods: {
      fond(){
        console.log('dfasdf')
      },
      ...mapActions(['getAdminData']),
      refreshTime() {
        this.time = dayjs().format('HH:mm:ss')
      },
        /**
       * @description 提交表单
       */
    // 提交登录信息
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await login({
              user_name: this.formLogin.username,
              password: this.formLogin.password
            })
            if (res.status == 1) {
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              this.$router.push('manage')
            } else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      },
    },
    // watch: {
    //   adminInfo: function (newValue) {
    //     if (newValue.id) {
    //       this.$message({
    //         type: 'success',
    //         message: '检测到您之前登录过，将自动登录'
    //       });
    //       this.$router.push('manage')
    //     }
    //   }
    // }
  }
</script>

<style lang="less">
  .page-login {
    // 模板
    background-color: #000000;
    position: relative;
    height: 100%;

    //时间
    .page-login-layer-time {
      font-size: 25em;
      font-weight: bold;
      color: #fff;
      overflow: hidden;
    }

    //登录页面控件容器
    .page-login-content {
      height: 100%;
      min-height: 500px;
    }

    // 登录表单
    .page-login-form {
      width: 400px;

      .el-card {
        margin-bottom: 20px
      }

      // 输入框左边的图表区域放大
      .el-input-group__prepend {
        padding: 0 30px;
      }

      // 验证码图片
      .login-code {
        height: 50px;
      }

      // 登录按钮
      .button-login {
        width: 100%
      }

      // 登录选项
      .page-login-options {
        font-size: 14px;
        color: #fff;
        margin-bottom: 15px;
        font-weight: bold
      }

      //快速选择用户
      .page-login-quick {
        width: 100%
      }

      // 输入框都变高
      .el-input__inner {
        height: 56px
      }
    }

    // footer
    .page-login-content-footer {
      color: #fff;
      padding: 1em 0;
      position: fixed;
      bottom: 0;


      .page-login-content-footer-options {
        margin: 10px;
        font-size: 14px;
        text-align: center;

        a {
          margin: 0 2.5em
        }
      }

      .page-login-content-footer-copyright {
        margin: 10px;
        font-size: 12px;
        text-align: center;
      }
    }

    // 背景
    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #fff;
        animation: mymove 10s linear infinite;
        bottom: -200px;

        @keyframes mymove {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
            border-radius: 50%;
          }

          100% {
            transform: translateY(-1100px) rotate(360deg);
            opacity: 1;
            border-radius: 0%;
          }
        }

        //第一个圈,从左到右
        &:nth-child(1) {
          left: 0%;
          width: 500px;
          height: 500px;
        }

        &:nth-child(2) {
          left: 10%;
          width: 800px;
          height: 800px;
          animation-delay: 15s; //动画延迟
          animation-duration: 15s; //动画周期
        }

        &:nth-child(3) {
          left: 20%;
          width: 100px;
          height: 100px;
          animation-delay: 20s;
          animation-duration: 20s;
        }

        &:nth-child(4) {
          left: 39%;
          width: 50px;
          height: 50px;
          animation-delay: 4s;
          animation-duration: 4s;
        }

        &:nth-child(5) {
          left: 44%;
          width: 80px;
          height: 80px;
          animation-delay: 15s;
          animation-duration: 15s;
        }

        &:nth-child(6) {
          left: 50%;
          width: 80px;
          height: 80px;
          animation-delay: 10s;
          animation-duration: 10s;
        }

        &:nth-child(7) {
          left: 60%;
          width: 800px;
          height: 800px;
          animation-delay: 12s;
          animation-duration: 12s;
        }

        &:nth-child(8) {
          left: 67%;
          width: 80px;
          height: 80px;
          animation-delay: 15s;
          animation-duration: 15s;
        }

        &:nth-child(9) {
          left: 70%;
          width: 80px;
          height: 80px;
          animation-delay: 6s;
          animation-duration: 6s;
        }

        &:nth-child(10) {
          left: 75%;
          width: 600px;
          height: 600px;
          animation-delay: 18s;
          animation-duration: 18s;
        }

        &:nth-child(11) {
          left: 80%;
          width: 80px;
          height: 80px;
          animation-delay: 12s;
          animation-duration: 12s;
        }

        &:nth-child(12) {
          left: 86%;
          width: 50px;
          height: 50px;
          animation-delay: 10s;
          animation-duration: 10s;
        }

        &:nth-child(13) {
          left: 90%;
          width: 200px;
          height: 200px;
        }

        &:nth-child(14) {
          left: 96%;
          width: 120px;
          height: 120px;
          animation-delay: 2s;
          animation-duration: 2s;
        }

        &:nth-child(15) {
          left: 100%;
          width: 100px;
          height: 100px;
          animation-delay: 5s;
          animation-duration: 5s;
        }
      }
    }
  }
</style>