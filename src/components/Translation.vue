<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .bd {
        width:100%;
        height:100%;
        .row {
            width:100%;
            height:100%;
            position:relative;
            h3 {
                width:100%;
                margin: 20px 0 10px 0;
                padding: 0 0 10px 0;
                border-bottom:1px solid #ccc;
                text-align:center;
            }
            .btn-group {
                float:left;
                width:420px;
                position:absolute;
                top:10px;
                right:10px;
            }
            .table_wapper {
                width:100%;
                height:100%;
                .datagrid {
                    width:100%;
                    height:70%;
                }
            }
            .popovers {
                position: absolute;
                right:0;
                top:60px;
                .card_wapper {
                    width:1172px;
                    height:100%;
                    margin: 50px 0 0 0;
                    .card {
                        width:1172px;
                        over-flow:hidden;
                        .card-header {
                            line-height:24px;
                            text-align:left;
                            .el-input {
                                width:360px;
                            }
                        }
                        .card-body {
                            line-height:24px;
                            height:260px;
                            over-flow-y:scroll;
                            table {
                                tr {
                                    td {
                                        text-align:left;
                                        p {
                                            margin: 0;
                                            padding: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="bd">
        <div class="row">
            <div class="table_wapper">
                <h3>翻译操作区</h3>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" @click="memoryClick">记忆库</button>
                    <button type="button" class="btn btn-secondary" @click="termClick">术语库</button>
                    <button type="button" class="btn btn-secondary"  @click="dialogTableVisible = true">翻译QA</button>
                    <button type="button" class="btn btn-secondary" @click="fixedClick">修订记录</button>
                </div>
                <canvas-datagrid v-bind.prop="grid" class="datagrid"></canvas-datagrid>
            </div>
            <div class="popovers">
                <div class="card_wapper">
                    <div class="card bg-light mb-3" v-show="isMemory">
                        <div class="card-header">记忆库
                            <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                clearable
                                v-model="input_memory">
                            </el-input>
                            <button type="button" class="close" data-dismiss="alert" @click="memoryClick" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <table class="table table-hover table-bordered table-sm">
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>衷心祝愿让我们共同的事业获得成功共同努力，共创美好未来！</td>
                                        <td>50%</td>
                                        <td>I sincerely hope that our common cause will be successful, and I wish us a bright future!</td>
                                        <td>
                                            <p>来自：译者A</p>
                                            <p>时间：2018.12.31</p>
                                            <p>项目：世界报告</p>
                                        </td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card bg-light mb-3" v-show="isTerm">
                        <div class="card-header">术语库
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            clearable
                            v-model="input_term">
                        </el-input>
                        <button type="button" class="btn btn-link" @click="dialogFormVisible = true">添加到术语库</button>
                        <button type="button" class="close" data-dismiss="alert" @click="termClick" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <table class="table table-hover table-bordered table-sm">
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>共同努力</td>
                                        <td>TB</td>
                                        <td>work together</td>
                                        <td>
                                            <p>来自：Rumin</p>
                                            <p>时间：2019.1.31</p>
                                            <p>项目：北京报告</p>
                                        </td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card bg-light mb-3" v-show="isFixed">
                        <div class="card-header">修订记录
                            <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                clearable
                                v-model="input_fixed">
                            </el-input>
                            <button type="button" class="close" data-dismiss="alert" @click="fixedClick" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <table class="table table-hover table-bordered table-sm">
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="添加术语库" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="原文" :label-width="formLabelWidth">
                <el-input v-model="form.orgname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="译文" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="来源" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择文章来源">
                    <el-option label="文章来源1" value="shanghai"></el-option>
                    <el-option label="文章来源2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
    </el-dialog>
    <el-dialog title="翻译QA" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="errornumbers" label="句段" width="150"></el-table-column>
            <el-table-column property="errorname" label="错误类型" width="200"></el-table-column>
            <el-table-column property="errordesc" label="错误描述"></el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import canvasDatagrid from 'canvasDatagrid'
    
    export default {
        name: "Translation",
        componets : {
            canvasDatagrid:canvasDatagrid
        },
        data() {
            return {
                grid: {
                    data: [
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''},
                        {'原文': 'foo', '译文': 'a', '状态': 'a', '备注': ''}
                    ]
                },
                input_memory: '',
                input_term: '',
                input_fixed: '',
                isMemory:true,
                isFixed:true,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form: {
                    orgname:'',
                    name:'',
                    region:'',
                },
                gridData: [
                    {
                        errornumbers: '12',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '14',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '20',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '23',
                        errorname: '错误类型',
                        errordesc: '多义词错误'
                    }
                ],
                dialogTableVisible: false,
                isTerm:true
            }
        },
        methods : {
            memoryClick() {
                this.$data.isMemory = !this.$data.isMemory
            },
            fixedClick() {
                this.$data.isFixed = !this.$data.isFixed
            },
            termClick() {
                this.$data.isTerm = !this.$data.isTerm
            }
        },
        mounted() {
            let _self = this
        }
    }
</script>