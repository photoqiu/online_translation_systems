<style lang="less" scoped>
.page-item-list .item-list-filter {
    background: #fff;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f1f1f1;
}
.page-item-list .item-list-filter .filter-titles {
    width: 100%;
    list-style: none;
    position: relative;
    margin: 0;
    padding: 0;
    height: 40px;
    z-index: 10;
    background: #fff;
    display: flex;
}
.scroll {
    margin:41px 0 0 0;
    overflow: hidden;
    .scroll-wappers {
        height: 100%;
        overflow-y: scroll;
        .list-datas {
            width:100%;
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
            }

        }
    }
}
.page-item-list .item-list-filter .filter-titles li {
    position: relative;
    flex: 1;
    font-size: 14px;
    color: #333;
    height: 40px;
    line-height: 40px;
    text-align: center;
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
}
.page-item-list .item-list-filter .filter-titles li span {
    display: block;
    height: 40px;
    line-height: 40px;
    margin-top: 11px;
    font-size: 14px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 3rem;
}
.page-item-list .item-list-filter .filter-titles li .sprite {
    margin-left: 5px;
    display: block;
}
.page-item-list .item-list-filter .filter-titles li:after {
    content: "";
    display: block;
    height: 18px;
    width: 1px;
    background-color: #e6e6e6;
    position: absolute;
    top: 12px;
    right: 0;
}
.page-item-list .item-list-filter .filter-titles li:last-child:after {
    display: none;
            }
.page-item-list .item-list-filter .filter-titles li.active {
    color: #ff7f00;
}

.page-item-list .item-list-filter .filter-titles li:last-child span {
    border-right: 0;
}
.sprite {
    display: -webkit-inline-box;
    background-repeat: no-repeat;
    font-size: 0;
    line-height: 1;
}
.sprite.sprite-angle-black-down, .sprite.sprite-angle-black-left, .sprite.sprite-angle-black-right, .sprite.sprite-angle-black-up {
    background-image: url(../static/assets/image/sprite-angle-black.png);
    width: 10px;
    height: 5px;
    background-size: cover;
    transition-duration: .3s;
}
.sprite.sprite-angle-oringin-up,
.sprite.sprite-angle-oringin-right{
    background-image: url(../static/assets/image/sprite-angle-origin.png);
    width: 10px;
    height: 5px;
    background-size: cover;
    transition-duration: .3s;
}
.sprite.sprite-angle-black-up {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
}
.sprite.sprite-angle-oringin-up {
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
}
.sprite.sprite-angle-oringin-right,
.sprite.sprite-angle-black-right{
    left: 7rem;
    position: absolute;
    margin-top: 16px;
    width: 13px;
    height: 7px;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
}
.page-item-list .product-item {
    background: #fff;
    text-decoration: none;
    color: #333;
    padding: 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}
.page-item-list .product-item:before {
    content: "";
    display: block;
    position: absolute;
    width: 10px;
    height: 1px;
    background-color: #fff;
    bottom: -1px;
    left: 0;
}
.page-item-list .product-item:last-child{border-bottom: none}

.page-item-list .product-item .major-image {
    text-align: center;padding-top: 10px;

}
.page-item-list .product-item .major-image img{
    width: 3.75rem;height: 3.75rem;
    vertical-align: middle;
    border-radius:3.75rem;
}
.page-item-list .product-item .item-info {
    padding: 0 .5rem 0 .25rem;
    box-sizing: border-box;
    float: left;
    width: 9.75rem;
}
.page-item-list .product-item .item-title {
    padding-top: .6rem;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: .85rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: .65rem;
    max-height: 3rem;
    margin-bottom: .1rem;
}
.page-item-list .product-item .col-left{
    width: 6.25rem;
    height: 6.825rem;
    float: left;
}
.product-item .major-image .username{color: #333;font-size: .7rem;padding: .25rem 0 0}

.product-item .major-image .fc-gray{color: #999;font-size:.6rem;}
.item-rent-tag .com-tag,
.com-age-span{font-size: .6rem;color: #999}
.com-age-span sub{color: #fff;background-color: #ff7f00;margin-right: .2rem;font-size:.5rem;border-radius: 3px;height:.7rem;line-height: .7rem;padding:2px;bottom:0;}
.com-age-span sub:nth-child(2){background-color: #f55b25;}
.com-age-span sub:nth-child(3){background-color: #ca6c33;}
.com-rent-price-span{float: right;color:#ff7f00;font-size: .6rem;    margin-top: 2px;}
.com-rent-price-span em{font-size: .8rem;font-style:normal; }
.com-rent-price-span sub{font-size: .6rem;}


.item-list-filter-submenu{
    position: absolute;
    right: 0;
    top: 0;
    background: #fff;
    width: 8rem;
    border-left: 1px solid #f0f0f0;
}
.item-list-filter-submenu a{text-decoration: none;padding-left: 12px;display: block;height:40px;line-height: 40px;color: #333}
.page-item-list .header-inner {
    background: #fafafa;
    position: fixed;
    width: 16rem;
    z-index: 1001;
    top: 0;
}
.page-item-list .item-list-filter .filter-panel-container {
    position: fixed;
    top: 41px;
    bottom: 0;
    width: 16rem;
    background: rgba(0,0,0,.3);
    z-index: 10;
}
.page-item-list .item-list-filter .filter-panel {
    overflow: hidden;
    background: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
}
.page-item-list .item-list-filter .filter-option {
    text-decoration: none;
    color: #333;
    display: block;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    padding: 0;
    padding-left:17px;
}
.page-item-list .item-list-filter .filter-option.active{
    border: 1px solid #f1f1f1;
    border-left: none;
    border-right: none;
    color: #ff7f00;
}
.page-item-list .item-list-filter .filter-option.active:after{background:#fff;position: absolute;content: "";height: 38px;position: absolute;z-index:1;right: 50%;width: 1px;}

</style>
<template>
<div class="page page-item-list">
    <div id="filter">
        <div class="header-inner">
            <div class="item-list-filter">
                <ul class="filter-titles">
                    <li v-bind:class="MenusStyle[0]" @click="showMenus" data-index="0"><span data-index="0">申请专业</span><i v-bind:class="ArrowStyle[0]" data-index="0"></i></li>
                    <li v-bind:class="MenusStyle[1]"  @click="showMenus" data-index="1"><span data-index="1">申请学位</span><i v-bind:class="ArrowStyle[1]" data-index="1"></i></li>
                    <li v-bind:class="MenusStyle[2]"  @click="showMenus" data-index="2"><span data-index="2">顾问背景</span><i v-bind:class="ArrowStyle[2]" data-index="2"></i></li>
                </ul>
                <div class="animate animate-fade-in filter-panel-container" v-show="isShowHD">
                    <div class="animate animate-slide-in-down filter-panel">
                        <div class="scroll-container">
                            <div style="max-height: 418px;">
                                <div class="scroller" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                                    <div style="overflow: hidden;">
                                        <div>
                                            <a href="javascript:;" v-for="(item, $index) in options" :class="optionStyle[$index]" :key="$index" :data-id="$index" v-on:mouseenter="changeMenus" :data-keyid="item.value">
                                                <span>{{item.label}}</span>
                                                <i v-show="item.isShow" :class="item.styledata"></i>
                                            </a>
                                        </div>
                                        <div class="item-list-filter-submenu">
                                            <a v-for="(item, $index) in subOptions" :key="$index" href="javascript:void(0);" :data-keyid="item.value" @click="searchDatas" :data-type="deindex">{{item.label}}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="item-list scroll" v-bind:style="styleH">
        <div class="scroll-wappers">
            <router-link v-for="(item, $index) in counselor_list_datas" :key="$index" class="row product-item" :to="`/consultantdetail/${item.id}`">
                <div class="col-left">
                    <div class="major-image">
                        <img src="../static/assets/image/headpic.jpg" alt=""/>
                        <div class="username">
                                    {{item.counselor.nickname}}
                        </div>
                        <div class="fc-gray">
                                    评分:{{item.grade}} 预约:{{item.orderNum}}
                        </div>
                    </div>
                </div>
                <div class="item-info">
                    <span class="item-title">{{item.counselor.intro}}</span>
                    <div class="item-rent-tag">
                        <span class="com-tag">市场营销&nbsp;&nbsp;{{item.counselor.school.name}}</span>
                    </div>
                    <div class="star-price flex justify">
                        <span class="com-age-span">提供服务&nbsp;&nbsp;&nbsp;
                        <sub v-for="(tag, $order) in item.services" :key="$order">{{tag.name}}</sub></span>
                    </div>
                    <span class="com-rent-price-span">¥<em>{{item.fristPrice}}</em><sub>{{item.otherPrice}}</sub>/次</span>
                </div>
            </router-link>
            <infinite-loading direction="bottom" @infinite="infiniteDownHandler"></infinite-loading>
        </div>
    </div>
    <footer-menus></footer-menus>
</div>
</template>

<script type="text/babel">    
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading'
    import footerMenu from './UILayer/Footer.vue'

    export default {
        name: "Consultant",
        components: {
            InfiniteLoading:InfiniteLoading,
            footerMenus:footerMenu
        },
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                counselor_list_datas_info: 'counselor_list_datas_info',
                counselor_data_info: 'counselor_data_info'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
                this.$data.downObjects.complete()
            },
            counselor_list_datas_info: function() {
                this.$data.counselor_list_datas = this.counselor_list_datas_info
                console.log("this.counselor_list_datas_info", this.counselor_list_datas_info)
                if (this.$data.counselor_list_datas.length < 10) {
                    if (this.$data.downObjects.hasOwnProperty("complete")) {
                        this.$data.downObjects.complete()
                    }
                } else {
                    if (this.$data.downObjects.hasOwnProperty("loaded")) {
                        this.$data.downObjects.loaded()
                    }
                }
            },
            counselor_data_info: function () {
                let datas = []
                let pushDatas = []
                let degreeDatas = []
                let specialtyDatas = []
                let tempObj = {}
                let tempChildren = {}
                for (let keys of this.counselor_data_info.background) {
                    if (!!keys.categorys) {
                        tempObj.children = []
                        datas = keys.categorys
                        tempObj.value = keys.id
                        tempObj.label = keys.name
                        tempObj.isShow = true
                        tempObj.fontstyledata = ""
                        tempObj.styledata = "sprite sprite-angle-black-right"
                        for (let key of datas) {
                            tempChildren = {}
                            tempChildren.value = key.id
                            tempChildren.label = key.name
                            tempObj.children.push(tempChildren)
                        }
                    } else {
                        tempObj = {}
                        tempObj.value = keys.id
                        tempObj.isShow = false
                        tempObj.label = keys.name
                    }
                    pushDatas.push(tempObj)
                }
                this.$data.optionsData[2] = pushDatas
                for (let keys of this.counselor_data_info.degree) {
                    if (!!keys.categorys) {
                        tempObj.children = []
                        datas = keys.categorys
                        tempObj.value = keys.id
                        tempObj.label = keys.name
                        tempObj.isShow = true
                        tempObj.styledata = "sprite sprite-angle-black-right"
                        for (let key of datas) {
                            tempChildren = {}
                            tempChildren.value = key.id
                            tempChildren.label = key.name
                            tempObj.children.push(tempChildren)
                        }
                    } else {
                        tempObj = {}
                        tempObj.value = keys.id
                        tempObj.isShow = false
                        tempObj.label = keys.name
                    }
                    degreeDatas.push(tempObj)
                }
                this.$data.optionsData[1] = degreeDatas

                for (let keys of this.counselor_data_info.specialty) {
                    if (!!keys.categorys) {
                        tempObj = {}
                        tempObj.children = []
                        datas = keys.categorys
                        tempObj.value = keys.id
                        tempObj.isShow = true
                        tempObj.label = keys.name
                        tempObj.styledata = "sprite sprite-angle-black-right"
                        for (let key of datas) {
                            tempChildren = {}
                            tempChildren.value = key.id
                            tempChildren.label = key.name
                            tempObj.children.push(tempChildren)
                        }
                    } else {
                        tempObj = {}
                        tempObj.value = keys.id
                        tempObj.isShow = false
                        tempObj.label = keys.name
                    }
                    specialtyDatas.push(tempObj)
                }
                this.$data.optionsData[0] = specialtyDatas
            }
        },
        data() {
            return {
                dataCounter: {},
                styleH: {
                    height:'300px'
                },
                count: 0,
                searchId : {
                    "backgroundId": 0,
                    "degreeId": 0,
                    "specialtyOneId": 0,
                    "specialtyTwoId": 0
                },
                deindex:0,
                MenusStyle:['','',''],
                ArrowStyle:["sprite sprite-angle-black-down", "sprite sprite-angle-black-down", "sprite sprite-angle-black-down"],
                list: [],
                tags: [
                    { name: '标签1', type: 'success' },
                    { name: '标签2', type: 'info' },
                    { name: '标签3', type: 'warning' },
                    { name: '标签4', type: 'danger' }
                ],
                pageIndex: 0,
                options: [],
                optionsData:[],
                optionStyle:[],
                optionIconStyle:[],
                subOptions: [],
                downObjects: {},
                selectedOptions0: [],
                selectedOptions1: [],
                selectedOptions2: [],
                selectedOptions3: [],
                counselor_list_datas: [],
                isShowHD: false,
                token: ''
            }
        },
        mounted() {
            let flowHeight = parseInt(document.body.scrollHeight, 10) - 90
            this.$data.styleH.height = `${flowHeight}px`
            let _self = this
            let userDatas = {}
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
                data.token = userDatas.token
                data.pageIndex = 1
                _self.$data.token = userDatas.token
                _self.$store.dispatch('getCounselorInfo', data)
            }).catch(function(err) {
                console.log(err);
            });
        },
        methods: {
            infiniteDownHandler($state) {
                this.$data.downObjects = $state
                let data = {}
                this.$data.pageIndex += 1
                data.token = this.$data.token
                data.pageIndex = this.$data.pageIndex
                data.searchId = {}
                this.$store.dispatch('getCounselorList', data)
            },
            changeMenus(event) {
                let elements = event.target
                let data = {}
                let index = parseInt(elements.getAttribute("data-id"), 10) || 0
                let keyid = parseInt(elements.getAttribute("data-keyid"), 10) || 0
                for (let i = 0, lens = this.$data.options.length; i < lens; i++) {
                    this.$data.options[i].styledata = "sprite sprite-angle-black-right"
                    this.$data.optionStyle[i] = ["filter-option"]
                }
                this.$data.optionStyle[index] = ["filter-option active"]
                this.$data.options[index].styledata = "sprite sprite-angle-oringin-right"
                this.$data.subOptions = this.$data.options[index].children || []
                this.$data.searchId = {}
                if (this.$data.deindex === 2) {
                    this.$data.searchId.backgroundId = keyid
                    data.searchId = this.$data.searchId
                } else if (this.$data.deindex === 1) {
                    this.$data.searchId.degreeId = keyid
                    data.searchId = this.$data.searchId
                }  else if (this.$data.deindex === 0) {
                    this.$data.searchId.specialtyOneId = keyid
                    this.$data.searchId.specialtyTwoId = 0
                } else {
                    data.searchId = {}
                }
                this.$data.pageIndex = 1
                data.token = this.$data.token
                data.pageIndex = 1
                this.$store.dispatch('getCounselorList', data)
                console.log("main:",this.$data.searchId, this.$data.deindex)
            },
            searchDatas(event) {
                let elements = event.target
                let type = parseInt(elements.getAttribute("data-type"), 10)
                let keyid = parseInt(elements.getAttribute("data-keyid"), 10) || 0
                let data = {}
                if (this.$data.deindex === 2) {
                    this.$data.searchId.backgroundId = keyid
                    data.searchId = this.$data.searchId
                } else if (this.$data.deindex === 1) {
                    this.$data.searchId.degreeId = keyid
                    data.searchId = this.$data.searchId
                }  else if (this.$data.deindex === 0) {
                    this.$data.searchId.specialtyTwoId = keyid
                    data.searchId = this.$data.searchId
                } else {
                    data.searchId = {}
                }
                this.$data.pageIndex = 1
                data.token = this.$data.token
                data.pageIndex = 1
                this.$store.dispatch('getCounselorList', data)
                console.log("sub:",this.$data.searchId)
            },
            showMenus(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute("data-index"), 10) || 0
                this.$data.deindex = index
                this.$data.subOptions = []
                this.$data.isShowHD = !this.$data.isShowHD
                this.$data.MenusStyle = ['','','']
                this.$data.ArrowStyle = ["sprite sprite-angle-black-down", "sprite sprite-angle-black-down", "sprite sprite-angle-black-down"]
                if (!!this.$data.isShowHD) {
                    this.$data.MenusStyle[index] = 'active'
                    this.$data.ArrowStyle[index] = 'sprite sprite-angle-oringin-up'
                    this.$data.options = this.$data.optionsData[index]
                    this.$data.optionStyle.length = 0
                    this.$data.optionIconStyle.length = 0
                    for (let i = 0, lens = this.$data.optionsData[index].length; i < lens; i++) {
                        this.$data.optionStyle[i] = ["filter-option"]
                    }
                }

            },
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>