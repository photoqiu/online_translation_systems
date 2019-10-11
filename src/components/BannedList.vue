<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-select {
        float:left;
        width:100%;
    }
    .el-table th {
        max-height:30px;
    }
    .el-table {
        width:1430px;
        line-height:20px;
    }
    .el-pagination {
        margin:20px 0 0 0;
        float:right;
    }
}
</style>
<template>
<div class="container_bd">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>禁用语列表</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{path:'/'}">首页</router-link></li>
                        <li class="breadcrumb-item active">禁用语列表</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div class="bd">
        <div class="row">
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-search"></i>
                        禁用语搜索条件
                    </h3>
                    <div class="card-tools">
                        <router-link class="btn btn-outline-info" role="button" :to="{path:'/createbase'}">新建项目</router-link>
                    </div>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="机构名称:">
                                    <el-select v-model="form.search_text" placeholder="请选择机构名称">
                                        <el-option
                                            v-for="(item, $index) in customer_datas"
                                            :key="$index"
                                            :data-datas="item.json_datas"
                                            :label="item.organName"
                                            :value="item.json_datas">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="一级行业">
                                    <el-select v-model="form.industry1" filterable @change="getOneLevelDatas" placeholder="请选择">
                                        <el-option
                                          v-for="item in main_industry_models_0"
                                          :key="item.code"
                                          :data-id="item.id"
                                          :label="item.name"
                                          :value="item.json_data">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="二级行业">
                                    <el-select v-model="form.industry2" filterable @change="getTwoLevelDatas" placeholder="请选择">
                                        <el-option
                                          v-for="item in sub_industry_models_1"
                                          :key="item.code"
                                          :data-id="item.id"
                                          :label="item.name"
                                          :value="item.json_data">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="三级行业">
                                    <el-select v-model="form.industry3" filterable @change="getThereLevelDatas" placeholder="请选择">
                                        <el-option
                                          v-for="item in sub_industry_models_2"
                                          :key="item.code"
                                          :data-id="item.id"
                                          :label="item.name"
                                          :value="item.json_data">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="四级行业">
                                    <el-select v-model="form.industry4" filterable placeholder="请选择">
                                        <el-option
                                          v-for="item in sub_industry_models_3"
                                          :key="item.code"
                                          :data-id="item.id"
                                          :label="item.name"
                                          :value="item.json_data">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-button type="primary" @click="submitdatas">查询</el-button>
                            </div>
                        </div>    
                    </div>
                </el-form>
            </div>
        </div>
        <div class="row">
            <div class="card card-default col-12">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-table"></i>
                        术语库列表
                    </h3>
                </div>
                <div class="card-body">
                    <el-table
                        :data="tableData"
                        border
                        style="width:100%"
                        height="550">
                        <el-table-column
                          fixed
                          prop="bannedName"
                          label="语料库名称">
                        </el-table-column>
                        <el-table-column
                          prop="language"
                          label="语言"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="organName"
                          label="从属行业名称">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="220">
                          <template slot-scope="scope">
                            <el-button @click="handleDetailClick(scope.row)" type="text" size="small">修改/查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="card-footer clearfix">
                    <div class="float-right">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="totalPage">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "BannedList",
        data() {
            return {
                form : {
                    search_text: "",
                    region_users: "",
                    status:""
                },
                project_datas: [],
                tableData: [],
                pageIndex : 1,
                pageSize: 30,
                totalPage:0,
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                banned_list_datas: 'banned_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            banned_list_datas: function() {
                this.$data.totalPage = this.banned_list_datas.bannedList.pages
                let datas = {}
                for (let keys of this.banned_list_datas.bannedList.list) {
                    datas = {}
                    datas.id = keys.id
                    datas.bannedName = keys.bannedName
                    datas.language = `${keys.language}` 
                    datas.organName = keys.organ.organName
                    this.$data.tableData.push(datas)
                }
                console.log("this.tableData : ", this.$data.tableData)
                if (!!this.banned_list_datas.bannedList.isLastPage) {
                    return false
                }
                this.$data.pageIndex += 1
                this.$store.dispatch('getBannedList', this.$data.pageIndex)
            }
        },
        mounted() {
            this.$store.dispatch('getBannedList', this.$data.pageIndex)
        },
        methods: {
            handleClick(row) {
                console.log(row)
                window.location.href = `/atreus/#/blockarticle/${row.baseId}`
            },
            handleDetailClick(row) {
                console.log(row, `/atreus/#/corpusdetails/${row.id}`)
                window.location.href = `/atreus/#/banneddetails/${row.id}`
                return false
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>