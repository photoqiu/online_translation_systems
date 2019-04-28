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
    <h1>新建语料库/术语库</h1>
    <div class="bd">
        <div class="row">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="语料名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="机构名称">
                    <el-input v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="语言">
                    <el-select v-model="value4" placeholder="请选择">
                        <el-option
                          v-for="item in language0"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="fas fa-arrows-alt-h" style="font-size:18px;"></i>
                    <el-select v-model="value5" placeholder="请选择">
                        <el-option
                          v-for="item in language0"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语料类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                          v-for="item in author"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语言级别">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option
                          v-for="item in levels"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级行业">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option
                          v-for="item in industry0"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级行业">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option
                          v-for="item in industry1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级行业">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option
                          v-for="item in industry2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="四级行业">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option
                          v-for="item in industry3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="稿件上传">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc,pdf,docx,txt文件，且不超过20M</div>
                    </el-upload>
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
    
    export default {
        name: "CreateProjectBase",
        data() {
            return {
                isUsedFaster:false,
                fileList: [{name: 'food.docx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.doc', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                form: {},
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
                    value: '选项1',
                    label: '权威级'
                }, {
                    value: '选项2',
                    label: '标准级'
                }, {
                    value: '选项3',
                    label: '参考级'
                }],
                industry0:[],
                industry1:[],
                industry2:[],
                industry3:[],
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
        mounted() {
            let _self = this
            let userDatas = {}
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
                data.token = userDatas.token
                _self.$store.dispatch('getServiceInfo', data)
                _self.$store.dispatch('getServiceMenusInfo', data)
            }).catch(function(err) {
                console.log(err);
            });
        },
        methods: {
            handleClick(event) {
                let eles = event.target
                let index = parseInt(eles.getAttribute("data-index"), 10)
                let datas = [this.$data.categoryDatas, index]
                this.$store.dispatch('changeServiceMenusInfo', datas)
            }
        }
    }
</script>