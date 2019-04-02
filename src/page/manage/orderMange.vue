<template>
  <div class="fillcontain">
    <HeadTop/>
    <div class="table_container">
      <el-table
        :data="tableData"
        :row-key="row => row.index"
        :default-sort="{prop:'total_amount',rating:'desc'}">
        <el-table-column
          label="买家ID"
          prop="user_id"
          width="100"/>
        <el-table-column
          label="卖家名称"
          prop="restaurant_name"
          width="200"/>
        <el-table-column
          label="下单时间"
          prop="formatted_created_at"
          width="300"/>
        <el-table-column
          label="卖家ID"
          prop="restaurant_id"
          width="100"/>
        <el-table-column
          label="配送费"
          prop="basket.deliver_fee.price"
          width="150"/>
        <el-table-column
          label="订单 ID"
          prop="id"
          width="150"/>
        <el-table-column
          label="总价格"
          prop="total_amount"
          sortable
          width="150"/>
        <el-table-column
          label="订单状态"
          prop="status_bar.title"/>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          :page-sizes="[20,50,100,200]"
          layout="total,sizes, prev, pager, next,jumper"
          :total="count"/>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../../components/HeadTop'
  import {getOrderCount} from '@/api/home'
  import {getOrderList, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'

  export default {
    data() {
      return {
        tableData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        restaurant_id: null,
        expendRow: [],
      }
    },
    components: {
      HeadTop,
    },
    created() {
      this.restaurant_id = this.$route.query.restaurant_id;
      this.initData();
    },
    mounted() {

    },
    methods: {
      async initData() {
        try {
          const countData = await getOrderCount({restaurant_id: this.restaurant_id});
          if (countData.status == 1) {
            this.count = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getOrders();
        } catch (err) {
          console.log('获取数据失败', err);
        }
      },
      handleSizeChange(val) {
        this.limit = val
        this.getOrders()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
        this.getOrders()
      },
      async getOrders() {
        const arrayOrders = await getOrderList({
          offset: this.offset,
          limit: this.limit,
          restaurant_id: this.restaurant_id
        });
        this.tableData = arrayOrders
      }
    }
  }
</script>

<style lang="less">
  @import '../../style/mixin';

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
