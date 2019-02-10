<template>
    <div class="fillcontain">
        <HeadTop></HeadTop>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                :default-sort="{prop:'registe_time',order:'desc'}"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    property="registe_time"
                    label="注册日期"
                    sortable
                    width="220">
                </el-table-column>
                <el-table-column
                    property="username"
                    label="买家姓名"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="注册地址">
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,50,100,200]"
                    :page-size="10"
                    layout="total,sizes, prev, pager, next,jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import * as apiUser from '@/api/user'

    export default {
        data() {
            return {
                tableData: [],
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            HeadTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await apiUser.getUserCount();
                    if (countData.status ==1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                // 每页条数
                this.limit = val
                this.getUsers()
            },
            handleCurrentChange(val) {
                // 当前页
                this.currentPage = val;
                // 之前页的条数
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            async getUsers() {
                const Users = await apiUser.getUserList({offset: this.offset, limit: this.limit});
                // 先清空
                this.tableData = []
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
        .Pagination {
            text-align: right;
            margin-top: 10px;
        }
    }
</style>

