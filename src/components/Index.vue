<style lang="less" scoped>
.container_bd {
    width:100%;
    min-height:100%;
    display:block;
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
    .card-title {
        height:30px;
        line-height:30px;
    }
}
</style>
<template>
<div class="container_bd">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>项目列表</h1>
                </div>
            </div>
        </div>
    </section>
    <div class="bd">
        <div class="row">
            <div class="card card-default col-12">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-search"></i>
                        项目列表-搜索条件
                    </h3>
                    <div class="card-tools">
                        <router-link class="btn btn-outline-info" role="button" :to="{path:'/createbase'}">新建项目</router-link>
                    </div>
                </div>
                <el-form ref="form" :model="form" label-width="110px">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="项目名称:">
                                    <el-input v-model="form.name" placeholder="请输入项目名字"></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="项目经理:">
                                    <el-select v-model="form.managerId" filterable placeholder="请选择项目经理">
                                        <el-option
                                            v-for="(item, $index) in form.managers"
                                            :key="$index"
                                            :data-datas="item.id"
                                            :label="item.nickName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="客户名称：">
                                    <el-select v-model="form.customerId" filterable placeholder="请选择客户名称">
                                        <el-option
                                            v-for="(item, $index) in form.customers"
                                            :key="$index"
                                            :data-datas="item.id"
                                            :label="item.customerName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="源语言：">
                                    <el-select v-model="form.languageFromStr" filterable placeholder="请选择源语言">
                                        <el-option
                                            v-for="(item, $index) in form.languageFrom"
                                            :key="$index"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="目标语言：">
                                    <el-select v-model="form.languageToStr" filterable placeholder="请选择目标语言">
                                        <el-option
                                            v-for="(item, $index) in form.languageTo"
                                            :key="$index"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-form-item label="状态搜索：">
                                    <el-select v-model="form.status" filterable placeholder="请选择目标语言">
                                        <el-option
                                            v-for="(item, $index) in form.liststatus"
                                            :key="$index"
                                            :label="item.values"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="col-sm-12 col-6 col-md-4">
                                <el-button type="primary" @click="searchFromDatas()">搜索</el-button>
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
                        项目列表
                    </h3>
                </div>
                <div class="card-body">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        height="550">
                        <el-table-column
                          fixed
                          prop="projectname"
                          label="项目名称"
                          width="420">
                        </el-table-column>
                        <el-table-column
                          prop="baseId"
                          label="项目Id"
                          width="120">
                        </el-table-column>  
                        <el-table-column
                          prop="qkname"
                          label="区块名称"
                          width="220">
                        </el-table-column>
                        <el-table-column
                          prop="language"
                          label="语言"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="wordnumbers"
                          label="字数"
                          width="220">
                        </el-table-column>
                        <el-table-column
                          prop="date"
                          label="区块起止时间"
                          width="240">
                        </el-table-column>
                        <el-table-column
                          prop="process"
                          label="完成进度"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          fixed="pmname"
                          label="项目经理"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="220">
                          <template slot-scope="scope">
                            <el-button @click="handleDetailClick(scope.row)" type="text" size="small">项目详情</el-button>
                            <el-button @click="handleReportClick(scope.row)" type="text" size="small">项目报告</el-button>
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
        name: "Index",
        data() {
            return {
                form : {
                    managers: [],
                    managersId: '',
                    customers: [],
                    customerId: '',
                    languageFrom: [],
                    languageFromStr: '',
                    languageTo: [],
                    languageToStr: '',
                    status:'',
                    liststatus:[
                        {
                            id:1,
                            values:'未分配'
                        },
                        {
                            id:2,
                            values:'进行中'
                        },
                        {
                            id:3,
                            values:'初译完成'
                        },
                        {
                            id:4,
                            values:'审校完成'
                        }
                    ],
                    name:""
                },
                project_datas: [],
                tableData: [{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    baseId: '1',
                    process: "40%"
                }],
                pageIndex : 1,
                customer_indexpage: 1,
                totalPage:0,
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                users_list_datas: 'users_list_datas',
                get_language_datas: 'get_language_datas',
                customer_info_datas: 'customer_info_datas',
                project_list_datas: 'project_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            customer_info_datas: function() {
                for (let keys of this.customer_info_datas.list) {
                    keys.labelName = `${keys.customerName}--${keys.organName}`
                    this.$data.form.customers.push(keys)
                }
                if (this.$data.customer_indexpage >= this.customer_info_datas.pages) {
                    return false
                }
                this.$data.customer_indexpage += 1
                this.$store.dispatch('getCustomerInfo', this.$data.customer_indexpage)
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId <= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.project_datas.push(keys)
                        this.$data.form.managers.push(keys)
                    }
                }
                if (this.$data.project_indexpage >= this.users_list_datas.pages) {
                    return false
                }
                this.$data.project_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.project_indexpage)
            },
            get_language_datas: function() {
                let datas = {}
                for (let keys of this.get_language_datas) {
                    datas = {}
                    datas.value = keys.languageKey
                    datas.label = keys.languageName
                    this.$data.form.languageFrom.push(datas)
                    this.$data.form.languageTo.push(datas)
                }
            },
            project_list_datas: function() {
                this.$data.totalPage = this.project_list_datas.navigateLastPage
                let datas = {}
                this.$data.tableData = []
                for (let keys of this.project_list_datas.list) {
                    datas = {}
                    datas.date = `${keys.startTime}~${keys.endTime}`
                    datas.name = `${keys.customer.customerName}`
                    datas.pmname = `${keys.projectManager.nickName}`
                    datas.projectname = `${keys.projectName}`
                    datas.qkname = `${keys.projectName}`
                    datas.language = `${keys.languageFrom}->${keys.languageTo}`
                    datas.wordnumbers = `${keys.wordCount}`
                    datas.baseId = `${keys.id}`
                    if (keys.translateProgress === null) {
                        datas.process = `0%`
                    } else {
                        datas.process = `${keys.translateProgress}%`
                    }
                    this.$data.tableData.push(datas)
                }
            }
        },
        mounted() {
            console.log("1111111111111111111111", this)
            let data = {}
            data.page = this.$data.pageIndex
            data.datas = ''
            this.$store.dispatch('getProjectList', data)
            let datas = '1'
            this.$store.dispatch('getUsersInfo', datas)
            this.$store.dispatch('getLanguage', '')
            this.$store.dispatch('getCustomerInfo', datas)
        },
        methods: {
            searchFromDatas(event) {
                this.$data.pageIndex = 1
                let data = {}
                data.page = this.$data.pageIndex
                data.datas = ''
                console.log("this.$data.form.status:", this.$data.form)
                if (!!this.$data.form.status) {
                    data.datas += `&status=${this.$data.form.status}`
                }
                if (!!this.$data.form.name) {
                    data.datas += `&projectName=${this.$data.form.name}`
                }
                if (!!this.$data.form.managersId) {
                    data.datas += `&managersId=${this.$data.form.managersId}`
                }
                if (!!this.$data.form.customerId) {
                    data.datas += `&customerId=${this.$data.form.customerId}`
                }
                if (!!this.$data.form.languageFromStr) {
                    data.datas += `&languageFrom=${this.$data.form.languageFromStr}`
                }
                if (!!this.$data.form.languageToStr) {
                    data.datas += `&languageTo=${this.$data.form.languageToStr}`
                }
                console.log("data:", data)
                this.$store.dispatch('getProjectList', data)
            },
            handleClick(row) {
                console.log(row)
                window.location.href = `/atreus/#/blockarticle/${row.baseId}`
            },
            handleReportClick(row) {
                console.log(row)
                window.location.href = `/atreus/#/qareport/${row.baseId}`
            },
            handleDetailClick(row) {
                console.log(row)
                window.location.href = `/atreus/#/projectdetail/${row.baseId}`
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.$data.pageIndex = val
                let data = {}
                data.page = val
                data.datas = ''
                if (!!this.$data.form.name) {
                    data.datas += `&projectName=${this.$data.form.name}`
                }
                if (!!this.$data.form.managersId) {
                    data.datas += `&managersId=${this.$data.form.managersId}`
                }
                if (!!this.$data.form.customerId) {
                    data.datas += `&customerId=${this.$data.form.customerId}`
                }
                if (!!this.$data.form.languageFromStr) {
                    data.datas += `&languageFrom=${this.$data.form.languageFromStr}`
                }
                if (!!this.$data.form.languageToStr) {
                    data.datas += `&languageTo=${this.$data.form.languageToStr}`
                }
                this.$store.dispatch('getProjectList', data)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>