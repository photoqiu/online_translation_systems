<style lang="less" scoped>
.page-item-detail {
    .page-item-detail-major-image {
        text-align: center;background: #fff;
        img{
            width: 5.8rem;
            height: 5.8rem;
            border-radius: 100%;
            margin-top: 1rem;
        }
        .username{
            font-size: 0.9rem;
        }
        .fc-gray{
            font-size: .6rem;
            color: #999;
        }
        span{
            font-size: 0.6rem;
            padding: 0 .25rem;
        }
    }
}
.detail-info{
    text-indent:2em;
    line-height: 1.3;
    font-size: .65rem;
    text-align: left;
    padding:.7rem .5rem 0;
}
.info-tigongfuwu {
    text-align: left;
    padding: .25rem;
    height: 30px;
    sub {
        color: #fff;
        background-color: #ff7f00;
        margin-right: .2rem;
        font-size: .5rem;
        border-radius: 3px;
        height: .7rem;
        line-height: .7rem;
        padding: 0 3px;
        bottom: 0;
    }
    sub.sub02{
        background-color: #f55b25;
    }
    sub.sub03{
        background-color: #ca6c33;
    }
    .sprite-favico-black , .sprite-favico-origin{
        position: absolute;
        right: 5px;
        width: 30px;
        height: 30px;
    }
    .sprite-favico-black {
        background-image: url(../static/assets/image/sprite-favico-black.png);
        background-size: contain;
    }
    .sprite-favico-origin {
        background-image: url(../static/assets/image/sprite-favico-origin.png);
        background-size: contain;
    }
}
.left-space{
    margin-left: 12px;
}
.detail-teacher-info{background: #fff;margin-top: 10px}
.teacher-info-menu{height: 45px;line-height:45px;text-align: center;border-bottom: 1px solid #f0f0f0;}
.teacher-info-menu a{color: #666;font-size: .8rem;text-decoration: none;display: inline-block;}
.teacher-info-menu a.active{color:#ff7f00;border-bottom: 3px solid #ff7f00;height: 42px;}
.teacher-info-text,
.teacher-info-evaluate{font-size: .7rem;color: #666;padding:10px;}
.teacher-info-text p{
    margin-block-start: .5em;
    margin-block-end: .5em;}
.fc-orgin{color: #ff7f00}
.teacher-info-text .fc-orgin{font-size: .75rem;}
.list-comment:last-child .com-item{border-bottom: none}
.comment-cont{font-size: .6rem;}
.comment-cont .title{margin-top: 3px;}
.comment-cont .name{color: #000}
.comment-cont p{margin-block-start: .5em;margin-block-end: .5em;color: #999}
.comment-cont p.desc{margin-top: .4rem;}
.comment-cont p.time{font-size: 0.5rem;}
.comment-cont p.time span{margin-left: 10px;}
body.native .tabbar {
  display: none;
}
.tabbar {
    height: 49px;
    width: 16rem;
    .com-tips {
        z-index: 10000;
        position: fixed;
        bottom: 70px;
        left: 8rem;
        margin-left: -66px;
        .msg {
            width: 100px;
            text-align: center;
            padding: 10px 10px 10px 20px;
        }
        .container {
            position: absolute;
            height: 15px;
            width: 30px;
            bottom: -15px;
            overflow: hidden;
            right: 50px;
        }
    }
    .tabbar-yuyue {
        border-top: 1px solid #ff9326;
        height: 49px;
        width: 16rem;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        z-index: 999;
        .col-6{text-align: center;line-height: 49px;}
        .tabbar-yuyue-price-span{color:#ff7f00;font-size:15px;margin-top: 2px;}
        .tabbar-yuyue-price-span em{font-size: 20px;font-style:normal; }
        .tabbar-yuyue-price-span sub{font-size: 15px;}
        .col-6 a.tabbar-yuyue-btn-orgin{
            display: block;
            background-color: #ff9326;
            font-size: 15px;
            color: #fff;
            text-decoration:none;
        }
    }
}
</style>
<template>
    <div class="page page-item-detail">
        <div id="hd">
            <div class="page-item-detail-major-image"> 
                <img src="../static/assets/image/headpic.jpg" alt="">
                <div class="username">{{counselor_data_detail_info.counselor.nickname}}</div>
                <div class="fc-gray"><span>{{counselor_data_detail_info.counselor.specialty.name}}</span><span>{{counselor_data_detail_info.counselor.school.name}}</span></div>
                <div class="detail-info">{{counselor_data_detail_info.counselor.intro}}</div>
                <div class="info-tigongfuwu flex middle">

                <span class="fc-gray">提供服务</span>
                    <sub v-for="(item, $index) in counselor_data_detail_info.services" :key="$index" :class="item.classname">{{item.name}}</sub>
                    <span class="fc-gray left-space">已预约:{{counselor_data_detail_info.orderNum}}次</span>
                    <a href="###" class="sprite sprite-favico-black"></a>
                    <a href="###" class="sprite sprite-favico-origin"></a>
                </div>
            </div>
        </div>
        <div id="master">
            <div class="detail-teacher-info">
                <div class="teacher-info-menu row flex ">
                    <div class="col-6"><a href="###" :class="useHightLight[0]" @click="showCase" data-index="0">导师详情</a></div>
                    <div class="col-6"><a href="###" :class="useHightLight[1]" @click="showCase" data-index="1">用户评价({{counselor_data_detail_info.commentNum}})</a></div>
                </div>
                <div id="masterDetail" v-show="isdetail">
                    <div class="teacher-info-text">
                        <p class="fc-orgin">导师履历</p>
                        <p>
                          {{counselor_data_detail_info.record}}
                        </p>
                        <p class="fc-orgin">专业领域</p>
                        <p>
                            {{counselor_data_detail_info.domain}}
                        </p>
                    </div>
                </div>
                <div id="userComment" v-show="!isdetail">
                    <div class="teacher-info-evaluate">
                        <div class="teacher-info-evaluate-title flex middle">
                            <span class="sprite sprite-pingfen"></span>
                            <span>综合评分：<b>{{score}}</b><sub>分</sub></span>
                        </div>
                        <div class="list-comment" v-for="(item, $index) in comments" :key="$index">
                            <div>
                                <div>
                                    <div class="com-item row flex">
                                        <div class="user-log">
                                            <img src="https://tfs.alipayobjects.com/images/partner/T18FlaXklXXXXXXXXX" />
                                        </div>
                                        <div class="comment-cont col-flex">
                                            <div class="title flex middle justify">
                                                <span class="name">{{item.user.nickname}}</span>
                                            </div>
                                            <p class="desc">{{item.content}}</p>
                                            <p class="time">{{item.datetime}}</span>
                                                <span class="star-score">
                                                    <i class="bar" style="width: 40%;"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabbar">
            <div class="tabbar-yuyue row flex">
                <div class="col-6"><span class="tabbar-yuyue-price-span">¥<em>{{counselor_data_detail_info.fristPrice}}</em><sub>{{counselor_data_detail_info.otherPrice}}</sub>/次</span></div>
                <div class="col-6">
                <router-link class="tabbar-yuyue-btn-orgin" :to="`/consultantbuy/${counselor_data_detail_info.id}`">立即预约</router-link></div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">

    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    export default {
        name: "consultantdetail",
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
                console.log("extend_score : ", this.extend_score)
                this.$data.score = this.extend_score
            },
            comment_list_datas: function() {
                this.$data.commentLens = this.comment_list_datas.length
                this.$data.comments = this.comment_list_datas
                console.log("comment_list_datas : ", this.comment_list_datas) 
            },
            counselor_data_detail: function() {
                this.$data.counselor_data_detail_info = this.counselor_data_detail
                console.log("counselor_data_detail:", this.counselor_data_detail)
            }
        },
        data() {
            return {
                score: 0,
                activeIndex: 0,
                activeClass:"grid-content-text center-text bg-purple activeName",
                normalClass:"grid-content-text center-text bg-purple",
                dataclass:[],
                isComment:false,
                isdetail:true,
                useHightLight:['active', ''],
                counselor_data_detail_info: {
                    counselor: {
                        school: {
                            name : ''
                        },
                        specialty: {
                            name : ''
                        },
                        nickname: ''

                    },
                    services: []
                },
                comments:[],
                styleH: {
                    height:'300px'
                },
                CommentStyleH: {
                    height:'300px'
                },
                commentLens:0,
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
                _self.$store.dispatch('getConsultDetailsInfo', data)
                _self.$store.dispatch('getCommentList', data)
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
            },
            showCase(event) {
                let eles = event.target
                let index = parseInt(eles.getAttribute('data-index'), 10)
                if (index === 0) {
                    this.$data.isdetail = true
                    this.$data.useHightLight = ['active', '']
                } else {
                    this.$data.isdetail = false
                    this.$data.useHightLight = ['', 'active']
                }
            },
            handleClick(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute("data-index"), 10)
                if (this.$data.activeIndex !== index) {
                    this.$data.activeIndex = index
                    if (index === 0) {
                        this.$data.dataclass = [
                            this.$data.activeClass,
                            this.$data.normalClass   
                        ]
                        this.$data.isComment = false
                    } else {
                        this.$data.isComment = true
                        this.$data.dataclass = [
                            this.$data.normalClass,
                            this.$data.activeClass
                        ]
                    }
                } else {
                    return false
                }
                console.log(event);
            }
        }
    }
</script>