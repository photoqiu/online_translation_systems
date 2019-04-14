<style lang="less" scoped>
    .page-item-detail-major-image {
        text-align: center;
        background: #fff;
        img {
            width: 5.8rem;
            height: 5.8rem;
            border-radius: 100%;
            margin-top: 1rem;
        }
        .username {
            font-size: 0.9rem;
        }
        .fc-gray {
            font-size: .6rem;
            color: #999;
        }
        .title {
            padding-left:.5rem;
            font-size: 0.9rem;
            margin-top: 1rem;
            font-size: .75rem;
        }
        .sub-title {
            font-size: .6rem;
            padding-left:.25rem;
            color: #999;
        }
        .textindent2 {
            text-indent: 2em;
        }
        video {
            width: 16rem;
            display: block;
            height:8.25rem;
        }
        span {
            font-size: 0.6rem;
            padding: 0 .25rem;
        }
        .info-tigongfuwu { 
            text-align: left;
            padding: .25rem;
            height: 30px;
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
    }
    .class-detail-top {
        text-align: left;
    }
    .class-detail-list li {
        padding-left: .5rem;
    }
    .class-detail-list a {
        color:#333;
        -webkit-line-clamp: 1;
        display: block;
        border-bottom: 1px solid #f2f2f2;
        height: 2rem;
        line-height:2rem;
        text-decoration: none;
        font-size: .6rem;
        overflow: hidden;
        text-overflow: ellipsis; 
        -o-text-overflow: ellipsis;
        white-space:nowrap;
    }
    .sprite-play-btn {
        margin-top: -2px;
        vertical-align: middle;
        background-image: url(../static/assets/image/sprite-play-btn.png);
        width: 14px;
        height: 14px;
        background-size: contain;
    }
    .sprite {
        display: -webkit-inline-box;
        background-repeat: no-repeat;
        font-size: 0;
        line-height: 1;
    }
    .info-tigongfuwu sub {
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
    .tabbar {
        height: 49px;
        width: 16rem;
    }
    .tabbar .com-tips {
        z-index: 10000;
        position: fixed;
        bottom: 70px;
        left: 8rem;
        margin-left: -66px;
    }
    .tabbar .com-tips .msg {
        width: 100px;
        text-align: center;
        padding: 10px 10px 10px 20px;
    }
    .tabbar .com-tips .container {
        position: absolute;
        height: 15px;
        width: 30px;
        bottom: -15px;
        overflow: hidden;
        right: 50px;
    }
    .tabbar-wrapper {
        border-top: 1px solid #ccc;
        height: 49px;
        width: 16rem;
        position: fixed;
        bottom: 0;
        background-color: #fafafa;
        z-index: 999;
    }
    .tabbar-wrapper .tabbar-item {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        text-align: center;
        height: 49px;
        line-height: 49px;
        width: 20%;
        position: relative;
        float: left;
    }
    .tabbar-wrapper .tabbar-item a {
        text-decoration: none;
        display: block;
        color: rgba(255, 255, 255, 0);
        background-size: 37px auto;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    .info-tigongfuwu sub.sub02{background-color: #f55b25;}
    .info-tigongfuwu sub.sub03{background-color: #ca6c33;}
    .info-tigongfuwu .sprite-favico-black,
    .info-tigongfuwu .sprite-favico-origin{
        position: absolute;
        right: 5px;
        background-image: url(../static/assets/image/sprite-favico-black.png);
        background-size: contain;
        width: 30px;
        height: 30px;
    }
    .tabbar-yuyue {
        border-top: 1px solid #ff9326;
        height: 49px;
        width: 16rem;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        z-index: 999;
    }
    .tabbar-yuyue .col-6{text-align: center;line-height: 49px;}
    .tabbar-yuyue-price-span{color:#ff7f00;font-size:15px;margin-top: 2px;}
    .tabbar-yuyue-price-span em{font-size: 20px;font-style:normal; }
    .tabbar-yuyue-price-span sub{font-size: 15px;}
    .tabbar-yuyue .col-6 a.tabbar-yuyue-btn-orgin{display: block;background-color: #ff9326;font-size: 15px;color: #fff; text-decoration: none;}
    .left-space{margin-left: 12px}
    .info-tigongfuwu .sprite-favico-origin{
        background-image: url(../static/assets/image/sprite-favico-origin.png);
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
</style>
<template>
<div class="page page-item-detail">
    <div id="detail-hd">
        <div class="page-item-detail-major-image class-detail-top"> 
            <video src="../static/assets/video/video.mp4" controls></video> 
            <div class="title">{{course_data_detail_info.title}}</div>
            <div class="sub-title">
                <span>{{course_data_detail_info.counselor.nickname}}</span>
                <span>{{course_data_detail_info.counselor.school.name}}</span>
                <span>{{course_data_detail_info.counselor.specialty.name}}</span>
            </div>
            <div class="info-tigongfuwu flex middle">
                <span class="fc-org">{{course_data_detail_info.playNum}}次播放</span>
                <a href="###" class="sprite sprite-favico-black"></a>
                <a href="###" class="sprite sprite-favico-origin"></a>
            </div>
        </div>
    </div>
    <div id="detail-users">
        <div class="detail-teacher-info">
            <div class="teacher-info-menu row flex ">
                <div class="col-6">
                    <a href="###" :class="showClass[0]" @click="showDatas" data-open="0">课程简介</a>
                </div>
                <div class="col-6">
                    <a href="###" :class="showClass[1]" @click="showDatas" data-open="1">课程目录</a>
                </div>
            </div>
            <div id="teacher-details" v-show="isCaseDatas">
                <div class="teacher-info-text">
                    <p class="fc-orgin">导师履历</p>
                    <p class="textindent2 justify">
                        {{course_data_detail_info.record}}
                    </p>
                    <p class="fc-orgin">课程简介</p>
                    <p class="textindent2 justify">
                        {{course_data_detail_info.intro}}
                    </p>
                </div>
            </div>
            <div id="courselist" v-show="!isCaseDatas">
                <div class="class-detail-list">
                    <ul>
                        <li>
                            <a href="###">
                                <span class="sprite sprite-play-btn"></span>【第一课】哈佛大学法学专业申请需要的第一步【第一课】哈佛大学法学专业申请需要的第一步
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <span class="sprite sprite-play-btn"></span>【第一课】哈佛大学法学专业申请需要的第一步【第一课】哈佛大学法学专业申请需要的第一步
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <span class="sprite sprite-play-btn"></span>【第一课】哈佛大学法学专业申请需要的第一步【第一课】哈佛大学法学专业申请需要的第一步
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <span class="sprite sprite-play-btn"></span>【第一课】哈佛大学法学专业申请需要的第一步【第一课】哈佛大学法学专业申请需要的第一步
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <span class="sprite sprite-play-btn"></span>【第一课】哈佛大学法学专业申请需要的第一步【第一课】哈佛大学法学专业申请需要的第一步
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="tabbar">
        <div class="tabbar-yuyue row flex">
            <div class="col-6">

                <span class="tabbar-yuyue-price-span">¥<em>{{course_data_detail_info.fristPrice}}</em><sub>{{course_data_detail_info.otherPrice}}</sub>/次</span>
            </div>
            <div class="col-6">
                <a href="/" class="tabbar-yuyue-btn-orgin">立即购买</a>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/babel">

    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    export default {
        name: "CourseDetail",
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                course_data_info: 'course_data_info'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
            },
            course_data_info: function() {
                //"type": "课程类型，1 音频，2视频"
                this.$data.course_data_detail_info = this.course_data_info
                console.log("course_data_info：", this.course_data_info)
            }
        },
        data() {
            return {
                score: 0,
                activeIndex: 0,
                activeClass:"grid-content-text center-text bg-purple activeName",
                normalClass:"grid-content-text center-text bg-purple",
                dataclass:[],
                showClass:["active",""],
                iconNormalClass: "fas fa-heart red",
                iconActiveClass: "far fa-heart",
                iconClass: 'far fa-heart',
                isheart: false,
                isComment:false,
                course_data_list:'暂无课程列表',
                isCaseDatas: true,
                course_data_detail_info: {
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
                _self.$store.dispatch('getCourseDetailDatas', data)
                _self.$store.dispatch('getCommentList', data)

            }).catch(function(err) {
                console.log(err);
            });
            let flowHeight = parseInt(document.body.scrollHeight, 10) - (60 + 72)
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
            showDatas(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute("data-open"), 10)
                this.$data.showClass = ["", ""]
                this.$data.showClass[index] = "active"
                this.$data.isCaseDatas = !this.$data.isCaseDatas
            },
            addFavorites (event) {
                this.$data.isheart = !this.$data.isheart
                let data = {}
                if (!!this.$data.isheart) {
                    this.$data.iconClass = this.$data.iconNormalClass
                } else {
                    this.$data.iconClass = this.$data.iconActiveClass
                }
                this.$store.dispatch('getCommentList', data)
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