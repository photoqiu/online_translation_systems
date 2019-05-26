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
            .alert {
                width:100%;
                height:60px;
                line-height:38px;
                text-align:left;
            }
            .table td, .table th {
                padding:0;
                height:32px;
                line-height:32px;
            }
            .progress {
                margin:10px 0 0 0;
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
                <b>文件名称:</b> 世界人口状况报告-区块分析列表
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">名称</th>
                        <th scope="col">字符数(不计空格)</th>
                        <th scope="col">字数</th>
                        <th scope="col">句段数</th>
                        <th scope="col">文档支持</th>
                        <th scope="col">完成度</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>世界人口状况报告-区块01</td>
                        <td>15010</td>
                        <td>2183</td>
                        <td>112</td>
                        <td>
                            字典：《世界人口状况报告》
                            禁用语文档：《世界人口状况报告》
                        </td>
                        <td>
                            <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>
                        <td>
                            <router-link :to="{path:'/', activeClass: 'active'}">编辑</router-link>
                            <router-link :to="{path:'/', activeClass: 'active'}">审校</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>世界人口状况报告-区块01</td>
                        <td>15010</td>
                        <td>2183</td>
                        <td>112</td>
                        <td>
                            字典：《世界人口状况报告》
                            禁用语文档：《世界人口状况报告》
                        </td>
                        <td>
                            <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>
                        <td>
                            <router-link :to="{path:'/', activeClass: 'active'}">编辑</router-link>
                            <router-link :to="{path:'/', activeClass: 'active'}">审校</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>世界人口状况报告-区块01</td>
                        <td>15010</td>
                        <td>2183</td>
                        <td>112</td>
                        <td>
                            字典：《世界人口状况报告》
                            禁用语文档：《世界人口状况报告》
                        </td>
                        <td>
                            <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>
                        <td>
                            <router-link :to="{path:'/', activeClass: 'active'}">编辑</router-link>
                            <router-link :to="{path:'/', activeClass: 'active'}">审校</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>世界人口状况报告-区块01</td>
                        <td>15010</td>
                        <td>2183</td>
                        <td>112</td>
                        <td>
                            字典：《世界人口状况报告》
                            禁用语文档：《世界人口状况报告》
                        </td>
                        <td>
                            <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>
                        <td>
                            <router-link :to="{path:'/', activeClass: 'active'}">编辑</router-link>
                            <router-link :to="{path:'/', activeClass: 'active'}">审校</router-link>
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
        name: "BlockArticle",
        data() {
            return {
                isUsedFaster:false,
                tableData: [{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
                },{
                    date: '2016-05-07~2016-05-11',
                    name: '王小虎',
                    pmname: '张三',
                    projectname : "国际贸易合同翻译",
                    qkname : "合同翻译",
                    language : "英->中",
                    wordnumbers: "22324",
                    process: "40%"
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