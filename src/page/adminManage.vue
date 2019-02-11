<template>
    <div class="fillcontain">
        <HeadTop></HeadTop>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort="{prop:'create_time',rating:'desc'}">
                <el-table-column
                    prop="user_name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="注册日期"
                    width="220"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="地址"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="admin"
                    label="权限">
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    :page-sizes="[10,50,100,200]"
                    layout="total,sizes, prev, pager, next,jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import {adminCount} from "@/api/home"
    import {adminManage} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
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
                    const countData = await adminCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getAdmin();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                this.limit = val
                this.getAdmin()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getAdmin()
            },
            async getAdmin() {
                try {
                    const res = await adminManage({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                        this.tableData = [];
                        res.data.forEach(item => {
                            const tableItem = {
                                create_time: item.create_time,
                                user_name: item.user_name,
                                admin: item.admin,
                                city: item.city,
                            }
                            this.tableData.push(tableItem)
                        })
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
</style>


