<style lang="less" scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        position: fixed;
    }
    .el-header {
        top:0;
        left:0;
        right:0;
    } 
    .el-footer {
        bottom:0;
        left:0;
        right:0;
    }
    .el-main {
        margin: 60px 0;
        padding: 0;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
      
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
      
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .pages {
        width:100%;
        height:300px;
        padding:0;
        margin:0;
        -webkit-overflow-scrolling: touch
    }
    .scroll {
        height: 90%;
        overflow: hidden;
        .scroll-wappers {
            height: 100%;
            overflow-y: scroll;
            .list-datas {
                width:99%;
                height:160px;
                padding:0;
                margin:0 auto 10px;
                border:1px solid #ccc;
                p, h3 {
                    display:block;
                    height:20px;
                    line-height:20px;
                }
                p {
                    text-align:left;
                    text-indent:2em;
                    font-size:12px;
                }
                h3 {
                    text-align:center;
                    font-size:14px;
                }
            }
        }
        .scroll-wappers::-webkit-scrollbar {
            width: 10px;
        }
        
        .scroll-wappers::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: #eee;
        }
        
        .scroll-wappers::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #3DB6A4;
        }
    }
    .el-row {
        margin: 10px 0 0 0;
        &:last-child {
            margin-bottom: 0;
        }
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }
    .el-col {
        border-radius: 4px;
        line-height: 40px;
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
    .grid-mat {
        margin:10px 0;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height:40px;
        text-align: center;
        padding:10px 0;
        width:100%;
        &:after {
            content: '';
            display: block;
            clear: both;
        }
        .el-tag {
            margin: 0 10px;
        }
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
<template>
    <el-container>
        <el-header>留学攻略</el-header>
        <el-main>
            <div class="bg-purple-dark">
                <el-row :gutter="2">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options0"
                                v-model="selectedOptions0"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options1"
                                v-model="selectedOptions1"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options2"
                                v-model="selectedOptions2"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options3"
                                v-model="selectedOptions3"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tagList">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-light">
                            <el-tag
                                v-for="tag in tags"
                                :key="tag.name"
                                closable
                                :type="tag.type">
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="scroll" v-bind:style="styleH">
                <div class="scroll-wappers">
                    <div class="list-datas" v-for="(item, $index) in strategy_list_datas" :key="$index" :data-id="item.id">
                        <router-link :to="`/abroadguides/${item.id}`">
                            <h3>{{item.title}}</h3>
                            <p>{{item.intro}}</p>
                        </router-link>
                    </div>
                    <infinite-loading direction="bottom" @infinite="infiniteDownHandler"></infinite-loading>
                </div>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: "AbroadGuide",
        components: {
            InfiniteLoading:InfiniteLoading
        },
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                strategy_list_datas_info: 'strategy_list_datas_info',
                strategy_category_data_info: 'strategy_category_data_info'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
            },
            strategy_list_datas_info: function() {
                this.$data.strategy_list_datas = this.strategy_list_datas_info
                if (this.strategy_list_datas_info.length <= 10) {
                    if (!!this.$data.downObjects) {
                        this.$data.downObjects.complete()
                    }
                } else {
                    if (!!this.$data.downObjects) {
                        this.$data.downObjects.loaded()
                    }
                }
            },
            strategy_category_data_info: function() {
                let datas = []
                let pushDatas = []
                let degreeDatas = []
                let specialtyDatas = []
                let tempObj = {}
                let tempChildren = {}
                let index = 0
                for (let keys of this.strategy_category_data_info) {
                    tempObj = {}
                    if (!!keys.categorys) {
                        tempObj.children = []
                        datas = keys.categorys
                        tempObj.value = keys.id
                        tempObj.label = keys.name
                        for (let key of datas) {
                            tempChildren = {}
                            tempChildren.value = key.id
                            tempChildren.label = key.name
                            tempObj.children.push(tempChildren)
                        }
                    } else {
                        tempObj.value = keys.id
                        tempObj.label = keys.name
                    }
                    if (index === 0) {
                        this.$data.options0.push(tempObj)
                    } else if (index === 1) {
                        this.$data.options1.push(tempObj)
                    } else if (index === 2) {
                        this.$data.options2.push(tempObj)
                    } else if (index === 3) {
                        this.$data.options3.push(tempObj)
                    }
                    index += 1
                }
                console.log("strategy_category_data_info:", this.strategy_category_data_info)
            }
        },
        data() {
            return {
                dataCounter: {},
                styleH: {
                    height:'300px'
                },
                count: 0,
                list: [],
                tags: [
                    { name: '标签1', type: 'success' },
                    { name: '标签2', type: 'info' },
                    { name: '标签3', type: 'warning' },
                    { name: '标签4', type: 'danger' }
                ],
                pageIndex: 1,
                options0: [],
                options1: [],
                options2: [],
                options3: [],
                downObjects: {},
                selectedOptions0: [],
                selectedOptions1: [],
                selectedOptions2: [],
                selectedOptions3: [],
                strategy_list_datas: [],
                token: ''
            }
        },
        mounted() {
            let flowHeight = parseInt(document.body.scrollHeight, 10) - (120 + 120)
            let _self = this
            let userDatas = {}
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
                data.token = userDatas.token
                data.pageIndex = 1
                _self.$data.token = userDatas.token
                _self.$store.dispatch('getStrategyInfo', data)
                _self.$store.dispatch('getStrategyList', data)
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
            this.$data.styleH.height = `${flowHeight}px`
        },
        methods: {
            infiniteDownHandler($state) {
                this.$data.downObjects = $state
                let data = {}
                this.$data.pageIndex += 1
                data.token = this.$data.token
                data.pageIndex = this.$data.pageIndex
                this.$store.dispatch('getStrategyList', data)
            },
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>