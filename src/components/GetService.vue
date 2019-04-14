<style lang="less" scoped>
    .el-header {
        line-height: 60px;
        top:0;
        left:0;
        right:0;
        background-color: #B3C0D1;
    } 
    .el-footer {
        line-height: 160px;
        bottom:0;
        left:0;
        right:0;
        background-color: #fff;
    }
    .el-header, .el-footer {
        
        color: #333;
        text-align: center;
        position: fixed;
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
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .bg-white {
        background: #fff;
    }
    .price {
        text-align: left;
        width:120px;
        float: left;
    }
    .bg-red {
        background: #f00;
        color: #fff;
    }
    .el-menu-item {
        padding:0 10px;
    }
</style>

<template>
    <el-container>
        <el-header>找服务</el-header>
        <el-main>
            <div class="bg-purple-dark">
                <ul role="menubar" class="el-menu-demo el-menu--horizontal el-menu">
                    <li v-for="item in categoryDatas" v-bind:key="item.id" v-bind:data-index="item.index" role="menuitem" @click="handleClick" tabindex="-1"  v-bind:class="item.style">{{item.name}}</li>
                </ul>
                <div class="line"></div>
            </div>
            <service-instrument v-bind:category-data="categoryDatas"></service-instrument>
            <service-body @showDatasName="updateDatas" v-bind:data-detail="listDatas"></service-body>
            <service-user-messages></service-user-messages>
        </el-main>
        <el-footer :style="footerStyle">
            <service-set-text-bar @wordNumbers="setWordNumbers"></service-set-text-bar>
            <hr />
            <el-row :gutter="20" class="bg-white">
                <el-col :span="16">
                    <div class="grid-content bg-white">
                        <span class="price">￥{{releaPrice}}</span>
                        <el-checkbox v-if="isUsedFaster" v-model="checked" @change="isFaster">加急</el-checkbox>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-red">
                        立即购买
                    </div>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import ServiceInstrument from './UILayer/ServiceInstrument.vue'
    import ServiceBody from './UILayer/ServiceBody.vue'
    import ServiceUserMessages from './UILayer/ServiceUserMessages.vue'
    import ServiceSetTextBar from './UILayer/ServiceSetTextBar.vue'

    export default {
        name: "service",
        components: {
            serviceInstrument:ServiceInstrument,
            serviceBody:ServiceBody,
            serviceUserMessages:ServiceUserMessages,
            serviceSetTextBar:ServiceSetTextBar
        },
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                service_menus_data_info: 'service_menus_data_info',
                service_sub_menus_data_orders : 'service_sub_menus_data_orders',
                service_data_info: 'service_data_info'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("error_datas:", this.error_datas_flags)
            },
            service_menus_data_info: function() {
                this.$data.categoryDatas = this.service_menus_data_info
            },
            service_sub_menus_data_orders: function() {
                console.log("service_sub_menus_data_orders:", this.service_sub_menus_data_orders)
                let price = parseInt(this.service_sub_menus_data_orders.price, 10) //基础价格
                let dprice = parseInt(this.service_sub_menus_data_orders.unitPrice, 10) //单价
                this.$data.minNumbers = parseInt(this.service_sub_menus_data_orders.numMin, 10)
                this.$data.maxNumbers = parseInt(this.service_sub_menus_data_orders.numMax, 10)
                let uprices = 1
                let uprice = 1
                if (!!this.service_sub_menus_data_orders.urgencyFlag) {
                    this.$data.isUsedFaster = true
                    uprice = parseInt(this.service_sub_menus_data_orders.urgencyNum, 10)
                } else {
                    this.$data.isUsedFaster = false
                    uprice = parseInt(this.service_sub_menus_data_orders.urgencyNum, 10)
                }
                this.$data.wordIndexNumbers = this.$data.wordIndexNumbers === 0 ? this.$data.minNumbers : this.$data.wordIndexNumbers
                uprices = !!this.$data.checked ? uprice : 1
                this.$data.releaPrice = (price + (dprice * (this.$data.wordIndexNumbers - this.$data.minNumbers))) * uprices
                this.$data.prices = price
                this.$data.dprices = dprice
                this.$data.uprices = uprice
            },
            service_data_info: function () {
                this.$data.listDatas = this.service_data_info
                this.$store.dispatch('getServiceSubMenusOrderInfo', [this.service_data_info, 0])
            }
        },
        data() {
            return {
                dataCounter: {},
                footerStyle: {
                    height:'160px'
                },
                listDatas: [],
                uprices: 1,
                prices: 1,
                dprices:1,
                minNumbers:0,
                maxNumbers:1,
                releaPrice:1,
                subMenusIndex:0,
                wordIndexNumbers:0,
                priceDatas: '（价格+(单价*单词量)）*加急系数',
                categoryDatas:[],
                subCategoryData: [],
                activeIndex: "1",
                checked: false,
                isUsedFaster:false,
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
            isFaster(event) {
                let uprice = this.$data.checked ? this.$data.uprices : 1
                this.$data.releaPrice = (this.$data.prices + (this.$data.dprices * (this.$data.wordIndexNumbers - this.$data.minNumbers))) * uprice
            },
            updateDatas(data) {
                console.log("index:", data)
                this.$data.subMenusIndex = parseInt(data[1], 10)
                this.$store.dispatch('getServiceSubMenusOrderInfo', data)
            },
            setWordNumbers(numbers) {
                this.$data.wordIndexNumbers = numbers
                this.$data.releaPrice = (this.$data.prices + (this.$data.dprices * (this.$data.wordIndexNumbers - this.$data.minNumbers))) * this.$data.uprices
            },
            handleClick(event) {
                let eles = event.target
                let index = parseInt(eles.getAttribute("data-index"), 10)
                let datas = [this.$data.categoryDatas, index]
                this.$store.dispatch('changeServiceMenusInfo', datas)
            }
        }
    }
</script>