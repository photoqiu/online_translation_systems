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
                <grid :grid-data="gridsdata" :columns="columns" showCheckbox columnSet @focus="focus" @updateValue="update"></grid>
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
    import {mapGetters} from 'vuex'
    import canvasDatagrid from 'canvasDatagrid'
    
    export default {
        name: "Translation",
        componets : {
            canvasDatagrid:canvasDatagrid
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                translate_unit_datas: 'translate_unit_datas',
                save_translate_unit_status: 'save_translate_unit_status',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            translate_unit_datas:function() {
                this.$data.grid.data = []
                let _self = this
                let status = ''
                let datas = {}
                for (let keys of this.translate_unit_datas.result) {
                    if (keys.status === 1) {
                        status = '未翻译'
                    } else if (keys.status === 2) {
                        status = '已翻译'
                    } else if (keys.status === 3) {
                        status = '已审校'
                    }
                    datas = {'source': `${keys.source}`, 'target': `${keys.target}`, 'status': `${status}`, 'descs': `${keys.remarks}`}
                    this.$data.gridsdata.push(datas)
                    this.$data.grid.data.push(keys)
                }
            },
            save_translate_unit_status: function() {
                console.log("save_translate_unit_status:", this.save_translate_unit_status)
            },
            assign_part_list_datas: function() {
                console.log("assign_part_list_datas: ", this.assign_part_list_datas)
            }
        },
        data() {
            return {
                grid: {
                    data: []
                },
                gridsdata: [],
                columns: [
                    { title: '原文', key: 'source', width: 980 },
                    { title: '译文', key: 'target', width: 880 },
                    { title: '状态', key: 'status', width: 180 },
                    { title: '备注', key: 'descs', width: 980 },
                    {
                        title: '确认保存',
                        key: 'savestatus',
                        width: 70,
                        fixed: true,
                        renderButton(rowData, index) {
                            return [{
                                title: '确认保存',
                                click() {
                                    console.log(rowData, index, this)  //eslint-disable-line
                                },
                            }]
                        },
                    },
                ],
                input_memory: '',
                input_term: '',
                input_fixed: '',
                isMemory:false,
                isFixed:false,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form: {
                    orgname:'',
                    name:'',
                    region:''
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
                pageIndex: 1,
                pageNum: 1,
                dialogTableVisible: false,
                isTerm:false
            }
        },
        mounted() {
            let datas = this.$route.params.id || 1
            let data = {}
            let pages = `?pageindex=${this.$data.pageIndex}`
            data.projectFileId = this.$route.params.fid || 1
            data.partId = this.$route.params.id || 1
            data.pageNum = this.$data.pageNum
            this.$store.dispatch('getPartInfo', datas)
            this.$store.dispatch('getTranslatorInfo', pages)
            this.$store.dispatch('getTranslateUnitList', data)
        },
        methods : {
            memoryClick() {
                // this.$data.isMemory = !this.$data.isMemory
            },
            update(value) {
                console.log("update:", value) //eslint-disable-line
                let rowDatas = {}
                let index = -1
                for (let keys of value) {
                    rowDatas = keys.rowData
                    index = keys.index
                }
                let datas = {} 
                datas.source = rowDatas['source']
                datas.target = rowDatas['target']
                datas.remarks = rowDatas['descs']
                datas.id = this.$data.grid.data[index]['id']
                datas.projectId = this.$data.grid.data[index]['projectId']
                datas.projectFileId = this.$data.grid.data[index]['projectFileId']
                datas.paragraphId = this.$data.grid.data[index]['paragraphId']
                datas.sequence = this.$data.grid.data[index]['sequence']
                datas.status = 2
                this.$data.gridsdata[index]['status'] = '已翻译'
                this.$store.dispatch('doSaveTranslateUnit', datas)
            },
            focus(value) {
                console.log("focus:", value) //eslint-disable-line
            },
            fixedClick() {
                this.$data.isFixed = !this.$data.isFixed
            },
            termClick() {
                this.$data.isTerm = !this.$data.isTerm
            }
        }
    }
</script>