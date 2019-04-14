<style lang="less" scoped>
    .el-row {
        margin:0;
        height: 40px;
        line-height: 40px;
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
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
        color:#ffffff;
    }
    .grid-mat {
        margin:10px 0;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height:40px;
        text-align: center;
        padding:0;
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
</style>
<template>
    <div class="instrumentLayout">
        <el-row :gutter="4">
            <el-col :span="6" v-for="(items, index) in  service_sub_menus_data_info" :data-index="items.index" :key="items.id"><div @click="menuSelector" :data-index="items.index" :class="items.style">{{items.name}}</div></el-col>
        </el-row>
    </div>
</template>
<script type="text/babel">
    
    import $ from 'jQuery'
    import VueTypes from 'vue-types'
    import {mapGetters} from 'vuex'

    export default {
        name: "ServiceInstrument",
        props: {
            categoryData: VueTypes.array.def([]).isRequired
        },
        computed: {
            ...mapGetters({
                service_sub_menus_data_info: 'service_sub_menus_data_info'
            })
        },
        watch: {
            service_sub_menus_data_info: function() {
                this.$data.category = this.service_sub_menus_data_info
            },
            categoryData: function(newVal, oldVal) { // watch it
                let datas = []
                this.$data.subMenus = newVal
                for (let keys of newVal) {
                    if (!!keys.isCurrent) {
                        datas[0] = keys.categorys
                        datas[1] = 1
                        this.$store.dispatch('changeServiceSubMenusInfo', datas)
                    }
                }
            }
        },
        methods: {
            menuSelector(event) {
                let eles = event.target
                let datas = []
                let index = parseInt(eles.getAttribute("data-index"), 10)
                for (let keys of this.$data.subMenus) {
                    if (!!keys.isCurrent) {
                        datas[0] = keys.categorys
                        datas[1] = index
                        this.$store.dispatch('changeServiceSubMenusInfo', datas)
                    }
                }
            }
        },
        data() {
            return {
                thisIndex: 0,
                category: [],
                subMenus: [],
                styleActive: {
                    zIndex: 10,
                    left: 0,
                    display: 'block'
                },
                styleMotions: {
                    zIndex: 1,
                    left: 0,
                    display: 'block'
                },
                styleNormal: {
                    zIndex: 1,
                    display: 'none'
                }
            }
        }
    }
</script>