<template>
  <div class="fillcontain">
    <HeadTop/>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        :default-sort="{prop:'registe_time',order:'desc'}">
        <el-table-column
          type="index"
          width="100"/>

        <el-table-column
          prop="user_id"
          label="买家ID"
          width="220"/>

        <el-table-column
          prop="username"
          label="买家姓名"
          width="300"/>

        <el-table-column
          prop="registe_time"
          label="注册日期"
          sortable
          width="300"/>

        <el-table-column
          prop="city"
          label="注册地址"
          width="220"/>

        <el-table-column
          prop="balance"
          label="买家余额"/>

      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20,50,100,200]"
          :page-size="20"
          layout="total,sizes, prev, pager, next,jumper"
          :total="count"/>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../../components/HeadTop'
  import * as apiUser from '@/api/user'

  export default {
    data() {
      return {
        tableData: [],
        offset: 0,
        limit: 20,
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
          if (countData.status == 1) {
            this.count = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getUsers();
        } catch (err) {
          console.log('获取数据失败', err);
        }
      },
      async getUsers() {
        const arrayUsers = await apiUser.getUserList({offset: this.offset, limit: this.limit});
        this.tableData = arrayUsers
      },
      handleSizeChange(val) {
        // 每页条数
        this.limit = val
        this.getUsers()
      },
      handleCurrentChange(val) {
        // 当前页
        this.currentPage = val;
        // 开始条数
        this.offset = (val - 1) * this.limit;
        this.getUsers()
      }
    }
  }
</script>

<style lang="less">
  @import '../../style/mixin';

</style>

