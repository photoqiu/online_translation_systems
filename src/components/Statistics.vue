<style lang="less" scoped>
.container {
    height:100%;
    display:block;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
    }
    .el-table th {
        max-height:30px;
    }
    .el-table {
        width:1430px;
        line-height:20px;
    }
}
</style>

<template>
<div class="container">
    <el-table
        :data="tableData"
        border
        style="width:1430"
        max-height="550">
        <el-table-column
            fixed
            prop="projectname"
            label="项目名称"
            width="420">
        </el-table-column>
        <el-table-column
            prop="qkname"
            label="区块名称"
            width="220">
        </el-table-column>
        <el-table-column
            prop="language"
            label="语言"
            width="120">
        </el-table-column>
        <el-table-column
            prop="wordnumbers"
            label="字数"
            width="220">
        </el-table-column>
        <el-table-column
            prop="date"
            label="区块起止时间"
            width="240">
        </el-table-column>
        <el-table-column
            prop="process"
            label="完成进度"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="pmname"
            label="项目经理"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">去翻译</el-button>
                <el-button type="text" size="small">审校</el-button>
            </template>
        </el-table-column>
      </el-table>
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