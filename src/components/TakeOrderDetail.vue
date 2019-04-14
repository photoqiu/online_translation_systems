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
        i {
            float:left;
            line-height:60px;
            font-size:20px;
            font-weight:bold;
            padding: 0 40px 0 0;
            text-align: left;
            position: absolute;
            left:20px;
            top:0;
        }
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
            .pricedatas {
                position: absolute;
                bottom:0;
                width:100%;
            }
            .list-datas {
                width:99%;
                height:340px;
                padding:0;
                line-height:40px;
                margin:0 auto;
                position: relative;
                
                .author {
                    width:100%;
                    margin:0 auto;
                    height:40px;
                    padding:0;
                    line-height:40px;
                }
                .authordetail {
                    width:100%;
                    margin:0 auto 10px;
                    padding:0;
                    border-bottom:1px solid #ccc;
                    span {
                        font-size:12px;
                        color:#aaa;
                        padding:0 10px 0 0;
                    }
                }
                p {
                    width:90%;
                    margin:0 auto;
                    display: inline-block;
                    line-height:14px;
                    font-size: 12px;
                    text-align:left;
                    text-indent:2em;
                }
                .tags {
                    height: 40px;
                    font-size:12px;
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
    .comment {
        padding:0;
        margin:0;
        width:100%;
        height:100%;
        overflow:hidden;
        .scroll {
            height:120px;
            overflow-x:hidden;
            overflow-y:auto;
            .hd {
                width:100%;
                display: block;
                border-left: 2px solid #ff0000;
                text-align:left;
                text-indent:0.2em !important;
            }
            .bd {

            }
        }
    }

    .bg-purple-dark,  {
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
    .activeName {
        color: #ff0000;
        border-bottom:1px solid #ff0000;
    }
    .grid-content-text {
        width:100%;
        min-height: 32px;
        height:32px;
        line-height:32px;
        text-align: center;
        padding:10px 0;
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }
    .userInfo {
        width:100%;
        font-size:12px;
        span {
            width:50%;
            float:left;
            display:block;
            height:50px;
            text-align:left;
            line-height:50px;
            img {
                width:100px;
                height:50px;
                text-align:center;
                display:inline-block;
            }
        }

        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }
    .el-row {
        border-bottom:1px solid #aaa;
    }
    .grid-content {
        width:100%;
        min-height: 42px;
        height:42px;
        line-height:42px;
        text-align: center;
        padding:10px 0;
        &:after {
            content: '';
            display: block;
            clear: both;
        }

        .tagdesc {
            text-align:left;
            display: inline-block;
            float: left;
            font-size:12px;
            text-indent:0.8em;
        }
        .el-tag {
            margin: 10px 10px 0;
            display: inline-block;
            float: left;
        }
    }
    .ticket_score {
        display: block;
        text-align: left;
        text-indent: 0.5em;
        i {
            padding:0 10px;
        }
        b {
            color:#ff0000;
        }
    }
    .commentDetailStyle {
        width:92%;
        margin:0 auto;
        font-size:12px;
        float:left;
        display:block;
        text-align: left;
        word-wrap: break-word;  
        word-break: normal;
        text-indent:2em;
        height: 100%;
    }
    .commentInfo {
        text-indent:0;
        text-align:left;
        font-size:12px;
        float:left;
        width:100%;
        span {
            float:left;
            width:50%;
            height:24px;
            line-height:24px;
        }
        .timer {
            text-indent:2em;
        }
    }
    .commentNicknameStyle {
        text-align: center !important;
    }
    .commentStyle {
        text-indent:0.8em;
    }
    .commentStyle, .commentNicknameStyle {
        height: 100%;
        font-size:12px;
        float:left;
        display:block;
        text-align: left;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
<template>
    <el-container>
        <el-header>
            <i class="el-icon-arrow-left" @click="getback"></i>
            订单确认
        </el-header>
        <el-main>
            <div class="scroll" v-bind:style="styleH">
                <div class="scroll-wappers">
                    <div class="list-datas">
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    订单内容：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    订单类型：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    顾问咨询
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    咨询内容：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    手机号：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    skype：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    邮箱：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content">
                                    期望时间：
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="pricedatas">
                        <el-row>
                            <el-col :span="12"><div class="grid-content bg-purple">￥300</div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light"> <el-button type="danger">立即购买</el-button></div></el-col>
                        </el-row>
                    </div>
                </div>

            </div>
            
        </el-main>
    </el-container>
</template>
<script type="text/babel">

    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    export default {
        name: "TakeOrderDetail",
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                counselor_data_detail: 'counselor_data_detail',
                extend_score: 'extend_score',
                comment_list_datas : 'comment_list_datas'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
            },
            extend_score: function() {
                this.$data.score = this.extend_score
            },
            comment_list_datas: function() {
                this.$data.commentLens = this.comment_list_datas.length
                this.$data.comments = this.comment_list_datas
                console.log("comment_list_datas:", this.comment_list_datas) 
            },
            counselor_data_detail: function() {
                this.$data.counselor_data_detail_info = this.counselor_data_detail
                console.log("counselor_data_detail:", this.counselor_data_detail)
            }
        },
        data() {
            return {
                styleH: {
                    height:'300px'
                },
                CommentStyleH: {
                    height:'300px'
                },
                input:'',
                token: ''
            }
        },
        mounted() {
            let _self = this
            localForage.getItem('users').then(function(value) {
                let data = {}
                data.id = _self.$route.params.id || 0
                data.token = value.token
                data.pageIndex = 1
                data.uid = value.phone
                _self.$data.token = value.token
                // _self.$store.dispatch('getConsultDetailsInfo', data)
                // _self.$store.dispatch('getCommentList', data)
            }).catch(function(err) {
                console.log(err);
            });
            let flowHeight = parseInt(document.body.scrollHeight, 10) - 60
            this.$data.styleH.height = `${flowHeight}px`
            let commentHeight = flowHeight - 400
            this.$data.CommentStyleH.height = `${commentHeight}px`
            this.$data.dataclass = [
                this.$data.activeClass,
                this.$data.normalClass   
            ]
        },
        methods: {
            getback(event) {
                window.history.back()
            }
        }
    }
</script>