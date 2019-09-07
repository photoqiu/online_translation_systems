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
    <h1>修改禁用语--详情</h1>
    <div class="bd">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
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
                    prop="target"
                    label="译文"
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
            <div class="col-md-2"></div>
        </div>
        <div class="row">
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange"
                    :total="pageTotal">
                </el-pagination>
            </div>
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <button type="button" class="btn btn-success btn-lg btn-block" @click="SaveDatas">保存</button>
            </div>
        </div>
    </div>
    <el-dialog
        title="修改禁用语内容"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <h4>原文：</h4>
        <span>{{textdatas.source}}</span>
        <h4>译文：</h4>
        <span>
            <div class="md-form">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea id="form10" class="md-textarea form-control" rows="3" v-model="textdatas.target"></textarea>
                <label for="form10">Icon Prefix</label>
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
                loading: true
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                save_corpus_item_status: "save_corpus_item_status",
                get_corpus_list_datas: 'get_corpus_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            save_corpus_item_status: function() {
                this.$data.centerDialogVisible = false
            },
            get_corpus_list_datas: function() {
                let dataNumbers = this.$data.pageSize * this.$data.pageIndex
                let tabledatas = {}
                this.$data.tableData = []
                this.$data.tempDatas = this.get_corpus_list_datas.data
                this.$data.pageTotal = this.get_corpus_list_datas.total
                for (let data of this.$data.tempDatas) {
                    tabledatas = {}
                    tabledatas.source = data.source
                    tabledatas.target = data.target
                    this.$data.tableData.push(tabledatas)
                }
                this.$data.loading = false
            }
        },
        mounted() {
            this.$data.loading = true
            let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&corpusId=${this.$route.params.id}`
            this.$store.dispatch('getCorpusItemList', datas)
        },
        methods: {
            SaveDatas(event) {
                let datas = {}
                let index = 0
                this.$data.centerDialogVisible = true
                datas = this.$data.tempDatas[this.$data.editorIndex]
                datas.target = this.$data.textdatas.target
                console.log("datas:", datas, this.$data.editorIndex)
                this.$store.dispatch('doSaveItemCoups', datas)
            },
            handleClick(index, rows) {
                this.$data.editorIndex = index - 1
                this.$data.textdatas.source = this.$data.tempDatas[this.$data.editorIndex].source
                this.$data.textdatas.target = this.$data.tempDatas[this.$data.editorIndex].target
                this.$data.centerDialogVisible = true
            },
            handleCurrentChange(val) {
                this.$data.loading = true
                this.$data.pageIndex = val
                let datas = `pageNum=${this.$data.pageIndex}&pageSize=${this.$data.pageSize}&corpusId=${this.$route.params.id}`
                this.$store.dispatch('getCorpusItemList', datas)
            }
        }
    }
</script>