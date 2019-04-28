<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .hd {
        width:100%;
        height:48px;
        line-height:48px;
        h1 {
            height:48px;
            line-height:48px;
            font-size:24px;
            font-weight:bold;
            text-align:center;
        }
    }
    .bd {
        width:100%;
        table {
            line-height:24px;
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="hd">
        <h1>区块分析报告</h1>
    </div>
    <div class="bd">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">项目名称</th>
                    <th scope="col">世界人口状况报告</th>
                    <th scope="col">区块名称</th>
                    <th scope="col">世界儿童状况报告-1</th>
                </tr>
                <tr>
                    <th scope="col">重复率</th>
                    <th scope="col">字符数(不计空格)</th>
                    <th scope="col">字数</th>
                    <th scope="col">@句段数</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">文件</th>
                    <td>5000</td>
                    <td>900</td>
                    <td>50</td>
                </tr>
                <tr>
                    <th scope="row">100%</th>
                    <td>5000</td>
                    <td>900</td>
                    <td>50</td>
                </tr>
                <tr>
                    <th scope="row">95%-99%</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th scope="row">85%-94%</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th scope="row">75%-84%</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th scope="row">50%-74%</th>
                    <td>5000</td>
                    <td>900</td>
                    <td>50</td>
                </tr>
                <tr>
                    <th scope="row">0%-49%</th>
                    <td>2999</td>
                    <td>730</td>
                    <td>38</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'

    export default {
        name: "ManuScriptAnalysisReport",
        data() {
            return {
            }
        },
        mounted() {
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        },
        methods: {
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>