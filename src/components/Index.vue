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
    <el-row :gutter="20">
        <el-col :span="12">
            <div class="grid-content">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名称:">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="form.search_text"></el-input>
                    </el-form-item>

                    <el-form-item label="项目经理:">
                        <el-select v-model="form.region_users" placeholder="请选择项目经理">
                            <el-option
                                v-for="(item, $index) in project_datas"
                                :key="$index"
                                :data-datas="item.json_datas"
                                :label="item.nickName"
                                :value="item.json_datas">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态:">
                        <el-select v-model="form.status" placeholder="请选择项目状态">
                            <el-option label="未进行" value="shanghai"></el-option>
                            <el-option label="进行中" value="beijing"></el-option>
                            <el-option label="审核校对" value="beijing"></el-option>
                            <el-option label="已完成" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">项目列表</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <router-link class="btn btn-outline-info" role="button" :to="{path:'/createbase'}">新建项目</router-link>
                </div>
            </div>
        </div>
    </el-row>
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
                    search_text: "",
                    region_users: "",
                    status:""
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
                totalPage:0,
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                users_list_datas: 'users_list_datas',
                project_list_datas: 'project_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId <= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.project_datas.push(keys)
                    }
                }
                if (!!this.users_list_datas.isLastPage) {
                    return false
                }
                this.$data.project_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.project_indexpage)
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
                console.log("project_list_datas : ", this.project_list_datas)
            }
        },
        mounted() {
            console.log("1111111111111111111111", this)
            this.$store.dispatch('getProjectList', this.$data.pageIndex)
            let datas = '1'
            this.$store.dispatch('getUsersInfo', datas)
        },
        methods: {
            handleClick(row) {
                console.log(row)
                window.location.href = `/#/blockarticle/${row.baseId}`
            },
            handleDetailClick(row) {
                console.log(row)
                window.location.href = `/#/projectdetail/${row.baseId}`
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