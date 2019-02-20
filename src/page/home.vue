<template>
    <div>
        <HeadTop/>
        <section class="data_section">
            <header class="section_title">数据统计</header>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="data-header today_head">当日数据</div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list">
                        新增买家: <span class="data_num">{{userCount}}</span></div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list"> 新增订单:<span class="data_num">{{orderCount}}</span></div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list"> 新增管理员:
                        <span class="data_num">{{adminCount}}</span></div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="data-header all_head">总数据</div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list"> 注册买家：<span class="data_num">{{allUserCount}}</span></div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list"> 订单：<span class="data_num">{{allOrderCount}}</span></div>
                </el-col>
                <el-col :span="6">
                    <div class="data_list"> 管理员：<span class="data_num">{{allAdminCount}}</span></div>
                </el-col>
            </el-row>
        </section>
        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import tendency from '../components/tendency'
    import dtime from 'time-formater'
    import * as apiUser from '@/api/user'
    import * as apiHome from '@/api/home'

    export default {
        data() {
            return {
                userCount: '',
                orderCount: '',
                adminCount: '',
                allUserCount: '',
                allOrderCount: '',
                allAdminCount: '',
                sevenDay: [],
                sevenDate: [[], [], []],
            }
        },
        components: {
            HeadTop,
            tendency,
        },
        mounted() {
            this.initData();
            // 一周的时间
            for (let i = 6; i > -1; i--) {
                const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
                this.sevenDay.push(date)
            }
            this.getSevenData();
        },
        computed: {},
        methods: {
            async initData() {
                const today = dtime().format('YYYY-MM-DD')
                Promise.all([apiUser.userCount(today), apiHome.orderCount(today), apiHome.adminDayCount(today), apiUser.getUserCount(), apiHome.getOrderCount(), apiHome.adminCount()]).then(res => {
                    this.userCount = res[0].count;
                    this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
                }).catch(err => {
                    console.log(err)
                })
            },
            async getSevenData() {
                const apiArr = [[], [], []];
                this.sevenDay.forEach(item => {
                    apiArr[0].push(apiUser.userCount(item))
                    apiArr[1].push(apiHome.orderCount(item))
                    apiArr[2].push(apiHome.adminDayCount(item))
                })
                const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
                Promise.all(promiseArr).then(res => {
                    const resArr = [[], [], []];
                    res.forEach((item, index) => {
                        if (item.status == 1) {
                            resArr[Math.floor(index / 7)].push(item.count)
                        }
                    })
                    this.sevenDate = resArr;
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .wan {
        .sc(16px, #333)
    }
</style>
<style lang="stylus">
    .data_section
        padding 40px
        .section_title
            text-align center
            font-size 40px
            font-family Helvetica Neue

        .el-row
            margin 10px
            .el-col
                border-radius 10px

        .data_list
            text-align center
            font-size 20px
            background #EBEEF5
            padding 30px 10px

            .data_num
                color #000000
                font-size 20px

        .data-header
            text-align center
            color #fff
            font-size 30px
            padding 22px 5px

        .today_head
            background #ff0000

        .all_head
            background #0214ff
</style>
