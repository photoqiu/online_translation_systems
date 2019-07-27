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
    <h1>项目区块列表</h1>
    <div class="bd">
        <div class="row">
            <div class="alert alert-primary" role="alert">
                <b>文件名称:</b> {{fileName}}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="添加人员配置：">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUsers" circle></el-button>
                </el-form-item>
                <div class="containor-rows">
                    <div class="row" v-for="(item, $index) in order" :key="$index">
                        <div class="col-lg-12 col-12 col-sm-12 rowset" >
                            <el-form-item label="起止时间：">
                                <el-date-picker
                                    v-model="sTime[$index]"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="col-lg-3 col-3 col-sm-3 rowset" >
                            <el-input-number size="medium" v-model="num[$index]" :step="1"></el-input-number>
                        </div>
                        <div class="col-lg-6 col-6 col-sm-6 rowset" >
                            <el-select v-model="values[$index]" filterable placeholder="请选择初译员">
                                <el-option
                                  v-for="(items, $indexes) in options"
                                  :key="$indexes"
                                  :label="items.name"
                                  :value="items.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="valuex[$index]" filterable placeholder="请选择审校员">
                                <el-option
                                  v-for="(items, $indexsx) in sxoptions"
                                  :key="$indexsx"
                                  :label="items.name"
                                  :value="items.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="col-lg-3 col-3 col-sm-3 rowset" >
                            <el-button type="warning" :data-index="$index" icon="el-icon-video-play" @click="applydatas" circle></el-button>
                            <el-button type="danger" :data-index="$index" icon="el-icon-delete" @click="delUserControllers" circle></el-button>
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="applyAverageDatas">均分确认</el-button>
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
                sTime: [[]],
                num: [1],
                beginNums:[0],
                form: {},
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
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
                contents:[],
                options: [],
                sxoptions: [],
                order: 1,
                color2: '',
                values : [],
                valuex : [],
                projectId: 0,
                fileId: '',
                activeName: 'second',
                isConUsed: [true],
                gridDatas:[],
                fileId:'',
                fileName:'',
                pageIndex: 1
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                translator_models_datas: 'translator_models_datas',
                save_part_status: 'save_part_status',
                part_sentence_list_datas: 'part_sentence_list_datas',
                project_detail_datas: 'project_detail_datas',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            save_part_status: function() {

            },
            translator_models_datas: function() {
                let datas = {}
                for (let ukeys of this.translator_models_datas.translators.list) {
                    datas = {}
                    datas.id = ukeys.id
                    datas.name = ukeys.name
                    this.$data.options.push(datas)
                    this.$data.sxoptions.push(datas)
                    this.$data.translators.push([ukeys.id, ukeys.name])
                }
                if (this.translator_models_datas.translators.navigateLastPage > this.$data.pageIndex) {
                    this.$data.pageIndex += 1
                    let data = `?pageindex=${this.$data.pageIndex}`
                    this.$store.dispatch('getTranslatorInfo', data)
                } else {
                    console.log("this.$data.options : ", this.$data.options)
                }
            },
            part_sentence_list_datas: function() {
                if (this.part_sentence_list_datas.length > 0) {
                    this.$data.beginNums[0] = 0
                    let dataindex = 1
                    let index = 0
                    let modelsIndex = 0
                    let orderIndex = 0
                    this.$data.order = this.part_sentence_list_datas.length
                    for (let keys of this.part_sentence_list_datas) {
                        orderIndex = keys.partEnd - keys.partBegin
                        this.$data.beginNums[dataindex] = keys.partEnd - keys.partBegin
                        this.$data.sTime[index] = [new Date(keys.startTime), new Date(keys.endTime)]
                        this.$data.num[index] = keys.partEnd - keys.partBegin
                        this.$data.valuex[index] = keys.reviewer.name
                        this.$data.values[index] = keys.translator.name
                        dataindex += 1
                        index += 1
                    }
                    dataindex = 1
                    index = 0
                    orderIndex = this.$data.beginNums[dataindex]
                    for (let key of this.$data.grid.data) {
                        if (orderIndex > modelsIndex) {
                            key['开始时间'] = this.part_sentence_list_datas[index].startTime
                            key['结束时间'] = this.part_sentence_list_datas[index].endTime
                            key['初译译员'] = this.$data.values[index]
                            key['审校译员'] = this.$data.valuex[index]
                        } else {
                            dataindex += 1
                            index += 1
                            orderIndex += this.$data.beginNums[dataindex]
                            key['开始时间'] = this.part_sentence_list_datas[index].startTime
                            key['结束时间'] = this.part_sentence_list_datas[index].endTime
                            key['初译译员'] = this.$data.values[index]
                            key['审校译员'] = this.$data.valuex[index]
                        }
                        modelsIndex += 1
                    }
                }
            },
            project_detail_datas: function() {
                for (let keys of this.project_detail_datas.sourceFiles) {
                    if (keys.file.id === this.$data.fileId) {
                        this.$data.fileName = keys.file.fileName
                    }
                }
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
                let partInfoArguments = `?projectFileId=${this.$route.params.fid}`
                this.$store.dispatch('getPartSentenceList', partInfoArguments)
            }
        },
        mounted() {
            let datas = this.$route.params.id || 1
            this.$data.fileId = parseInt(this.$route.params.fid, 10) || 1
            this.$data.projectId = this.$route.params.id || 1
            this.$data.fileId = parseInt(this.$route.params.fid, 10) || 1
            let pages = `?pageindex=${this.$data.pageIndex}`
            let partInfoArguments = `?projectFileId=${this.$route.params.fid}`
            this.$store.dispatch('getPartInfo', this.$data.fileId)
            this.$store.dispatch('getPartSentenceList', partInfoArguments)
            this.$store.dispatch('getTranslatorInfo', pages)
            this.$store.dispatch('getPorjectDetails', datas)
        },
        methods: {
            addUsers(event) {
                let arr = []
                this.$data.order += 1
                this.$data.isConUsed.push(true)
                this.$data.options.push(this.$data.translators)
                this.$data.sxoptions.push(this.$data.translators)
                this.$data.sTime.push(arr)
                this.$data.num.push(1)
                this.$data.beginNums.push(0)
            },
            applyAverageDatas() {
                console.log("this.$data.grid.data:", this.$data.grid.data)
                let total = this.$data.grid.data.length
                let lens = this.$data.num.length
                let sr_nums = Math.ceil(total / lens)
                let startTime = []
                let endTime = []
                let orderIndex = 0
                let index = 0
                let sr_index = 1
                for (var i = 0; i < lens; i++) {
                    if (i < lens) {
                        this.$data.beginNums[i] = sr_nums * i
                    }
                    this.$data.beginNums[lens] = total
                    this.$data.num[i] = sr_nums
                    startTime[i] = moment(this.$data.sTime[i][0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                    endTime[i] = moment(this.$data.sTime[i][1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                }
                this.$data.beginNums[lens] = total
                console.log("this.$data.beginNums:", this.$data.num.length, this.$data.beginNums)
                for (let keys of this.$data.gridDatas) {
                    if (this.$data.beginNums[sr_index] > orderIndex) {
                        this.$data.grid.data[orderIndex] = {'原文': `${keys.source}`, '状态(未翻译)': '待翻译', '开始时间': `${startTime[index]}`, '结束时间': `${endTime[index]}`, '初译译员': `${this.$data.values[index]}`, '审校译员': `${this.$data.valuex[index]}`}
                    } else {
                        sr_index += 1
                        index += 1
                        this.$data.grid.data[orderIndex] = {'原文': `${keys.source}`, '状态(未翻译)': '待翻译', '开始时间': `${startTime[index]}`, '结束时间': `${endTime[index]}`, '初译译员': `${this.$data.values[index]}`, '审校译员': `${this.$data.valuex[index]}`}
                    }
                    orderIndex += 1
                }
            },
            applydatas(event) {
                let elements = event.currentTarget
                let models = {}
                let index = parseInt(elements.getAttribute("data-index"), 10)
                let orderIndex = this.$data.beginNums[index]
                let sideIndex = this.$data.beginNums[index]
                let arrIndex = index + 1
                let numTotal = this.$data.beginNums[index]
                let startTime = moment(this.$data.sTime[index][0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let endTime = moment(this.$data.sTime[index][1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let totalIndex = this.$data.num[index] + this.$data.beginNums[index]
                ////////////////////////////////////////
                for (let keys of this.$data.gridDatas) {
                    if (totalIndex > orderIndex && sideIndex <= orderIndex) {
                        this.$data.grid.data[orderIndex] = {'原文': `${keys.source}`, '状态(未翻译)': '待翻译', '开始时间': `${startTime}`, '结束时间': `${endTime}`, '初译译员': `${this.$data.values[index]}`, '审校译员': `${this.$data.valuex[index]}`}
                    }
                    orderIndex += 1
                }
                if (totalIndex <= this.$data.gridDatas.length) {
                    this.$data.beginNums[arrIndex] = totalIndex
                } else {
                    this.$data.num[arrIndex] = 0
                    this.$data.beginNums[arrIndex] = this.$data.gridDatas.length
                }
            },
            delUserControllers(event) {
                let elements = event.currentTarget
                let index = parseInt(elements.getAttribute("data-index"), 10)
                this.$data.sTime.splice(index, 1)
                this.$data.num.splice(index, 1)
                this.$data.beginNums.splice(index, 1)
            },
            onSubmit(event) {
                let datas = []
                let index = 0
                let wordLens = 0
                let beginIndex = 0
                let tmpArray = []
                let keys = {}
                console.log("this.$data.beginNums:", this.$data.beginNums)
                for (var i = 0, lens = this.$data.beginNums.length; i < lens; i++) {
                    tmpArray = []
                    let index = this.$data.beginNums[i]
                    let eindex = i + 1
                    keys = {}
                    keys.translateWordCount = 0
                    keys.reviewWordCount = 0
                    console.log("timer:", this.$data.sTime[i]);
                    keys.startTime = moment(this.$data.sTime[i][0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                    keys.endTime = moment(this.$data.sTime[i][1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                    keys.partId = 0
                    keys.id = 0
                    keys.projectId = this.$data.projectId
                    keys.projectFileId = this.$data.fileId
                    keys.partBegin = this.$data.beginNums[i]
                    keys.partEnd = this.$data.beginNums[eindex]
                    keys.translator = {
                        id: this.$data.values[i]
                    }
                    keys.reviewer = {
                        id: this.$data.valuex[i]
                    }
                    if (eindex === (lens - 1)) {
                        datas.push(keys)
                        this.$store.dispatch('doSavePart', datas)
                        return false
                    } else {
                        datas.push(keys)
                    }
                }
            },
            applyTime(event) {
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