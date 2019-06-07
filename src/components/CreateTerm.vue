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
    <h1>新建语料库/术语库</h1>
    <div class="bd">
        <div class="row">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="语料名称">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="机构名称">
                    <el-select v-model="sname" filterable placeholder="请选择或输入">
                        <el-option
                            v-for="(item, $index) in customer_datas"
                            :key="$index"
                            :data-datas="item.json_datas"
                            :label="item.customerName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语言">
                    <el-select v-model="value4" placeholder="请选择">
                        <el-option
                          v-for="(item, $index) in languagedatas"
                          :key="$index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="fas fa-arrows-alt-h" style="font-size:18px;"></i>
                    <el-select v-model="value5" placeholder="请选择">
                        <el-option
                          v-for="(item, $index) in languagedatas"
                          :key="$index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语料类型">
                    <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in author"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语言级别">
                    <el-select v-model="level" placeholder="请选择">
                        <el-option
                          v-for="item in levels"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级行业">
                    <el-select v-model="form.level_0" filterable @change="getOneLevelDatas" placeholder="请选择">
                        <el-option
                          v-for="item in main_industry_models_0"
                          :key="item.code"
                          :data-id="item.id"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级行业">
                    <el-select v-model="form.level_1" filterable @change="getTwoLevelDatas" placeholder="请选择">
                        <el-option
                          v-for="item in sub_industry_models_1"
                          :key="item.code"
                          :data-id="item.id"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级行业">
                    <el-select v-model="form.level_2" filterable @change="getThereLevelDatas" placeholder="请选择">
                        <el-option
                          v-for="item in sub_industry_models_2"
                          :key="item.code"
                          :data-id="item.id"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="四级行业">
                    <el-select v-model="form.level_3" filterable placeholder="请选择">
                        <el-option
                          v-for="item in sub_industry_models_3"
                          :key="item.code"
                          :data-id="item.id"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="稿件上传">
                    <div class="showUploaderFiles">
                        <input type="file" id="input-file" class="custom-file-input upload-file" @change="uploaderFiles" />
                        <button type="button" class="btn btn-secondary flowFileUploader">点击上传</button>
                    </div>
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
    //action="https://jsonplaceholder.typicode.com/posts/"
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    
    export default {
        name: "CreateProjectBase",
        data() {
            return {
                isUsedFaster:false,
                fileList: [
                    {name: 'food.docx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                    {name: 'food2.doc', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                ],
                form : {
                    filepath : '',
                    level_0 : '',
                    level_1 : '',
                    level_2 : '',
                    level_3 : ''
                },
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
                sub_there_industry_models_datas: 'sub_there_industry_models_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
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
            this.$store.dispatch('getCustomerInfo', datas)
        },
        methods: {
            uploaderFiles(event) {
                let elements = event.target
                let file_datas = elements.files
                let data = new FormData()
                let _self = this
                let path = ""
                let FileReader = window.FileReader
                if (FileReader) { //chrome浏览器处理
                    let reader = new FileReader()
                    reader.onload = function(e) {
                        data.append("file", e.target.result)
                    };
                    reader.readAsDataURL(file_datas)
                    setTimeout(function() {
                        _self.$store.dispatch('doUploaderFile', data)
                    },1000)
                } else { //其他浏览器处理，火狐在这里就不写出来了，网上资料很多
                    path = elements.value
                    if (/"\w\W"/.test(path)) {
                        path = path.slice(1, -1)
                    }
                    data.append("file", path)
                    _self.$store.dispatch('doUploaderFile', data)
                }
            },
            getOneLevelDatas(event) {
                let datas = this.$data.form.level_0
                this.$store.dispatch('getOneIndustryInfo', datas)
            },
            getTwoLevelDatas(event) {
                let datas = this.$data.form.level_1
                this.$store.dispatch('getTwoIndustryInfo', datas)
            },
            getThereLevelDatas(event) {
                let datas = this.$data.form.level_2
                this.$store.dispatch('getThereIndustryInfo', datas)
            },
            onSubmit(event) {

            }
        }
    }
</script>