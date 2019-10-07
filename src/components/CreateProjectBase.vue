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
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>创建项目信息</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/">首页</a></li>
                        <li class="breadcrumb-item active">创建项目信息</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div class="col-md-12">
        <div class="card card-warning">
            <div class="card-header">
                <h3 class="card-title">创建项目信息</h3>
            </div>
            
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
                file_datas: [],
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
                    datas.organName = keys.organ.organName
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