<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .bd {
        h3 {
            heigh:30px;
            line-height:30px;
        }
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
        .downUpFile {
            margin:46px 0 0 0;
            text-indent: 2em;
            text-align: left;
        }
        .row {
            .el-select {
                width:100%;
            }
            i {
                float:left;
                width:30px;
                margin:0 8px;
                line-height:30px;
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
                    <h1>新建禁用语</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{path:'/'}">首页</router-link></li>
                        <li class="breadcrumb-item active">新建禁用语</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div class="bd">
        <div class="row">
            <div class="card card-default col-12">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-tag"></i>
                        新建禁用语
                    </h3>
                </div>
                <el-form ref="form" :model="form" label-width="180px">
                    <div class="card-body">
                        <div class="form-group">
                            <el-form-item label="禁用语名称">
                                <el-input v-model="form.bannedName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="机构名称">
                                <el-select v-model="form.organ" filterable placeholder="请选择或输入">
                                    <el-option
                                        v-for="(item, $index) in customer_datas"
                                        :key="$index"
                                        :data-datas="item.json_datas"
                                        :label="item.organName"
                                        :value="item.json_datas">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item label="语言">
                                <el-select v-model="form.language" placeholder="请选择">
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
                            <el-form-item label="稿件上传">
                                <div class="showUploaderFiles">
                                    <input type="file" id="input-file" class="custom-file-input upload-file" @change="uploaderFiles" />
                                    <button type="button" class="btn btn-secondary flowFileUploader">点击上传</button>
                                </div>
                                <div class="downUpFile alert alert-light alert-dismissible fade show" role="alert" v-for="(item, $index) in file_datas" :data-id="item.id" :data-uuid="item.uuid" :data-data="item.data">
                                    <strong>上传文件：</strong> {{item.file_name}}
                                    <button type="button" :data-index="$index" class="close" data-dismiss="alert" aria-label="Close" @click="delUpLoaderFiles">
                                        <span aria-hidden="true" :data-index="$index">&times;</span>
                                    </button>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="form-group">
                            <button type="submit" @click="clearDatas" class="btn btn-default">清空</button>
                            <button type="submit" @click="onSubmit" class="btn btn-primary float-right">创建新禁用语</button>
                        </div>
                    </div>
                </el-form>
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
        name: "CreateBanned",
        data() {
            return {
                isUsedFaster:false,
                form : {
                    id:0,
                    bannedName: '',
                    language: '',
                    bannedFile: '',
                    organ: ''
                },
                fromdata:{},
                customer_datas:[],
                customer_indexpage:1,
                name:'',
                sname:'',
                level:'',
                type:'',
                value4: '',
                value5: '',
                value1: [],
                value2: [],
                value3: [],
                input: '10000000000字',
                author: [{
                    value: '选项1',
                    label: '术语'
                }, {
                    value: '选项2',
                    label: '语料'
                }],
                levels: [{
                    value: '1',
                    label: '权威级'
                }, {
                    value: '2',
                    label: '标准级'
                }, {
                    value: '3',
                    label: '参考级'
                }],
                main_industry_models_0 : [],
                sub_industry_models_1 : [],
                sub_industry_models_2 : [],
                sub_industry_models_3 : [],
                sub_industry_models_4 : [],
                industry1:[],
                industry2:[],
                industry3:[],
                languagedatas:[],
                language0: [{
                    value: '选项1',
                    label: '中文'
                }, {
                    value: '选项2',
                    label: '英文'
                }, {
                    value: '选项3',
                    label: '法文'
                }, {
                    value: '选项4',
                    label: '日文'
                }, {
                    value: '选项5',
                    label: '韩文'
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
                file_datas: [],
                listPageIndex:1,
                activeName: 'second'
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                main_industry_models_datas: 'main_industry_models_datas',
                sub_one_industry_models_datas: 'sub_one_industry_models_datas',
                sub_two_industry_models_datas: 'sub_two_industry_models_datas',
                get_language_datas: 'get_language_datas',
                customer_info_datas: 'customer_info_datas',
                uploaders_file_status: 'uploaders_file_status',
                get_organ_list_datas: 'get_organ_list_datas',
                save_banned_status: 'save_banned_status',
                sub_there_industry_models_datas: 'sub_there_industry_models_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            save_banned_status: function() {
                console.log("this.save_banned_status : ", this.save_banned_status)
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
            get_organ_list_datas: function() {
                console.log("this.getlist:", this.get_organ_list_datas)
                if (this.$data.listPageIndex === 1) {
                    this.$data.customer_datas = this.get_organ_list_datas.list
                } else {
                    for (let keys of this.get_organ_list_datas.list) {
                        this.$data.customer_datas.push(keys)
                    }
                }
                
                if (!!!this.get_organ_list_datas.isLastPage) {
                    this.$data.listPageIndex += 1
                    let data = {}
                    data.pageIndex = this.$data.listPageIndex
                    this.$store.dispatch('getDataOrganList', this.$data.listPageIndex)
                }
            },
            uploaders_file_status: function() {
                let datas = {}
                datas.file_name = this.uploaders_file_status.fileName
                datas.id = this.uploaders_file_status.id
                datas.uuid = this.uploaders_file_status.uuid
                datas.data = JSON.stringify(this.uploaders_file_status)
                this.$data.file_datas.push(datas)
                this.$data.form.bannedFile = datas.data
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
            let data = {}
            data.pageIndex = this.$data.listPageIndex
            this.$store.dispatch('getDataOrganList', this.$data.listPageIndex)
        },
        methods: {
            clearDatas(event) {
                let datas = {
                    id:0,
                    bannedName: '',
                    language: '',
                    bannedFile: '',
                    organ: ''
                }
                this.$data.file_datas = []
                this.$data.form = datas 
            },
            uploaderFiles(event) {
                let elements = event.target
                let file_datas = elements.files[0]
                let data = new FormData()
                let _self = this
                let path = ""
                data.append("file", file_datas)
                this.$store.dispatch('doUploaderFile', data)
            },
            getOneLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry1)
                this.$store.dispatch('getOneIndustryInfo', datas.code)
            },
            getTwoLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry2)
                this.$store.dispatch('getTwoIndustryInfo', datas.code)
            },
            getThereLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry3)
                this.$store.dispatch('getThereIndustryInfo', datas.code)
            },
            delUpLoaderFiles(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute('data-index'), 10)
                this.$data.file_datas.splice(index, 1)
                this.$data.form.termFile.splice(index, 1)
            },
            onSubmit(event) {
                console.log("corpusLevel : ", parseInt(this.$data.form.corpusLevel, 10))
                let datas = {}
                datas.id = this.$data.form.id
                datas.bannedName = this.$data.form.bannedName
                datas.organ = JSON.parse(this.$data.form.organ)
                datas.language = this.$data.form.language
                datas.bannedFile = JSON.parse(this.$data.form.bannedFile)
                console.log("datas : ", datas)
                this.$store.dispatch('doSaveBanned', datas)
            }
        }
    }
</script>