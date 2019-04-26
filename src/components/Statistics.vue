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
            
        }
    }
}
</style>

<template>
<div class="container_bd">
    <h1>项目分析报告</h1>
    <div class="bd">
        <div class="row">
            <div class="alert alert-primary" role="alert">
                <b>文件名称:</b> 世界人口状况报告
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">重复率</th>
                        <th scope="col">字符数(不计空格)</th>
                        <th scope="col">字数</th>
                        <th scope="col">句段数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>100%</td>
                        <td>15010</td>
                        <td>2183</td>
                        <td>112</td>
                    </tr>
                    <tr>
                        <td>95%-99%</td>
                        <td>50000</td>
                        <td>9000</td>
                        <td>400</td>
                    </tr>
                    <tr>
                        <td>85%-94%</td>
                        <td>50000</td>
                        <td>9000</td>
                        <td>400</td>
                    </tr>
                    <tr>
                        <td>75%-84%</td>
                        <td>50000</td>
                        <td>9000</td>
                        <td>400</td>
                    </tr>
                    <tr>
                        <td>50%-74%</td>
                        <td>50000</td>
                        <td>9000</td>
                        <td>400</td>
                    </tr>
                    <tr>
                        <td>0%-49%</td>
                        <td>50000</td>
                        <td>9000</td>
                        <td>400</td>
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
        name: "Statistics",
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