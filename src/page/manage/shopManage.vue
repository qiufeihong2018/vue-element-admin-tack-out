<template>
    <div class="fillcontain">
        <HeadTop></HeadTop>
        <div class="table_container">
            <el-table
                :data="tableData"
                :default-sort="{prop:'rating',order:'desc'}">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="卖家名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="卖家距离">
                                <span>{{ props.row.distance }}</span>
                            </el-form-item>
                            <el-form-item label="卖家 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="开业时间">
                                <span>{{ props.row.opening_hours }}</span>
                            </el-form-item>
                            <el-form-item label="配送费">
                                <span>{{ props.row.piecewise_agent_fee.tips }}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="宣传语">
                                <span>{{props.row.promotion_info}}</span>
                            </el-form-item>
                            <el-form-item label="支持">
                                <span v-for="item in  props.row.supports">{{item.description}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="卖家名称">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="卖家介绍">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="卖家地址">
                </el-table-column>
                <el-table-column
                    prop="rating"
                    label="卖家评分"
                    width="150"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="recent_order_num"
                    label="卖家销售额"
                    width="200"
                    sortable>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="addFood(scope.$index, scope.row)">添加食品
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20,50,100,200]"
                    :page-size="20"
                    layout="total,sizes, prev, pager, next,jumper"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改卖家信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="卖家名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-autocomplete
                            v-model="address.address"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入地址"
                            style="width: 100%;"
                            @select="addressSelect"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="卖家介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="卖家分类" label-width="100px">
                        <el-cascader
                            :options="categoryOptions"
                            v-model="selectedCategory"
                            change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateShop">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../../components/HeadTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import * as apiShop from '@/api/shop'

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        components: {
            HeadTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async getResturants() {
                const {latitude, longitude} = this.city;
                const restaurants = await apiShop.getResturants({
                    latitude,
                    longitude,
                    offset: this.offset,
                    limit: this.limit
                });
                this.tableData = restaurants
            },
            async initData() {
                try {
                    this.city = await apiShop.cityGuess();
                    const countData = await apiShop.getResturantsCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getResturants();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getCategory() {
                try {
                    const categories = await apiShop.foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                } catch (err) {
                    console.log('获取商铺种类失败', err);
                }
            },
            handleSizeChange(val) {
                this.limit = val
                this.getResturants()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getResturants()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
            addFood(index, row) {
                this.$router.push({path: 'addGoods', query: {restaurant_id: row.id}})
            },
            async handleDelete(index, row) {
                try {
                    const res = await apiShop.deleteResturant(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除卖家成功'
                        });
                        this.tableData.splice(index, 1);
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除卖家失败')
                }
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try {
                        const cityList = await apiShop.searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            addressSelect(vale) {
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop() {
                this.dialogFormVisible = false;
                try {
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await apiShop.updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新卖家信息成功'
                        });
                        this.getResturants();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                } catch (err) {
                    console.log('更新餐馆信息失败', err);
                }
            },
        },
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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
