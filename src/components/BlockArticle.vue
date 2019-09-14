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

            .container-fluid {
                background-color:#efefef;
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
            .excel-table {
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
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-10 col-10 col-sm-12 rowset">
                            <el-form-item label="新加初译员：">
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUsers" circle></el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="col-lg-12 col-12 col-sm-12 table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">选择段落</th>
                                    <th scope="col">初译员</th>
                                    <th scope="col">起止时间</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, $index) in order" :key="$index">
                                    <th scope="row">{{$index + 1}}</th>
                                    <td>
                                        <el-input-number size="medium" v-model="num[$index]" :step="1"></el-input-number>
                                    </td>
                                    <td>
                                        <el-select v-model="values[$index]" filterable placeholder="请选择初译员">
                                            <el-option
                                                v-for="(items, $indexes) in options"
                                                :key="$indexes"
                                                :label="items.name"
                                                :value="items.id">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td>
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
                                    </td>
                                    <td>
                                        <button type="button" :data-index="$index" class="btn btn-link" @click="applydatas">应用</button>
                                        <button type="button" :data-index="$index" class="btn btn-link" @click="delUserControllers">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row">
                        <el-form-item>
                            <el-button type="primary" @click="applyAverageDatas">均分确认</el-button>
                            <el-button type="primary" @click="onSubmit">创建区块</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <grid :grid-data="gridsdata" :columns="columns" showCheckbox columnSet @focus="focus" @updateValue="update"></grid>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    

    export default {
        name: "BlockArticle",
        data() {
            return {
                isUsedFaster:false,
                sTime: [[]],
                num: [1],
                beginNums:[0],
                form: {},
                addTypes: [{
                    name:"添加初译员",
                    id:1
                }, {
                    name:"添加审校",
                    id:2
                }],
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
                columnSet: true,
                showCheckbox: false,
                gridsdata: [],
                columns: [
                    { title: '段落Id', key: 'partId', width: 80 },
                    { title: '原文', key: 'source', width: 980 },
                    { title: '状态', key: 'status', width: 50 },
                    { title: '开始时间', key: 'begintime', width: 140 },
                    { title: '结束时间', key: 'endtime', width: 140 },
                    { title: '初译译员', key: 'unitmaker', width: 160 },
                    { title: '审校译员', key: 'requiredQuantity', width: 160 },
                    {
                        title: '确认保存',
                        width: 70,
                        fixed: true,
                        renderButton(rowData, index) {
                            return [{
                                title: '保存',
                                click() {
                                    console.log(rowData, index)  //eslint-disable-line
                                },
                            }]
                        },
                    },
                ],
                translators:[],
                contents:[],
                options: [],
                sxoptions: [],
                order: 1,
                color2: '',
                values : [],
                valuex : [],
                partId : [0],
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
                do_part_equalization_status: 'do_part_equalization_status',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            do_part_equalization_status: function() {
                let results = this.do_part_equalization_status.data.result
                let index = 0
                let deIndex = 0
                for (let keys of results) {
                    this.$set(this.$data.beginNums, deIndex, keys.partBegin)
                    deIndex += 1
                    this.$set(this.$data.beginNums, deIndex, keys.partEnd)
                    deIndex += 1
                    this.$set(this.$data.num, index, keys.partEnd - keys.partBegin)
                    index += 1
                }
                console.log("this.$data.num:", this.$data.num, this.$data.beginNums)
                this.$message('分配完成.')
            },
            save_part_status: function() {
                window.location.href = `/#/projectdetail/${this.$route.params.id}`
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
                console.log("this.part_sentence_list_datas : ", this.part_sentence_list_datas)
                if (this.part_sentence_list_datas.length > 0) {
                    this.$data.beginNums[0] = 0
                    let dataindex = 1
                    let index = 0
                    let modelsIndex = 0
                    let orderIndex = 0
                    this.$data.order = this.part_sentence_list_datas.length
                    for (let keys of this.part_sentence_list_datas) {
                        console.log("keys:", keys)
                        orderIndex = keys.partEnd - keys.partBegin
                        this.$data.beginNums[dataindex] = keys.partEnd - keys.partBegin
                        this.$data.sTime[index] = [new Date(keys.startTime), new Date(keys.endTime)]
                        this.$data.num[index] = keys.partEnd - keys.partBegin
                        this.$data.valuex[index] = keys.reviewer === null ? '暂无' : keys.reviewer.id
                        this.$data.values[index] = keys.translator.id
                        this.$data.partId.push(keys.id)
                        dataindex += 1
                        index += 1
                    }
                    dataindex = 1
                    index = 0
                    orderIndex = this.$data.beginNums[dataindex]
                    for (let key of this.$data.gridsdata) {
                        if (orderIndex > modelsIndex) {
                            key['begintime'] = this.part_sentence_list_datas[index].startTime
                            key['endtime'] = this.part_sentence_list_datas[index].endTime
                            key['unitmaker'] = this.$data.values[index]
                            key['requiredQuantity'] = this.$data.valuex[index]
                        } else {
                            dataindex += 1
                            index += 1
                            orderIndex += this.$data.beginNums[dataindex]
                            key['begintime'] = this.part_sentence_list_datas[index].startTime
                            key['endtime'] = this.part_sentence_list_datas[index].endTime
                            key['unitmaker'] = this.$data.values[index]
                            key['requiredQuantity'] = this.$data.valuex[index]
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
                this.$data.gridsdata = []
                this.$data.gridDatas = this.assign_part_list_datas.result
                let ProjectFileId = 1
                let ProjectId = 1
                for (let keys of this.assign_part_list_datas.result) {
                    let models = {'partId': `${keys.paragraphId}`, 'source': `${keys.source}`, 'status': '', 'begintime': '', 'endtime': '', 'unitmaker': '', 'requiredQuantity': ''}
                    this.$data.contents.push(keys.source)
                    ProjectFileId = keys.projectFileId
                    ProjectId = keys.projectId
                    this.$data.gridsdata.push(models)
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
            // this.$store.dispatch('getPartSentenceList', partInfoArguments)
            this.$store.dispatch('getTranslatorInfo', pages)
            this.$store.dispatch('getPorjectDetails', datas)
        },
        methods: {
            update(value) {
                console.log(value) //eslint-disable-line
            },
            focus(value) {
                console.log(value) //eslint-disable-line
            },
            addUsers(event) {
                let arr = []
                this.$data.order += 1
                this.$data.isConUsed.push(true)
                this.$data.options.push(this.$data.translators)
                this.$data.sxoptions.push(this.$data.translators)
                this.$data.sTime.push(arr)
                this.$data.num.push(1)
                this.$data.partId.push(0)
                this.$data.beginNums.push(0)
            },
            applyAverageDatas() {
                let lens = this.$data.num.length
                let datas = {}
                datas.projectFileId = this.$data.fileId
                datas.partNum = lens
                this.$store.dispatch("doPartEqualization", datas)
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
                        this.$data.gridsdata[orderIndex] = {'partId': `${keys.paragraphId}`, 'source': `${keys.source}`, 'status': '待翻译', 'begintime': `${startTime}`, 'endtime': `${endTime}`, 'unitmaker': `${this.$data.values[index]}`, 'requiredQuantity': `${this.$data.valuex[index]}`}
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
                this.$data.partId.splice(index, 1)
                this.$data.order -= 1
            },
            onSubmit(event) {
                let datas = []
                let index = 0
                let wordLens = 0
                let beginIndex = 0
                let tmpArray = []
                let keys = {}
                let eindex = 0
                for (var i = 0, lens = this.$data.num.length; i < lens; i++) {
                    tmpArray = []
                    keys = {}
                    keys.translateWordCount = 0
                    keys.reviewWordCount = 0
                    console.log("timer:", this.$data.sTime[i]);
                    keys.startTime = moment(this.$data.sTime[i][0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                    keys.endTime = moment(this.$data.sTime[i][1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                    keys.partId = this.$data.partId[i] || 0
                    keys.id = 0
                    keys.projectId = parseInt(this.$data.projectId, 10)
                    keys.projectFileId = this.$data.fileId
                    keys.partBegin = this.$data.beginNums[eindex]
                    //1 是初译  2 是审校 
                    keys.partType = 1
                    eindex += 1
                    keys.partEnd = this.$data.beginNums[eindex]
                    eindex += 1
                    keys.translator = {
                        id: this.$data.values[i]
                    }
                    keys.reviewer = {
                        id: this.$data.valuex[i] === "暂无" ? -1 : this.$data.valuex[i]
                    }
                    if (i === (lens - 1)) {
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
                        console.log("key : ", key, key === 'begintime', key === 'endtime')
                        keys.begintime = startTime
                        keys.endtime = endTime
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