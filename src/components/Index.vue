<style lang="less" scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}  
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}  
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}  
body > .el-container {
    height:100%;
}
.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}  
.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>

<template>
<el-container>
    <el-header>Header</el-header>
    <el-container>
        <el-aside width="200px">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</el-container>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: "Index",
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                recommend_data: 'recommend_data',
                bananer_data: 'bananer_data'
            })
        },
        components: {
            InfiniteLoading:InfiniteLoading
        },
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        watch: {
            error_datas: function () {
                console.log("user_error_datas:", this.error_datas)
            },
            bananer_data: function() {

            },
            recommend_data: function () {
                
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
            handleNodeClick(event) {
                console.log(event);
            }
        }
    }
</script>