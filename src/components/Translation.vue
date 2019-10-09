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
                    height:100%;
                }
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
                    <h1>初译操作区详情</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/">首页</a></li>
                        <li class="breadcrumb-item"><a href="#">项目列表</a></li>
                        <li class="breadcrumb-item"><a href="#">项目区块列表</a></li>
                        <li class="breadcrumb-item active">初译操作区详情</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>
    <div class="bd">
        <div class="row">
            <div class="table_wapper">
                <grid :grid-data="gridsdata" :columns="columns" showCheckbox columnSet @focus="focus" @updateValue="update"></grid>
            </div>
        </div>
    </div>
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