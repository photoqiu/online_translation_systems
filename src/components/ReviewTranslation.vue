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
                    <h1>审校操作区详情</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{path:'/'}">首页</router-link></li>
                        <li class="breadcrumb-item"><router-link :to="{path:`${updatasUrls}`}">项目文件列表</router-link></li>
                        <li class="breadcrumb-item active">审校操作区详情</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div class="bd">
        <div class="row">
            <div class="table_wapper">
                <grid :grid-data="gridsdata" :columns="columns" :showToolbar="isToolbar" @focus="focus" @updateValue="update"></grid>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    
    export default {
        name: "ReviewTranslation",
        data() {
            return {
                grid: {
                    data: []
                },
                updatasUrls: '',
                gridsdata: [],
                isToolbar: false,
                columns: [
                    { title: '原文', key: 'source', width: 980 },
                    { title: '译文', key: 'target', width: 880 },
                    { title: '状态', key: 'status', width: 180 },
                    { title: '备注', key: 'descs', width: 980 },
                    {
                        title: '翻译审校',
                        key: 'sureStatus',
                        width: 170,
                        fixed: true,
                        renderButton(rowData, index) {
                            return [
                            {
                                title: '确认翻译',
                                click(event) {
                                    console.log("0----------->eslint-disable-line : ", rowData, index, this, event.target)  //eslint-disable-line
                                }
                            },
                            {
                                title: '翻译有误',
                                click(event) {
                                    console.log("1----------->eslint-disable-line : ", rowData, index, this, event.target)  //eslint-disable-line
                                }
                            }]
                        },
                    }
                ],
                input_memory: '',
                input_term: '',
                input_fixed: '',
                isMemory:false,
                isFixed:false,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                name: '',
                region: '',
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
                dialogTableVisible: false,
                options: [],
                sxoptions: [],
                translators: [],
                pageIndex : 1,
                pageNum : 1,
                isTerm:false
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                translator_models_datas: 'translator_models_datas',
                save_part_status: 'save_part_status',
                translate_unit_datas: 'translate_unit_datas',
                save_translate_unit_status: 'save_translate_unit_status',
                part_sentence_list_datas: 'part_sentence_list_datas',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
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
            translator_models_datas: function() {
                let datas = {}
                for (let ukeys of this.translator_models_datas.translators.list) {
                    datas = {}
                    datas.id = ukeys.id
                    datas.name = ukeys.name
                    this.$data.options.push(datas)
                    this.$data.translators.push([ukeys.id, ukeys.name])
                }
                if (this.translator_models_datas.translators.navigateLastPage > this.$data.pageIndex) {
                    this.$data.pageIndex += 1
                    let data = `?pageindex=${this.$data.pageIndex}`
                    this.$store.dispatch('getTranslatorInfo', data)
                } else {
                    this.$data.options[0] = this.$data.translators
                    this.$data.sxoptions[0] = this.$data.translators
                    console.log("this.$data.translators:", this.$data.translators)
                    /*
                    for (let key of this.$data.grid.schema) {
                        if (key.hasOwnProperty("enum")) {
                            key.enum = this.$data.translators
                        }
                    }
                    */
                }
            },
            part_sentence_list_datas: function() {
                console.log("part_sentence_list_datas ： ", this.part_sentence_list_datas)
            },
            assign_part_list_datas: function() {
                this.$data.grid.data = []
                this.$data.gridDatas = this.assign_part_list_datas.result
                let ProjectFileId = 1
                let ProjectId = 1
                for (let keys of this.assign_part_list_datas.result) {
                    let models = {'原文': `${keys.source}`, '状态(未翻译)': '', '开始时间': '', '结束时间': '', '初译译员': '', '审校译员': ''}
                    this.$data.contents.push(keys.source)
                    ProjectFileId = keys.projectFileId
                    ProjectId = keys.projectId
                    this.$data.grid.data.push(models)
                }
                let objects = {}
                objects.projectFileId = ProjectFileId
                objects.projectId = ProjectId
                this.$store.dispatch('getPartSentenceList', objects)
            }
        },
        mounted() {
            let datas = this.$route.params.id || 1
            let data = {}
            let pages = `?pageindex=${this.$data.pageIndex}`
            data.projectFileId = this.$route.params.fid || 1
            data.partId = this.$route.params.id || 1
            data.pageNum = this.$data.pageNum
            this.$store.dispatch('getTranslateUnitList', data)
            this.$store.dispatch('getTranslatorInfo', pages)
            this.$data.updatasUrls = `/projectdetail/${this.$route.params.fid}`
        },
        methods : {
            memoryClick() {
                this.$data.isMemory = !this.$data.isMemory
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
                datas.status = 3
                this.$data.gridsdata[index]['status'] = '已审校'
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