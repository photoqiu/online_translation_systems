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
                    <h1>项目列表</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">首页</a></li>
                        <li class="breadcrumb-item active">项目列表</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>
    <el-row :gutter="20">
        <el-col :span="4">
            <div class="grid-content">
                <el-input v-model="form.name" placeholder="请输入项目名字"></el-input>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <el-select v-model="form.managerId" filterable placeholder="请选择项目经理">
                    <el-option
                        v-for="(item, $index) in form.managers"
                        :key="$index"
                        :data-datas="item.id"
                        :label="item.nickName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <el-select v-model="form.customerId" filterable placeholder="请选择客户名称">
                    <el-option
                        v-for="(item, $index) in form.customers"
                        :key="$index"
                        :data-datas="item.id"
                        :label="item.customerName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content">
                <el-select v-model="form.languageFromStr" filterable placeholder="请选择源语言">
                    <el-option
                        v-for="(item, $index) in form.languageFrom"
                        :key="$index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content">
                <el-select v-model="form.languageToStr" filterable placeholder="请选择目标语言">
                    <el-option
                        v-for="(item, $index) in form.languageTo"
                        :key="$index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <el-button type="primary" @click="searchFromDatas()">搜索</el-button>
            </div>
        </el-col>
    </el-row>
    <el-divider content-position="left">项目详情</el-divider>
    <el-table
        :data="tableData"
        border
        style="width:1430"
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
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="totalPage">
    </el-pagination>
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