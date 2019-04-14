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
                padding: 0;
                margin:0 auto 10px;
                border:1px solid #ccc;
                overflow:hidden;
                ul, li {
                    position: relative;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                li {
                    border-top:1px solid #ccc;
                    outer-bottom:1px solid #ccc;
                    .behind {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        right: 0;
                        z-index:1;
                    }
                    .behind a.ui-btn {
                        width: 68px;
                        margin: 0px;
                        float: right;
                        border: none;
                        position: absolute;
                        top: 0;
                        right: 0;
                        z-index:1;
                    }
                    .behind a.delete-btn, .behind a.delete-btn:active, .behind a.delete-btn:visited, .behind a.delete-btn:focus, .behind a.delete-btn:hover {
                        color: white;
                        background-color: red;
                        text-shadow: none;
                    }
                    .behind a.ui-btn.pull-left {
                        float: left;
                    }
                    .behind a.edit-btn, .behind a.edit-btn:active, .behind a.edit-btn:visited, .behind a.edit-btn:focus, .behind a.edit-btn:hover {
                        color: white;
                        background-color: orange;
                        text-shadow: none;
                    }
                    div.titles {
                        width: 100%;
                        position: relative;
                        top: 0;
                        z-index:10;
                        background-color: #99a9bf;
                        font-size:12px;
                        font-weight:bold;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
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
        <el-header>我的收藏</el-header>
        <el-main>
            <div class="scroll" v-bind:style="styleH">
                <div class="scroll-wappers">
                    <div class="list-datas">
                        <ul data-role="listview" class="swipe-delete">
                            <li v-for="(item, index) of collect_list_datas" :key="index">
                                <div class="behind">
                                    <a href="#" @click="delCollection" :data-id="item.productId" class="ui-btn delete-btn">Delete</a>
                                </div>
                                <div class="ui-btn ui-btn-icon-right titles" style="left: 0px;" @touchstart="starttouch" @touchmove="movetouch" @touchend="endtouch">{{item.title}}</div>
                            </li>
                        </ul>
                    </div>
                    <infinite-loading direction="bottom" @infinite="infiniteDownHandler"></infinite-loading>
                </div>

            </div>
        </el-main>
    </el-container>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: "Collection",
        components: {
            InfiniteLoading:InfiniteLoading
        },
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                collect_data_status: 'collect_data_status',
                collect_list_datas: 'collect_list_datas'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
            },
            collect_data_status: function() {
                if (!!this.collect_data_status) {
                    let data = {}
                    this.$data.pageIndex = 1
                    data.token = this.$data.token
                    data.pageIndex = this.$data.pageIndex
                    this.$store.dispatch('getCollectList', data)
                }
            },
            collect_list_datas: function() {
                if (this.collect_list_datas.length <= 10) {
                    if (!!this.$data.downObjects.complete) {
                        this.$data.downObjects.complete()
                    }
                } else {
                    if (!!this.$data.downObjects.loaded) {
                        this.$data.downObjects.loaded()
                    }
                }
                this.$data.collect_list_datas_info.push(this.collect_list_datas)
            }
        },
        data() {
            return {
                styleH: {
                    height:'300px'
                },
                x: 0,
                downObjects: {},
                pageIndex: 0,
                collect_list_datas_info: [],
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
                data.pageIndex = 1
                data.token = userDatas.token
                _self.$data.token = data.token
                _self.$store.dispatch('getCollectList', data)
            }).catch(function(err) {
                console.log(err);
            });
            this.$data.styleH.height = `${flowHeight}px`
        },
        methods: {
            delCollection(event) {
                let elements = event.target
                let id = elements.getAttribute('data-id')
                let data = {}
                data.id = id
                data.token = this.$data.token
                this.$store.dispatch('delCollectDatas', data)
            },
            infiniteDownHandler($state) {
                this.$data.downObjects = $state
                let data = {}
                this.$data.pageIndex += 1
                data.token = this.$data.token
                data.pageIndex = this.$data.pageIndex
                this.$store.dispatch('getCollectList', data)
            },
            starttouch(e) {
                $('.swipe-delete li > div.titles').css('left', '0px').removeClass('open') 
                $(e.currentTarget).addClass('open')
                this.$data.x = e.targetTouches[0].pageX // anchor point
            },
            movetouch(e) {
                var change = e.targetTouches[0].pageX - this.$data.x
                change = Math.min(Math.max(-100, change), 100)
                e.currentTarget.style.left = change + 'px'
            },
            endtouch(e) {
                var left = parseInt(e.currentTarget.style.left)
                var new_left;
                if (left < -35) {
                    new_left = '-100px'
                } else if (left > 35) {
                    new_left = '0'
                } else {
                    new_left = '0'
                }
                $(e.currentTarget).animate({left: new_left}, 200)
            }
        }
    }
</script>