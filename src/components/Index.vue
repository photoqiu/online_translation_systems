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
                            <el-option label="张三" value="shanghai"></el-option>
                            <el-option label="李四" value="beijing"></el-option>
                            <el-option label="王五" value="beijing"></el-option>
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
    <el-table
        :data="tableData"
        border
        style="width:1430"
        max-height="550">
        <el-table-column
          fixed
          prop="projectname"
          label="项目名称"
          width="420">
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
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">去翻译</el-button>
            <el-button type="text" size="small">审校</el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="1000">
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
                tableData: [{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                }]
            }
        },
        mounted() {
            localForage.getItem('users').then(function(value) {
                let data = {}
                let userDatas = value
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>