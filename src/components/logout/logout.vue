<template>
  <div class="test">
    <el-dialog :visible.sync="isVisible" center @close="handleHide">
      <div class="logout">
        <div class="title"><span>确定要退出吗?</span></div>
        <div class="btnWrapper">
          <button class="confirm" @click="logout">确定</button>
          <button class="exit" @click="handleHide">取消</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isVisible: this.isShow
      }
    },
    watch: {
      isShow() {
        this.isVisible = this.isShow
      }
    },
    methods: {
      handleHide() {
        this.$emit('update:isShow', false)
      },
      logout() {
        this.$emit('update:isShow', false)
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .logout
    width 600px
    height 340px
    margin 90px auto
    background: rgba(6, 6, 118, 0.8);
    background: linear-gradient(135deg, transparent 15px, rgba(6, 6, 118, 0.8) 0) top left,
      linear-gradient(-135deg, transparent 15px, rgba(6, 6, 118, 0.8) 0) top right,
      linear-gradient(-45deg, transparent 15px, rgba(6, 6, 118, 0.8) 0) bottom right,
      linear-gradient(45deg, transparent 15px, rgba(6, 6, 118, 0.8) 0) bottom left
    background-size: 50% 50%
    background-repeat: no-repeat
    // border 2px solid rgba(70, 118, 255, 0.8)
    // box-shadow: 0 0 2px 2px rgba(70, 118, 255, 0.8);
    .title
      width 280px
      height 90px
      position relative
      top 60px
      margin 0px auto
      font-size 30px
      color #fff
      font-family "Microsoft YaHei"
      letter-spacing 10px
      span
        font-weight 800

  .btnWrapper
    height 70px
    width 400px
    margin 0 auto
    margin-top 150px
    .confirm
    .exit
      width 158px
      height 44px
      border none
      border-radius 6px
      background-color #a0b9ff
      color #06067b
      font-size 27px
      letter-spacing 8px
      line-height 44px
      font-weight 700
    .confirm
      margin-right 70px
    .exit
      background-color #4676ff
      color #fff
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .test
    .el-dialog--center
      background-color transparent
      box-shadow none
      .el-dialog__headerbtn
        display none
</style>
