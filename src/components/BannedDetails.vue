<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    h1 {
        font-weight:bold;
        border-bottom:1px soild #ccc;
    }
    .bd {
        margin:0;
        padding:0;
        .el-color-picker {
            bottom:-13px;
        }
        .row {
            table {
                line-height: 20px;
                tr {
                    line-height: 20px;
                }
            }
            .alert {
                width:100%;
                height:60px;
                line-height:38px;
                text-align:left;
            }
            .el-button.is-circle {
                font-size: 20px;
            }
            .containor-rows {
                width:70rem;
                margin:0 auto;
                .el-select {
                    height: 40px;
                    line-height: 40px;
                }
                .rowset {
                    height:60px;
                    line-height:60px;
                }
                .col-lg-3 {
                    .el-form-item {
                        div {
                            margin:0 !important;
                        }

                    }
                }
            }
            .datagrid {
                width:100%;
                height:40rem;
            }
        }
    }
}
</style>
<template>
<div class="container_bd">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>修改禁用语--详情</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{path:'/'}">首页</router-link></li>
                        <li class="breadcrumb-item"><router-link :to="{path:'/bannedlist'}">禁用语列表</router-link></li>
                        <li class="breadcrumb-item active">修改禁用语--详情</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div class="bd">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-search"></i>
                            禁用语搜索条件
                        </h3>
                    </div>
                    <el-form ref="form" :inline="true" :model="form" label-width="120px">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm">
                                    <el-form-item label="搜索禁用语">
                                        <el-input v-model="formInline.queryWord" placeholder="请输入禁用语关键字"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="col-sm">
                                    <el-form-item>
                                        <el-button type="primary" @click="onSearchSubmit">查询</el-button>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card card-default color-palette-box">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-table"></i>
                            术语库-详情
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-success btn-sm btn-block" @click="SaveDatas">保存</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <el-table
                            :data="tableData"
                            v-loading="loading"
                            border
                            style="width: 100%"
                            height="650">
                            <el-table-column
                                fixed
                                prop="source"
                                label="原文"
                                width="450">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="handleClick(scope.$index, tableData)" type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="card-footer clearfix">
                        <div class="float-right">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size="pageSize"
                                @current-change="handleCurrentChange"
                                :total="pageTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
        title="修改禁用语内容"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <h4>禁用语：</h4>
        <span>
            <div class="md-form">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea id="form10" class="md-textarea form-control" rows="3" v-model="textdatas.source"></textarea>
            </div>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="SaveDatas">保 存</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    
    export default {
        name: "BannedDetails",
        data() {
            return {
                tableData: [{
                    source: '2016-05-02',
                    target: '王小虎'
                }],
                tempDatas:[],
                pageIndex: 1,
                pageSize: 100,
                pageTotal: 1,
                centerDialogVisible: false,
                textdatas: {},
                editorIndex: 0,
                formInline: {
                    queryWord:''
                },
                loading: true
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                save_corpus_item_status: "save_corpus_item_status",
                save_banned_status: 'save_banned_status',
                banned_item_datas: 'banned_item_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            save_corpus_item_status: function() {
                this.$data.centerDialogVisible = false
            },
            save_banned_status: function() {
                this.$data.centerDialogVisible = false
            },
            banned_item_datas: function() {
                let dataNumbers = this.$data.pageSize * this.$data.pageIndex
                let tabledatas = {}
                this.$data.tableData = []
                this.$data.tempDatas = this.banned_item_datas.data
                this.$data.pageTotal = this.banned_item_datas.total
                for (let data of this.$data.tempDatas) {
                    tabledatas = {}
                    tabledatas.source = data.bannedWord
                    this.$data.tableData.push(tabledatas)
                }
                this.$data.loading = false
            }
        },
        mounted() {
            this.$data.loading = true
            let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&bannedId=${this.$route.params.id}`
            this.$store.dispatch('getItemsBannedList', datas)
        },
        methods: {
            onSearchSubmit(event) {
                this.$data.loading = true
                this.$data.editorIndex = 0
                if (this.$data.formInline.queryWord.length <= 0) {
                    this.$message({
                        message: '请输入搜索关键字',
                        type: 'warning'
                    })
                    let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&bannedId=${this.$route.params.id}`
                    this.$store.dispatch('getItemsBannedList', datas)
                    return false
                }
                let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&bannedId=${this.$route.params.id}&queryWord=${this.$data.formInline.queryWord}`
                this.$store.dispatch('getItemsBannedList', datas)
            },
            SaveDatas(event) {
                let datas = {}
                let index = 0
                this.$data.centerDialogVisible = true
                datas = this.$data.tempDatas[this.$data.editorIndex]
                datas.bannedWord = this.$data.textdatas.source
                this.$store.dispatch('doSaveItemBanned', datas)
            },
            handleClick(index, rows) {
                console.log("handleClick : ", index, rows)
                this.$data.editorIndex = index
                this.$data.textdatas.source = rows[this.$data.editorIndex].source
                this.$data.centerDialogVisible = true
            },
            handleCurrentChange(val) {
                this.$data.loading = true
                this.$data.pageIndex = val
                let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&bannedId=${this.$route.params.id}`
                this.$store.dispatch('getItemsBannedList', datas)
            }
        }
    }
</script>