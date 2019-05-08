<template>
  <div class="page-login">
    <div class="page-login-layer page-login-layer-area">
      <ul class="circles">
        <li v-for="n in 15" :key="n"></li>
      </ul>
    </div>
    <div class="page-login-layer page-login-layer-time" flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login-layer">
      <div class="page-login-content" flex="dir:top main:justify cross:center box:justify">
        <div class="page-login-content-header">
          <p class="page-login-content-header-motto">
            I can accept failure, but I can't acceptnot trying. <span>—— by Michael Jordan</span>
          </p>
        </div>
        <div class="page-login-content-main" flex="dir:top main:center cross:center">
          <!--表单-->
          <div class="page-login-form">
            <el-card shadow="nerver">
              <el-form ref="loginForm" label-position="top" :rules="rules">
                <el-form-item prop="username">
                  <el-input type="text" placeholder="用户名">
                    <i slot="prepend" class="el-icon-user-solid" />
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" placeholder="密码">
                    <i slot="prepend" class="fa fa-user-cicle-o"></i></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--- 	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>试试水外卖后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
-->
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
        loginForm: {
          username: '',
          password: '',
        },
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
        },
        showLogin: false,
        time: dayjs().format('HH:mm:ss')
      }
    },
    mounted() {
      this.showLogin = true;
      if (!this.adminInfo.id) {
        this.getAdminData()
      }
    },
    computed: {
      ...mapState(['adminInfo']),
    },
    methods: {
      ...mapActions(['getAdminData']),
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await login({
              user_name: this.loginForm.username,
              password: this.loginForm.password
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
    watch: {
      adminInfo: function (newValue) {
        if (newValue.id) {
          this.$message({
            type: 'success',
            message: '检测到您之前登录过，将自动登录'
          });
          this.$router.push('manage')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .page-login {
    @extend .unable-select;
    // $backgroundColor:#F0F2F5;
    // ---
    background-color: #000000;
    height: 100%;
    position: relative;

    // 层
    .page-login-layer {
      @extend .full overflow:auto;
    }

    .page-login-layer-area {
      overflow: hidden
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

    //时间
    .page-login-layer-time {
      font-size: 35em;
      font-weight: bold;
      color: #fff;
      overflow: hidden;
    }

    //登录页面控件容器
    .page-login-content {
      height: 100%;
      min-height: 500px;
    }

    //header
    .page-login-content-header {
      padding: 1em 0;

      .page-login-content-header-motto {
        color: #fff;
        font-size: 12px;

        span {
          color: #fff;
        }
      }
    }
  }


  // @import '../style/mixin';
  // .manage_tip{
  // 	position: absolute;
  // 	width: 100%;
  // 	top: -100px;
  // 	left: 0;
  // 	p{
  // 		font-size: 34px;
  // 		color: #fff;
  // 	}
  // }
  // .form_contianer{
  // 	.wh(320px, 210px);
  // 	.ctp(320px, 210px);
  // 	padding: 25px;
  // 	border-radius: 5px;
  // 	text-align: center;
  // 	background-color: #fff;
  // 	.submit_btn{
  // 		width: 100%;
  // 		font-size: 16px;
  // 	}
  // }
  // .tip{
  // 	font-size: 12px;
  // 	color: red;
  // }
  // .form-fade-enter-active, .form-fade-leave-active {
  //   	transition: all 1s;
  // }
  // .form-fade-enter, .form-fade-leave-active {
  //   	transform: translate3d(0, -50px, 0);
  //   	opacity: 0;
  // }
</style>
