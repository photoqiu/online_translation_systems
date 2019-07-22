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
        <h1>项目：世界人口状况报告</h1>
        <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="状态：">
                <b>进行中...</b>
            </el-form-item>
            <el-form-item label="项目进度：">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0" color="rgba(142, 113, 199, 0.7)"></el-progress>
            </el-form-item>
            <el-form-item label="起止时间：">
                <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传文件：">
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
                    <tr>
                        <th scope="row">1</th>
                        <td>世界人口状况报告01.doc</td>
                        <td><el-progress :text-inside="true" :stroke-width="18" :percentage="67"></el-progress></td>
                        <td>张三</td>
                        <td>
                            <button type="button" class="btn btn-link">打开</button>
                            <button type="button" class="btn btn-link">分配</button>
                            <el-dropdown split-button type="primary" @click="handleClick">
                                更多操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>导出初译译文</el-dropdown-item>
                                    <el-dropdown-item>导出审校译文</el-dropdown-item>
                                    <el-dropdown-item>导出离线文件</el-dropdown-item>
                                    <el-dropdown-item>导入离线文件</el-dropdown-item>
                                    <el-dropdown-item>导出最终译文</el-dropdown-item>
                                    <el-dropdown-item>导出原-译对照</el-dropdown-item>
                                    <el-dropdown-item>导出译-原对照</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <button type="button" class="btn btn-link">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>世界人口状况报告02.doc</td>
                        <td><el-progress :text-inside="true" :stroke-width="18" :percentage="17"></el-progress></td>
                        <td>李四</td>
                        <td>
                            <button type="button" class="btn btn-link">打开</button>
                            <button type="button" class="btn btn-link">分配</button>
                            <el-dropdown split-button type="primary" @click="handleClick">
                                更多操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>导出初译译文</el-dropdown-item>
                                    <el-dropdown-item>导出审校译文</el-dropdown-item>
                                    <el-dropdown-item>导出离线文件</el-dropdown-item>
                                    <el-dropdown-item>导入离线文件</el-dropdown-item>
                                    <el-dropdown-item>导出最终译文</el-dropdown-item>
                                    <el-dropdown-item>导出原-译对照</el-dropdown-item>
                                    <el-dropdown-item>导出译-原对照</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <button type="button" class="btn btn-link">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-col :span="16"></el-col>
            <el-col :span="8">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
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
        data() {
            return {
                isUsedFaster:false,
                fileList: [{name: 'food.docx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.doc', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
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