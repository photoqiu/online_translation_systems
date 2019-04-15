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
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
<template>
<div class="container">
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form-item label="项目名称：">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input21">
                    </el-input>    
                </el-form-item>
            </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
</div>
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
                isCollapse: true
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
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>