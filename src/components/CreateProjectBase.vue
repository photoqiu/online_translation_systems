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
        .form-group-divection {
            .el-select {
                float:left;
                width:46%;
            }
            
            i {
                float:left;
                width:30px;
                margin:0 8px;
                line-height:30px;
                text-align:center;
            }

            .el-select:last-child {
                float:left;
                width:46%;
            }
        }
        .form-group-divection:after {
            content: '';
            display: block;
            clear: both;
        }
        .form-group {
            margin:.2rem 0 0 0;
            .show {
                display:block;
            }
            .hidden {
                display:none;
            }
            .el-input-number {
                width:98%;
            }
            .el-select {
                float:left;
                width:98%;
            }
            .upload-demo {
                float:left;
            }
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="bd row">
        <div class="col-md-7">
            <!-- general form elements -->
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">创建项目信息</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <el-form ref="form" label-width="180px">
                    <div class="card-body">
                        <div class="form-group">
                            <el-form-item label="项目名称：">
                                <el-input v-model="form.projectName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="项目经理：">
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
                        </div>
                        <div class="form-group">
                            <el-form-item label="机构名称：">
                                <el-select v-model="form.customer_str" @change="institutionHandle" filterable placeholder="请选择或输入">
                                    <el-option
                                        v-for="(item, $index) in customer_datas"
                                        :key="$index"
                                        :data-datas="item.json_datas"
                                        :label="item.labelName"
                                        :value="item.json_datas">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
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
                        </div>
                        <div class="form-group-divection">
                            <el-form-item label="语言：">
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
                        </div>
                        <div class="form-group">
                            <el-form-item label="字数：">
                                <el-input
                                    placeholder="请输入内容" v-model="form.wordCount" :disabled="true">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="添加附件：">
                                <el-input-number v-model="form.addFileNumbers" @change="addFileHandleChange" :min="1" :max="100" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <button type="submit" @click="onSubmit" class="btn btn-primary float-right">创建新项目</button>
                    </div>
                </el-form>
            </div>
            <!-- /.card -->
        </div>
        <div class="col-md-5" v-for="(item, index) in addNewsNumbers">
            <!-- DIRECT CHAT PRIMARY -->
            <div :class="form.fileList[index].classStyle" :key="index">
                <div class="card-header"  @click="applydatas" :data-index="index">
                    <h3 class="card-title">
                        <span data-toggle="tooltip" :data-index="index" class="badge bg-primary">{{item}}</span>
                        上传附件
                    </h3>
                    <div class="card-tools" :data-index="index">
                        <button type="button" class="btn btn-tool" :data-index="index" data-card-widget="collapse"><i class="fas fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" :data-index="index" data-card-widget="remove"><i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <el-form ref="form" label-width="180px">
                    <div class="card-body" style="display: block;">
                        <div class="form-group" style="margin:2rem 0 0 0;">
                            <el-form-item label="一级行业">
                                <el-select v-model="form.fileList[index].industry1" filterable  @change="getOneLevelDatas" placeholder="请选择">
                                    <el-option
                                      v-for="item in main_industry_models_0"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.json_data">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="二级行业">
                                <el-select v-model="form.fileList[index].industry2"  filterable @change="getTwoLevelDatas" placeholder="请选择">
                                    <el-option
                                      v-for="item in sub_industry_models_1"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.json_data">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="三级行业">
                                <el-select v-model="form.fileList[index].industry3"  filterable @change="getThereLevelDatas" placeholder="请选择">
                                    <el-option
                                      v-for="item in sub_industry_models_2"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.json_data">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="四级行业">
                                <el-select v-model="form.fileList[index].industry4"  filterable placeholder="请选择">
                                    <el-option
                                      v-for="item in sub_industry_models_3"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.json_data">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="语料库（可多选）">
                                <el-select multiple v-model="form.fileList[index].corpusid" placeholder="请选择">
                                    <el-option
                                        v-for="(item, corpusIndex) in options0"
                                        :key="corpusIndex"
                                        :label="item.corpusName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="术语库（可多选）">
                                <el-select multiple v-model="form.fileList[index].termid" placeholder="请选择">
                                    <el-option
                                        v-for="(item, termIndex) in options1"
                                        :key="termIndex"
                                        :label="item.termName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="禁用语（可多选）">
                                <el-select multiple v-model="form.fileList[index].prohibited" placeholder="请选择">
                                    <el-option
                                        v-for="(item, prohibitedIndex) in options2"
                                        :key="prohibitedIndex"
                                        :label="item.bannedName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="上传文件">
                                <el-upload
                                    class="upload-demo"
                                    :action="fileUploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="file_datas[index]">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                  <div slot="tip" class="el-upload__tip">只能上传doc/docx文件</div>
                                </el-upload>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
            <!--/.direct-chat -->
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import 'moment'
    import Constant from '../static/js/common/API'

    export default {
        name: "CreateProjectBase",
        data() {
            return {
                isUsedFaster:false,
                languagedatas:[],
                addNewsNumbers: 1,
                fileUploadUrl:`${Constant.API.fileUpload}`,
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
                    addFileNumbers:1,
                    fileList: [{
                        id: 0,
                        projectId: 0,
                        termid: [],
                        corpusid: [],
                        prohibited: [],
                        classStyle: 'card card-prirary cardutline direct-chat direct-chat-primary',
                        file: {},
                        industry1: '',
                        industry2: '',
                        industry3: '',
                        industry4: '',
                        prohibited: ''
                    }],
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
                options0: [],
                options1: [],
                options2: [],
                customer_indexpage: 1,
                project_indexpage: 1,
                term_indexpage: 1,
                get_term_list_datas:[],
                main_industry_models_0 : [],
                sub_industry_models_1 : [],
                sub_industry_models_2 : [],
                sub_industry_models_3 : [],
                sub_industry_models_4 : [],
                file_datas: [[]],
                queryTermbase:'',
                queryCorpus:'',
                pageCorpusIndex: 1,
                pageTermIndex: 1,
                pageBannedIndex: 1,
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
                banned_list_datas: 'banned_list_datas',
                save_project_status: 'save_project_status',
                term_list_datas: 'term_list_datas',
                customer_info_datas: 'customer_info_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            term_list_datas: function() {
                let datas = {}
                if(this.$data.pageTermIndex === 1) {
                    this.$data.options1 = []
                }
                console.log("this.term_list_datas:", this.term_list_datas)
                for (let keys of this.term_list_datas.list) {
                    datas = {}
                    datas.id = keys.id
                    datas.termName = keys.termName
                    this.$data.options1.push(datas)
                }
                if (this.$data.pageTermIndex >= this.term_list_datas.pages) {
                    return false
                }
                this.$data.pageTermIndex += 1
                this.$store.dispatch('getTermList', this.$data.pageTermIndex)
            },
            save_project_status: function() {
                window.location.href = "/#/"
            },
            banned_list_datas: function() {
                this.$data.totalPage = this.banned_list_datas.bannedList.pages
                let datas = {}
                if (this.$data.pageBannedIndex === 1) {
                    this.$data.options2 = []
                }
                for (let keys of this.banned_list_datas.bannedList.list) {
                    datas = {}
                    datas.id = keys.id
                    datas.bannedName = keys.bannedName
                    this.$data.options2.push(datas)
                }
                if (this.$data.pageBannedIndex >= this.banned_list_datas.bannedList.pages) {
                    return false
                }
                this.$data.pageBannedIndex += 1
                this.$store.dispatch('getBannedList', this.$data.pageBannedIndex)
            },
            corpus_list_datas: function() {
                let datas = {}
                if(this.$data.pageCorpusIndex === 1) {
                    this.$data.options0 = []
                }
                console.log("this.corpus_list_datas:", this.corpus_list_datas)
                for (let keys of this.corpus_list_datas.corpusList.list) {
                    datas = {}
                    datas.id = keys.id
                    datas.corpusName = keys.corpusName
                    this.$data.options0.push(datas)
                }
                if (this.$data.pageCorpusIndex >= this.corpus_list_datas.corpusList.pages) {
                    return false
                }
                this.$data.pageCorpusIndex += 1
                this.$store.dispatch('getCorpusList', this.$data.pageCorpusIndex)
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
                console.log(this.main_industry_models_datas)
                this.$data.main_industry_models_0 = this.main_industry_models_datas
            },
            sub_one_industry_models_datas: function() {
                this.$data.sub_industry_models_1 = this.sub_one_industry_models_datas
            },
            sub_two_industry_models_datas: function() {
                this.$data.sub_industry_models_2 = this.sub_two_industry_models_datas
            },
            sub_there_industry_models_datas: function() {
                this.$data.sub_industry_models_3 = this.sub_there_industry_models_datas
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId <= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.project_datas.push(keys)
                    }
                }
                if (this.$data.project_indexpage >= this.users_list_datas.pages) {
                    return false
                }
                this.$data.project_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.project_indexpage)
            },
            customer_info_datas: function() {
                for (let keys of this.customer_info_datas.list) {
                    keys.labelName = `${keys.customerName}--${keys.organName}`
                    this.$data.customer_datas.push(keys)
                }
                if (this.$data.customer_indexpage >= this.customer_info_datas.pages) {
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
            this.$store.dispatch('getCustomerInfo', datas)
            this.$store.dispatch('getCorpusList', this.$data.pageCorpusIndex)
            this.$store.dispatch('getTermList', this.$data.pageTermIndex)
            this.$store.dispatch('getBannedList', this.$data.pageBannedIndex)
        },
        methods: {
            applydatas(event) {
                let elements = event.target
                let indexdatas = elements.getAttribute("data-index") || -1
                if (indexdatas === -1) {
                    return false
                }
                console.log("indexdatas : ", elements, indexdatas)
                this.$data.currentIndex = indexdatas
                for (let item of this.$data.form.fileList) {
                    console.log("item:", item)
                    item.classStyle = 'card card-prirary cardutline direct-chat direct-chat-primary'
                }
                this.$data.form.fileList[indexdatas].classStyle = 'card card-info cardutline direct-chat direct-chat-primary '
            },
            addFileHandleChange(value) {
                let datas = {
                    id: 0, projectId: 0, classStyle:'card card-prirary cardutline direct-chat direct-chat-primary', 
                    termid: [], corpusid: [], prohibited: [], file: {}, industry1: '', industry2: '', industry3: '', industry4: ''
                }
                let lens = this.$data.form.fileList.length
                let orderIndex = lens - 1
                console.log("orderIndex : ", orderIndex, lens, value)
                
                if (value >= lens) {
                    this.$data.form.fileList.push(datas)
                    this.$data.file_datas.push([])
                    this.$data.file_datas[lens] = []
                } else {
                    this.$data.form.fileList.splice(orderIndex, 1)
                    this.$data.file_datas.splice(orderIndex, 1)
                }
                this.$message({
                    message: '添加新的附件...成功',
                    type: 'success'
                });
                this.$data.addNewsNumbers = value
            },
            handleRemove(file, fileList) {
                let fileDatas = this.$data.form.fileList[this.$data.currentIndex].file
                let datas = {}
                let datasID = -1
                datas.projectFileId = fileDatas.id
                datas.projectId = 0
                this.$store.dispatch('delProjectFiles', datas)
                this.$data.file_datas[this.$data.currentIndex] = []
                return false
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response, file, fileList) {
                this.$data.form.fileList[this.$data.currentIndex].file = response.data.result
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                let datas = {}
                let fileDatas = this.$data.form.fileList[this.$data.currentIndex].file
                let datasID = -1
                datas.projectFileId = fileDatas.id
                datas.projectId = 0
                this.$store.dispatch('delProjectFiles', datas)
                this.$data.file_datas[this.$data.currentIndex] = []
                return false
            },
            institutionHandle() {
                let datas = {}
                let index = this.$data.currentIndex
                let organDatas = {}
                this.$data.pageCorpusIndex = 1
                if (!!this.$data.form.customer_str) {
                    organDatas = JSON.parse(this.$data.form.customer_str)
                    datas.arguments = `organId=${organDatas.organId}`
                }
                if (!!this.$data.form.fileList[index].industry1) {
                    organDatas = JSON.parse(this.$data.form.fileList[index].industry1)
                    datas.arguments += `&industry1=${organDatas.code}`
                }
                if (!!this.$data.form.fileList[index].industry2) {
                    organDatas = JSON.parse(this.$data.form.fileList[index].industry2)
                    datas.arguments += `&industry2=${organDatas.code}`
                }
                if (!!this.$data.form.fileList[index].industry3) {
                    organDatas = JSON.parse(this.$data.form.fileList[index].industry3)
                    datas.arguments += `&industry3=${organDatas.code}`
                }
                if (!!this.$data.form.fileList[index].industry4) {
                    organDatas = JSON.parse(this.$data.form.fileList[index].industry4)
                    datas.arguments += `&industry4=${organDatas.code}`
                }
                datas.pageIndex = this.$data.pageCorpusIndex
                this.$store.dispatch('getQueryCorpusList', datas)
                this.$store.dispatch('getQueryTermList', datas)
            },
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
                    if (i === 0) {
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action active'
                    } else {
                        this.$data.titleStyle[i] = 'list-group-item list-group-item-action'
                    }
                }
                this.$data.currentIndex = 0
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
                    if (i === 0) {
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
                datas.corpusList = []
                datas.termList = []
                datas.bannedList = []
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
                    datas.corpusList[i].id = datas.fileList[i].termid
                    datas.termList[i].id = datas.fileList[i].corpusid
                    datas.bannedList[i].id = datas.fileList[i].prohibited
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
            }
        }
    }
</script>