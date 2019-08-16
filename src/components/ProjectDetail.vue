<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .hd {
        width:100%;
        text-align:left;
        h1 {
            font-weight:bold;
            border-bottom:1px soild #ccc;
        }
        .el-form-item {
            width:50%;
        }
    }
    .bd {
        margin:0;
        padding:0;
        .row {
            .table td, .table th {
                padding:0;
                height:42px;
                line-height:42px;
            }
            .table td div {
                margin:12px auto 0;
            }
            .el-pagination {
                margin:20px 0 0 0;
            }
        }
    }
}
</style>

<template>
<div class="container_bd">
    <div class="hd">
        <h1>项目：{{detail_datas.projectName}}</h1>
        <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="状态：">
                <b>进行中...</b>
            </el-form-item>
            <el-form-item label="项目进度：">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0" color="rgba(142, 113, 199, 0.7)"></el-progress>
            </el-form-item>
            <el-form-item label="起止时间：">
                {{pickerOptions}}
            </el-form-item>
            <el-form-item label="新添加文件">
                <el-button type="success" icon="fas fa-plus" v-show="uploaderStatus" circle @click="addBlockFiles"></el-button>
            </el-form-item>
            <div class="row" v-for="(item, $index) of addOrders" :key="$index" :data-index="$index">
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

                <el-form-item label="上传文件：">
                    <el-upload
                        class="upload-demo"
                        action="atreus/file/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="200"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc,docx文件，且不超过20M</div>
                    </el-upload>
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="bd">
        <div class="row">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">序号</th>
                        <th scope="col">文件名称</th>
                        <th scope="col">进度</th>
                        <th scope="col">译者</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, $index) in detail_datas.sourceFiles" :key="$index">
                        <th scope="row">{{$index + 1}}</th>
                        <td>{{item.file.fileName}}</td>
                        <td><el-progress :text-inside="true" :stroke-width="18" :percentage="detail_datas.process"></el-progress></td>
                        <td>{{detail_datas.projectManager.nickName}}</td>
                        <td>
                            <router-link :to="{path:`/blockarticle/${projectId}/${item.id}`}" class="btn btn-link">分配区块</router-link>
                            <router-link :to="{path:`/partlist/${projectId}/${item.id}`}" class="btn btn-link">区块列表</router-link>
                            <el-dropdown split-button type="primary" @command="handleCommand">
                                更多操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="menus_datas[$index][0]" :data-data="$index">导出原文</el-dropdown-item>
                                    <el-dropdown-item :command="menus_datas[$index][1]" :data-data="$index">导出译文</el-dropdown-item>
                                    <el-dropdown-item :command="menus_datas[$index][2]" :data-data="$index">导出审校</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <a href="javascript:;" :data-index="$index" class="btn btn-link" @click="handleRemoveFiles">删除区块</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    
    export default {
        name: "ProjectDetail",
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                del_status: 'del_status',
                export_source_datas: 'export_source_datas',
                export_target_datas: 'export_target_datas',
                export_review_datas: 'export_review_datas',
                save_project_status: 'save_project_status',
                main_industry_models_datas: 'main_industry_models_datas',
                sub_one_industry_models_datas: 'sub_one_industry_models_datas',
                sub_two_industry_models_datas: 'sub_two_industry_models_datas',
                sub_there_industry_models_datas: 'sub_there_industry_models_datas',
                part_sentence_list_datas: 'part_sentence_list_datas',
                project_detail_datas: 'project_detail_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            part_sentence_list_datas: function() {
                if (this.part_sentence_list_datas.length <= 0) {
                    this.$data.partList.push(false)
                } else {
                    this.$data.partList.push(true)
                }
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
            save_project_status: function() {
                this.$store.dispatch('getPorjectDetails', this.$data.projectId)
            },
            export_review_datas: function() {
                console.log("export_review_datas:", this.export_review_datas)
            },
            export_target_datas: function() {
                console.log("export_target_datas:", this.export_target_datas)
            },
            export_source_datas: function() {
                console.log("export_source_datas:", this.export_source_datas)
            },
            del_status: function() {
                this.$store.dispatch('getPorjectDetails', this.$data.projectId)
            },
            project_detail_datas: function() {
                this.$data.fileList = []
                let fileskeys = {}
                let menus_data = {}
                let menus_data_arr = []
                let str_data = ''
                let partInfoArguments = ''
                this.$data.detail_datas = this.project_detail_datas
                this.$data.detail_datas.process = this.project_detail_datas.translateProgress === null ? 0 : parseInt(this.project_detail_datas.translateProgress, 10)
                this.$data.pickerOptions = `${this.$data.detail_datas.startTime}~${this.$data.detail_datas.endTime}`
                for (let keys of this.$data.detail_datas.sourceFiles) {
                    fileskeys = {}
                    fileskeys.name = keys.file.fileName
                    fileskeys.url = keys.file.filePath
                    fileskeys.id = keys.file.id
                    menus_data_arr = []
                    menus_data = {}
                    menus_data.projectFileId = keys.id
                    menus_data.index = 0
                    str_data = JSON.stringify(menus_data)
                    menus_data_arr.push(str_data)
                    menus_data.projectFileId = keys.id
                    menus_data.index = 1
                    str_data = JSON.stringify(menus_data)
                    menus_data_arr.push(str_data)
                    menus_data.projectFileId = keys.id
                    menus_data.index = 2
                    str_data = JSON.stringify(menus_data)
                    menus_data_arr.push(str_data)
                    this.$data.menus_datas.push(menus_data_arr)
                    this.$data.fileList.push(fileskeys)
                    partInfoArguments = `?projectFileId=${keys.id}`
                    
                    this.$store.dispatch('getPartSentenceList', partInfoArguments)
                }
                console.log("project_detail_datas: ", this.$data.detail_datas.sourceFiles, this.$data.fileList)
            }
        },
        data() {
            return {
                isUsedFaster:false,
                fileList: [],
                detail_datas: {
                    projectName: '',
                    process: 0,
                    sourceFiles: []
                },
                addOrders: 0,
                currentIndex: 0,
                main_industry_models_0 : [],
                sub_industry_models_1 : [],
                sub_industry_models_2 : [],
                sub_industry_models_3 : [],
                sub_industry_models_4 : [],
                partList: [],
                menus_datas: [],
                form: {
                    fileList:[
                        {
                            industry1: '',
                            industry2: '',
                            industry3: '',
                            industry4: ''
                        }
                    ]
                },
                uploaderStatus: true,
                value2: '',
                projectId: -1,
                pickerOptions: '',
                activeName: 'second'
            }    
        },
        mounted() {
            let datas = this.$route.params.id || 1
            this.$data.projectId = this.$route.params.id || 1
            this.$store.dispatch('getPorjectDetails', datas)
            this.$store.dispatch('getIndustryInfo', datas)
        },
        methods: {
            addBlockFiles(event) {
                this.$data.addOrders += 1
                this.$data.uploaderStatus = false
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
            handleRemoveFiles(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute("data-index"), 10)
                let fileDatas = this.$data.detail_datas.sourceFiles
                let datas = {}
                datas.projectFileId = fileDatas[index].id
                datas.projectId = this.$route.params.id || 1
                if (fileDatas.length <= 1) {
                    this.$confirm(`不能删除最后一个文件.`)
                    return false   
                } else {
                    this.$store.dispatch('delProjectFiles', datas)
                }
            },
            handleRemove(file, fileList) {
                let fileDatas = this.$data.detail_datas.sourceFiles
                let datas = {}
                let datasID = -1
                for (let keys of fileDatas) {
                    if (keys.file.id === file.id) {
                        datas.projectFileId = keys.id
                    }
                }
                datas.projectId = this.$route.params.id || 1
                if (fileList.length <= 1) {
                    return false
                } else {
                    this.$store.dispatch('delProjectFiles', datas)
                    return false
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response, file, fileList) {
                let fileDatas = response.data.result
                fileDatas.name = fileDatas.fileName
                fileDatas.url = fileDatas.filePath
                fileDatas.id = fileDatas.id
                this.$data.fileList.push(fileDatas)
                let datas = this.$data.detail_datas
                let filesdatas = {}
                filesdatas.file = response.data.result
                filesdatas.id = datas.sourceFiles[0].id
                filesdatas.projectId = datas.sourceFiles[0].projectId
                filesdatas.industry1 = JSON.parse(this.$data.form.fileList[0].industry1)
                filesdatas.industry2 = JSON.parse(this.$data.form.fileList[0].industry2)
                filesdatas.industry3 = JSON.parse(this.$data.form.fileList[0].industry3)
                filesdatas.industry4 = JSON.parse(this.$data.form.fileList[0].industry4)
                datas.sourceFiles.push(filesdatas)
                this.$store.dispatch('doSaveProject', datas)
            },
            handleExceed(files, fileList) {
                console.log("handleExceed files:", arguments)
                this.$message.warning(`当前限制选择 200 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                let datas = {}
                let fileDatas = this.$data.detail_datas.sourceFiles
                let datasID = -1
                for (let keys of fileDatas) {
                    if (keys.file.id === file.id) {
                        datas.projectFileId = keys.id
                    }
                }
                datas.projectId = this.$route.params.id || 1
                if (fileList.length <= 1) {
                    this.$confirm(`不能删除最后一个文件 ${ file.name }？`)
                    return false
                } else {
                    this.$store.dispatch('delProjectFiles', datas)
                    return false
                }
            },
            handleCommand(command) {
                let datas = JSON.parse(command)
                let messages = ''
                if (datas.index === 0) {
                    window.location.href = `http://127.0.0.1:9000/atreus/export/source?projectFileId=${datas.projectFileId}`
                    messages = '导出原文'
                    // this.$store.dispatch('getExportSource', datas)
                }
                if (datas.index === 1) {
                    window.location.href = `http://127.0.0.1:9000/atreus/export/target?projectFileId=${datas.projectFileId}`
                    messages = '导出译文'
                    // this.$store.dispatch('getExportTarget', datas)
                }
                if (datas.index === 2) {
                    window.location.href = `http://127.0.0.1:9000/atreus/export/reviewed?projectFileId=${datas.projectFileId}`
                    messages = '导出审校'
                    // this.$store.dispatch('getExportReviewed', datas)
                }
                this.$message(`正在${messages}中...`);
            }
        }
    }
</script>