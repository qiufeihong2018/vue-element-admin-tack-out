<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">
          <i class="icon-location" v-show='item.redirect==="noredirect" || item.meta.breadNumber===1'></i>
          {{item.meta.title}}
        </span>
      <!--<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>-->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      const breadNumber = typeof (this.$route.meta.breadNumber) !== 'undefined' ? this.$route.meta.breadNumber : 1

      let matched = this.$route.matched.filter(item => item.name)

      const first = matched[0]

      if (first && breadNumber !== 1 && !['integrateMonitor', 'customMonitor', 'analysis', 'log', 'system', 'assetDynamic', 'eventDynamic', 'vulneDynamic', 'netFlow'].includes(first.name)) {
        matched = [{ path: first.path, meta: { title: first.meta.title } }].concat(matched)
      }
      this.levelList = matched
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
