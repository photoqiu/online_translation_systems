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
                <el-step title="创建新项目" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="分配区块" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="分配任务" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="完成" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>
        </div>
        <div class="row">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目经理">
                    <el-select v-model="form.customer" placeholder="请选择">
                        <el-option
                            v-for="(item, $index) in customer_datas"
                            :key="$index"
                            :data-datas="item.json_datas"
                            :label="item.nickName"
                            :value="item.json_datas">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起止时间：">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="稿件上传">
                    <el-upload
                        class="upload-demo"
                        action="/atreus/file/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="100"
                        :on-exceed="handleExceed"
                        :file-list="form.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc,pdf,docx,txt文件，且不超过20M</div>
                    </el-upload>
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
                    <el-select v-model="form.termid" multiple placeholder="请选择">
                        <el-option
                            v-for="item in get_term_list_datas"
                            :key="item.id"
                            :label="item.termName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="禁用语（可多选）">
                    <el-select v-model="value3" multiple placeholder="请选择">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
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
                fileList: [],
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
                    customer: {},
                    startTime:'',
                    endTime:'',
                    termid:'',
                    sourceFiles:{},
                    wordCount:0,
                    fileList: [],
                    progress:0
                },
                customer_datas: [],
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
                term_indexpage: 1,
                get_term_list_datas:[],
                activeName: 'second'
            }    
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                get_language_datas: 'get_language_datas',
                term_list_datas: 'term_list_datas',
                users_list_datas: 'users_list_datas',
                customer_info_datas: 'customer_info_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId >= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.customer_datas.push(keys)
                    }
                }
                if (!!this.users_list_datas.isLastPage) {
                    console.log(this.$data.customer_datas)
                    return false
                }
                this.$data.customer_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.customer_indexpage)
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
            this.$store.dispatch('getLanguage', datas)
            datas = '1'
            this.$store.dispatch('getUsersInfo', datas)
            this.$store.dispatch('getTermList', datas)
        },
        methods: {
            onSubmit(event) {
                console.log("form : ", this.$data.form)
                let beginTimer = moment(this.$data.form.startTime[0], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                let endTimer = moment(this.$data.form.startTime[1], "YYYY-MM-DD HH:mm:ss").format().replace("T", ' ').split("+")[0]
                this.$data.form.startTime = beginTimer
                this.$data.form.endTime = endTimer
                this.$store.dispatch('doSaveProject', this.$data.form)
                console.log("1--------------> form : ", beginTimer, endTimer)
            },
            handleExceed(event) {
                let elements = event.target
                let file_datas = elements.files[0]
                let data = new FormData()
                let _self = this
                let path = ""
                data.append("file", file_datas)
                this.$store.dispatch('doUploaderFile', data)
            },
            beforeRemove(event) {

            },
            handleRemove(event) {

            },
            handlePreview(event) {

            }
        }
    }
</script>