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
                padding:40px 0;
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
            <div class="scroll" v-bind:style="styleH">
                <div class="scroll-wappers">
                    <div class="list-datas">
                        <h3>{{strategy_data_detail_info.title}}</h3>
                        <p>{{strategy_data_detail_info.intro}}</p>
                        <p>{{strategy_data_detail_info.content}}</p>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'

    export default {
        name: "AbroadGuideDetails",
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                strategy_data_detail: 'strategy_data_detail'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            strategy_data_detail: function() {
                this.$data.strategy_data_detail_info = this.strategy_data_detail
                console.log("strategy_data_detail:", this.strategy_data_detail)
            }
        },
        data() {
            return {
                dataCounter: {},
                styleH: {
                    height:'300px'
                },
                strategy_data_detail_info: {},
                token: ''
            }
        },
        mounted() {
            let flowHeight = parseInt(document.body.scrollHeight, 10) - 60
            let _self = this
            let userDatas = {}
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
                data.id = _self.$route.params.id || 0
                data.token = userDatas.token
                _self.$data.token = userDatas.token
                _self.$store.dispatch('getStrategyDetails', data)
            }).catch(function(err) {
                console.log(err);
            });
            this.$data.styleH.height = `${flowHeight}px`
        },
        methods: {
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>