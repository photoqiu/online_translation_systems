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
        .showUploaderFiles {
            position:relative;
            .upload-file {
                left:0;
                top:3px;
                width:140px;
                height:40px;
                position:absolute;
                z-index:10;
            }
            .flowFileUploader {
                left:0;
                top:3px;
                height:40px;
                width:140px;
                position:absolute;
                z-index:1;
            }
        }
        .container-fluid {
            h4 {
                text-align:left;
                text-indent:5em;
            }
        }
        .row {
            .show {
                display:block;
            }
            .hidden {
                display:none;
            }
            .el-steps {
                border-top:1px soild #ccc;
                width:50%;
                height:130px;
                line-height:26px;
                margin:20px auto 0;
            }
            .el-select {
                float:left;
                width:600px;
            }
            .upload-demo {
                float:left;
            }
            i {
                float:left;
                width:30px;
                margin:0 8px;
                line-height:30px;
            }
            .el-date-editor {
                float:left;
                width:600px;
            }
        }
    }
}
</style>

<template>
<div class="container_bd">
    <h1>创建项目-基本信息</h1>
    <div class="bd">
        <div class="row">
            <el-steps :active="1" align-center>
                <el-step title="创建新项目" description="新建一个项目并上传附件"></el-step>
                <el-step title="分配区块" description="对上传附件进行区块分配"></el-step>
                <el-step title="分配任务" description="分配完成后，相关人员开发翻译与审校"></el-step>
                <el-step title="完成" description="完成项目"></el-step>
            </el-steps>
        </div>
        <div class="row">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目经理">
                    <el-select v-model="form.projectManager_str" placeholder="请选择">
                        <el-option
                            v-for="(item, $index) in project_datas"
                            :key="$index"
                            :data-datas="item.json_datas"
                            :label="item.nickName"
                            :value="item.json_datas">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构名称">
                    <el-select v-model="form.customer_str" filterable placeholder="请选择或输入">
                        <el-option
                            v-for="(item, $index) in customer_datas"
                            :key="$index"
                            :data-datas="item.json_datas"
                            :label="item.customerName"
                            :value="item.json_datas">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起止时间：">
                    <el-date-picker
                        v-model="form.sTime"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="语言">
                    <el-select v-model="form.languageFrom" placeholder="请选择">
                        <el-option
                          v-for="(item, $index) in languagedatas"
                          :key="$index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="fas fa-arrows-alt-h" style="font-size:18px;"></i>
                    <el-select v-model="form.languageTo" placeholder="请选择">
                        <el-option
                          v-for="(item, $index) in languagedatas"
                          :key="$index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字数">
                        <el-input
                            placeholder="字数显示"
                            v-model="form.wordCount"
                            :disabled="false">
                        </el-input>
                </el-form-item>
                
                <div class="container-fluid">
                    <h4>
                        <span>添加附件以及相关配置：</span>
                        <a href="javascript:;" class="flex flex-column items-center justify-center color-inherit w-100 pa2 br2 br--top no-underline hover-bg-blue4 hover-white"><i class="fas fa-plus-circle" style="font-size: 28px;" @click="addEvent"></i></a>
                        <a href="javascript:;" class="flex flex-column items-center justify-center color-inherit w-100 pa2 br2 br--top no-underline hover-bg-blue4 hover-white"><i class="fas fa-minus-circle" @click="substructionEvent" style="font-size: 28px;"></i></a>
                    </h4>
                    <div class="row">
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="list-group" @click="SelectMenus">
                                <button type="button" v-for="(item, $index) in addFileOrder" :key="$index" :class="titleStyle[$index]" :data-index="$index">
                                    默认附件以及相关配置
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div v-for="(item, $index) in addFileOrder" :data-index="$index" :key="$index" :class="hiddenStyles[$index]">
                                <div class="card-body">
                                    <el-form-item label="一级行业">
                                        <el-select v-model="form.fileList[$index].industry1" filterable @change="getOneLevelDatas" placeholder="请选择">
                                            <el-option
                                              v-for="item in main_industry_models_0"
                                              :key="item.code"
                                              :data-id="item.id"
                                              :label="item.name"
                                              :value="item.json_data">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="二级行业">
                                        <el-select v-model="form.fileList[$index].industry2" filterable @change="getTwoLevelDatas" placeholder="请选择">
                                            <el-option
                                              v-for="item in sub_industry_models_1"
                                              :key="item.code"
                                              :data-id="item.id"
                                              :label="item.name"
                                              :value="item.json_data">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="三级行业">
                                        <el-select v-model="form.fileList[$index].industry3" filterable @change="getThereLevelDatas" placeholder="请选择">
                                            <el-option
                                              v-for="item in sub_industry_models_2"
                                              :key="item.code"
                                              :data-id="item.id"
                                              :label="item.name"
                                              :value="item.json_data">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="四级行业">
                                        <el-select v-model="form.fileList[$index].industry4" filterable placeholder="请选择">
                                            <el-option
                                              v-for="item in sub_industry_models_3"
                                              :key="item.code"
                                              :data-id="item.id"
                                              :label="item.name"
                                              :value="item.json_data">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="语料库（可多选）">
                                        <el-select v-model="value1" multiple placeholder="请选择">
                                            <el-option
                                                v-for="item in options0"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="术语库（可多选）">
                                        <el-select v-model="form.fileList[$index].termid" multiple placeholder="请选择">
                                            <el-option
                                                v-for="item in get_term_list_datas"
                                                :key="item.id"
                                                :label="item.termName"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="禁用语（可多选）">
                                        <el-select v-model="form.fileList[$index].prohibited" multiple placeholder="请选择">
                                            <el-option
                                                v-for="item in options2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="稿件上传">
                                        <div class="showUploaderFiles">
                                            <input type="file" id="input-file" class="custom-file-input upload-file" @change="uploaderFiles" />
                                            <button type="button" class="btn btn-secondary flowFileUploader">点击上传</button>
                                        </div>
                                        <div class="downUpFile alert alert-light alert-dismissible fade show" role="alert" :data-id="form.fileList[$index].file.id" :data-uuid="form.fileList[$index].file.uuid" :data-data="form.fileList[$index].file.data">
                                            <strong>上传文件：</strong> {{form.fileList[$index].file.file_name}}
                                            <button type="button" :data-index="$index" class="close" data-dismiss="alert" aria-label="Close" @click="delUpLoaderFiles">
                                                <span aria-hidden="true" :data-index="$index">&times;</span>
                                            </button>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import 'moment'

    export default {
        name: "CreateProjectBase",
        data() {
            return {
                isUsedFaster:false,
                languagedatas:[],
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
                form: {
                    languageFrom: '',
                    languageTo: '',
                    projectName: '',
                    projectManager: {},
                    projectManager_str: '',
                    customer_str: '',
                    customer: {},
                    sTime: '',
                    startTime:'',
                    endTime:'',
                    termid:'',
                    sourceFiles:[],
                    wordCount:0,
                    id: 0,
                    projectId: 0,
                    fileList: [
                        {
                            id: 0,
                            projectId: 0,
                            file: {},
                            industry1: '',
                            industry2: '',
                            industry3: '',
                            industry4: '',
                            prohibited: ''
                        }
                    ],
                    progress:0
                },
                currentIndex: 0,
                addFileOrder: 1,
                titleStyle: ['list-group-item list-group-item-action active'],
                hiddenStyles: ["show card", "hidden card"],
                customer_datas: [],
                project_datas: [],
                value4: '',
                value5: '',
                value3: '',
                value1: [],
                value2: [],
                author: [{
                    value: '选项1',
                    label: '张三'
                }, {
                    value: '选项2',
                    label: '李四'
                }, {
                    value: '选项3',
                    label: '王五'
                }, {
                    value: '选项4',
                    label: '六路'
                }, {
                    value: '选项5',
                    label: '....'
                }],
                options0: [{
                    value: '选项1',
                    label: '创建新的语料库'
                },{
                    value: '选项2',
                    label: '联合国儿童基金会'
                },{
                    value: '选项3',
                    label: '联合国人口基金会'
                },{
                    value: '选项4',
                    label: '中国汽车工程学会'
                }],
                options1: [{
                    value: '选项1',
                    label: '创建新的语料库'
                },{
                    value: '选项2',
                    label: '联合国儿童基金会'
                },{
                    value: '选项3',
                    label: '联合国人口基金会'
                },{
                    value: '选项4',
                    label: '中国汽车工程学会'
                }],
                options2: [{
                    value: '选项1',
                    label: '创建新的语料库'
                },{
                    value: '选项2',
                    label: '联合国儿童基金会'
                },{
                    value: '选项3',
                    label: '联合国人口基金会'
                },{
                    value: '选项4',
                    label: '中国汽车工程学会'
                }],
                customer_indexpage: 1,
                project_indexpage: 1,
                term_indexpage: 1,
                get_term_list_datas:[],
                main_industry_models_0 : [],
                sub_industry_models_1 : [],
                sub_industry_models_2 : [],
                sub_industry_models_3 : [],
                sub_industry_models_4 : [],
                file_datas: [],
                activeName: 'second'
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                get_language_datas: 'get_language_datas',
                term_list_datas: 'term_list_datas',
                users_list_datas: 'users_list_datas',
                main_industry_models_datas: 'main_industry_models_datas',
                sub_one_industry_models_datas: 'sub_one_industry_models_datas',
                sub_two_industry_models_datas: 'sub_two_industry_models_datas',
                sub_there_industry_models_datas: 'sub_there_industry_models_datas',
                uploaders_file_status: 'uploaders_file_status',
                corpus_list_datas: 'corpus_list_datas',
                save_project_status: 'save_project_status',
                customer_info_datas: 'customer_info_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            save_project_status: function() {
                window.location.href = "/#/"
            },
            corpus_list_datas: function() {
                console.log("thie.corpus_list_datas : ", this.corpus_list_datas)
            },
            uploaders_file_status: function() {
                let datas = {}
                datas.file_name = this.uploaders_file_status.fileName
                datas.id = this.uploaders_file_status.id
                datas.uuid = this.uploaders_file_status.uuid
                datas.data = JSON.stringify(this.uploaders_file_status)
                this.$data.form.fileList[this.$data.currentIndex].file = datas
            },
            main_industry_models_datas: function() {
                this.$data.main_industry_models_0 = this.main_industry_models_datas
            },
            sub_one_industry_models_datas: function() {
                this.$data.sub_industry_models_1 = this.sub_one_industry_models_datas
            },
            sub_two_industry_models_datas: function() {
                this.$data.sub_industry_models_2 = this.sub_two_industry_models_datas
            },
            sub_there_industry_models_datas: function() {
                console.log("this.sub_there_industry_models_datas : ", this.sub_there_industry_models_datas)
                this.$data.sub_industry_models_3 = this.sub_there_industry_models_datas
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId <= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.project_datas.push(keys)
                    }
                }
                if (!!this.users_list_datas.isLastPage) {
                    return false
                }
                this.$data.project_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.project_indexpage)
            },
            term_list_datas: function() {
                for (let keys of this.term_list_datas.list) {
                    this.$data.get_term_list_datas.push(keys)
                }
                if (!!this.term_list_datas.isLastPage) {
                    return false
                }
                this.$data.term_indexpage += 1
                this.$store.dispatch('getTermList', this.$data.term_indexpage)
            },
            customer_info_datas: function() {
                for (let keys of this.customer_info_datas.list) {
                    this.$data.customer_datas.push(keys)
                }
                if (!!this.customer_info_datas.isLastPage) {
                    return false
                }
                this.$data.customer_indexpage += 1
                this.$store.dispatch('getCustomerInfo', this.$data.customer_indexpage)
            },
            get_language_datas: function() {
                let datas = {}
                for (let keys of this.get_language_datas) {
                    datas = {}
                    datas.value = keys.languageKey
                    datas.label = keys.languageName
                    this.$data.languagedatas.push(datas)
                }
            }
        },
        mounted() {
            let datas = ''
            this.$store.dispatch('getIndustryInfo', datas)
            this.$store.dispatch('getLanguage', datas)
            datas = '1'
            this.$store.dispatch('getUsersInfo', datas)
            this.$store.dispatch('getTermList', datas)
            this.$store.dispatch('getCustomerInfo', datas)
            this.$store.dispatch('getCorpusList', datas)
        },
        methods: {
            SelectMenus(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute("data-index"), 10)
                this.$data.hiddenStyles.length = 0
                this.$data.currentIndex = index
                console.log(elements, index, this.$data.titleStyle, this.$data.titleStyle.length)
                for (let i = 0, len = this.$data.titleStyle.length; i < len; i ++) {
                    if (i === index) {
                        this.$data.hiddenStyles.push("show card")
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action active'
                    } else {
                        this.$data.hiddenStyles.push("hidden card")
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action'
                    }
                }
            },
            addEvent(event) {
                let datas = {
                    "id": 0,
                    "projectId": 0,
                    "file": {},
                    "industry1": '',
                    "industry2": '',
                    "industry3": '',
                    "prohibited": '',
                    "industry4": ''
                }
                let elements = event.target
                this.$data.addFileOrder += 1
                for (var i = 0; i < this.$data.addFileOrder; i++) {
                    if (i === this.$data.currentIndex) {
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action active'
                    } else {
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action'
                    }
                }
                this.$data.form.fileList.push(datas)
            },
            substructionEvent(event) {
                let elements = event.target
                let lastIndex = this.$data.form.fileList.length - 1
                this.$data.addFileOrder -= 1
                if (this.$data.addFileOrder <= 1) {
                    this.$data.addFileOrder = 1
                    return false
                }
                this.$data.form.fileList.splice(lastIndex, 1)
                this.$data.titleStyle.splice(lastIndex, 1)
                this.$data.hiddenStyles.length = 0
                for (let i = 0, len = this.$data.titleStyle.length; i < len; i ++) {
                    if (i === index) {
                        this.$data.hiddenStyles.push("show card")
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action active'
                    } else {
                        this.$data.hiddenStyles.push("hidden card")
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action'
                    }
                }
            },
            onSubmit(event) {
                let startTime = moment(this.$data.form.sTime[0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let endTime = moment(this.$data.form.sTime[1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let datas = {}
                datas.fileList = []
                this.$data.form.startTime = startTime
                this.$data.form.endTime = endTime
                this.$data.form.projectManager = JSON.parse(this.$data.form.projectManager_str)
                this.$data.form.customer = JSON.parse(this.$data.form.customer_str)
                for(var i = 0, lens = this.$data.form.fileList.length; i < lens; i++) {
                    datas.fileList[i] = {}
                    datas.fileList[i].industry1 = JSON.parse(this.$data.form.fileList[i].industry1)
                    datas.fileList[i].industry2 = JSON.parse(this.$data.form.fileList[i].industry2)
                    datas.fileList[i].industry3 = JSON.parse(this.$data.form.fileList[i].industry3)
                    datas.fileList[i].industry4 = JSON.parse(this.$data.form.fileList[i].industry4)
                    datas.fileList[i].file = this.$data.form.fileList[i].file
                    datas.fileList[i].id = 0
                    datas.fileList[i].projectId = 0
                }
                let data_str = JSON.stringify(datas.fileList)
                this.$data.form.sourceFiles = JSON.parse(data_str)
                this.$store.dispatch('doSaveProject', this.$data.form)
            },
            getOneLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.fileList[this.$data.currentIndex].industry1)
                this.$store.dispatch('getOneIndustryInfo', datas.code)
            },
            getTwoLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.fileList[this.$data.currentIndex].industry2)
                this.$store.dispatch('getTwoIndustryInfo', datas.code)
            },
            getThereLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.fileList[this.$data.currentIndex].industry3)
                this.$store.dispatch('getThereIndustryInfo', datas.code)
            },
            delUpLoaderFiles(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute('data-index'), 10)
                this.$data.form.fileList[this.$data.currentIndex].file = {}
            },
            uploaderFiles(event) {
                let elements = event.target
                let file_datas = elements.files[0]
                let data = new FormData()
                let _self = this
                let path = ""
                data.append("file", file_datas)
                this.$store.dispatch('doUploaderFile', data)
            }
        }
    }
</script>