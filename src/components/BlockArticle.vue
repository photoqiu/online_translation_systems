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
        .row {
            .alert {
                width:100%;
                height:60px;
                line-height:38px;
                text-align:left;
            }
            .table td, .table th {
                padding:0;
                height:32px;
                line-height:32px;
            }
            .progress {
                margin:10px 0 0 0;
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
    <h1>项目区块列表</h1>
    <div class="bd">
        <div class="row">
            <div class="alert alert-primary" role="alert">
                <b>文件名称:</b> 世界人口状况报告-区块分析列表
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="起止时间：">
                    <el-date-picker
                        v-model="sTime"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="applyTime">确认时间</el-button>
                    <el-button type="primary" @click="onSubmit">创建区块</el-button>
                </el-form-item>
            </el-form>
            <canvas-datagrid v-bind.prop="grid" class="datagrid"></canvas-datagrid>
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
        name: "BlockArticle",
        componets : {
            canvasDatagrid:canvasDatagrid
        },
        data() {
            return {
                isUsedFaster:false,
                sTime: '',
                form: {},
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            console.log("0 -----------> datas : ", start, end)
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            console.log("1 -----------> datas : ", start, end)
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            console.log("2 -----------> datas : ", start, end)
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                grid: {
                    schema: [
                        {
                            name: '原文'
                        },
                        {
                            name: '状态(未翻译)'
                        },
                        {
                            name: '开始时间'
                        },
                        {
                            name: '结束时间'
                        },
                        {
                            name: '初译译员',
                            enum: []
                        },

                        {
                            name: '审校译员',
                            enum: []
                        }
                    ],
                    data: []
                },
                translators:[],
                activeName: 'second',
                pageIndex: 1
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                translator_models_datas: 'translator_models_datas',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            translator_models_datas: function() {
                for (let ukeys of this.translator_models_datas.translators.list) {
                    this.$data.translators.push([ukeys.id, ukeys.name])
                }
                if (this.translator_models_datas.translators.navigateLastPage > this.$data.pageIndex) {
                    this.$data.pageIndex += 1
                    let data = `?pageindex=${this.$data.pageIndex}`
                    this.$store.dispatch('getTranslatorInfo', data)
                } else {
                    for (let key of this.$data.grid.schema) {
                        if (key.hasOwnProperty("enum")) {
                            key.enum = this.$data.translators
                        }
                    }
                }
            },
            assign_part_list_datas: function() {
                this.$data.grid.data = []
                for (let keys of this.assign_part_list_datas.result) {
                    let models = {'原文': `${keys.source}`, '状态(未翻译)': '', '开始时间': '', '结束时间': '', '初译译员': '', '审校译员': ''}
                    this.$data.grid.data.push(models)
                }
                /*
                "id": 1,
                "projectId": 2,
                "projectFileId": 2,
                "partBegin": 2,
                "partEnd": 1011,
                "startTime": "2019-06-18 09:22:41",
                "endTime": "2019-06-18 09:22:41",
                "translateWordCount": 1011,
                "reviewWordCount": 1011,
                "translator": {
                    "id": 30
                },
                "reviewer": {
                    "id": 30
                }
                */
            }
        },
        mounted() {
            let datas = 6
            let pages = `?pageindex=${this.$data.pageIndex}`
            this.$store.dispatch('getPartInfo', datas)
            this.$store.dispatch('getTranslatorInfo', pages)
        },
        methods: {
            onSubmit(event) {
                let datas = {}
                datas.id = ''
                datas.projectId = ''
                datas.projectFile = ''
                datas.partBegin = ''
                datas.partEnd = ''
                datas.startTime = ''
                datas.endTime = ''
                datas.translateWordCount = ''
                datas.reviewWordCount = ''
                datas.translator = {}
                datas.reviewer = {}
            },
            applyTime: function() {
                let startTime = moment(this.$data.sTime[0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let endTime = moment(this.$data.sTime[1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                for (let keys of this.$data.grid.data) {
                    for(let key in keys) {
                        console.log("key : ", key, key === '开始时间', key === '结束时间')
                        keys.开始时间 = startTime
                        keys.结束时间 = endTime
                    }
                }
                console.log("this.$data.grid.data : ", this.$data.grid.data)
            },
            handleClick(event) {
                let eles = event.target
                let index = parseInt(eles.getAttribute("data-index"), 10)
                let datas = [this.$data.categoryDatas, index]
                this.$store.dispatch('changeServiceMenusInfo', datas)
            }
        }
    }
</script>