<template>
    <div class="manage_page fillcontain">
        <el-row>
            <el-col :span="3" class="el-col-left">
                <el-menu :default-active="defaultActive" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"/>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-date"/>数据管理</template>
                        <el-menu-item index="userManage">买家管理</el-menu-item>
                        <el-menu-item index="shopManage">卖家管理</el-menu-item>
                        <el-menu-item index="foodManage">商品管理</el-menu-item>
                        <el-menu-item index="orderMange">订单管理</el-menu-item>
                        <el-menu-item index="adminManage">管理员管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"/>添加数据</template>
                        <el-menu-item index="addShop">添加卖家</el-menu-item>
                        <el-menu-item index="addGoods">添加商品</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-picture"/>图表</template>
                        <el-menu-item index="visitor">买家分布</el-menu-item>
                        <el-menu-item index="merchants">卖家分布</el-menu-item>
                        <el-menu-item index="food">商品分类</el-menu-item>
                        <el-menu-item index="menu">订单分布</el-menu-item>
                        <el-menu-item index="admin">管理员分布</el-menu-item>
                        <el-menu-item index="map">地图</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"/>设置</template>
                        <el-menu-item index="adminSet">管理员设置</el-menu-item>
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-warning"/>说明</template>
                        <el-menu-item index="explain">说明</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="21" class="el-col-right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';
</style>
<style lang="stylus">
    .el-row
        height: 100%

    .el-col-left
        min-height 100%
        background-color #324057
        .el-menu
            min-height 100%

    .el-col-right
        height 100%
        overflow auto
</style>
