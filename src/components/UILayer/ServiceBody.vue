<style lang="less" scoped>
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
                position: relative;
                i {
                    display: none;
                }
            }

            .selecotred {
                border: 1px solid #f00 !important;
                i {
                    display: block;
                    position: absolute;
                    color: #f00;
                    top: 3px;
                    right: 3px;
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
</style>
<template>
    <div class="scroll" v-bind:style="styleH">
        <div class="scroll-wappers">
            <div v-for="(item, $index) in list" :key="$index" @click="selectorService" :data-index="$index" :class="item.style">
                <i class="el-icon-check"></i>
               {{item.title}}
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    
    import $ from 'jQuery'
    import VueTypes from 'vue-types'
    import {mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: "ServiceBody",
        components: {
            InfiniteLoading:InfiniteLoading
        },
        props: {
            dataDetail: VueTypes.array.def([]).isRequired
        },
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                service_sub_data_info: 'service_sub_data_info'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("error_datas:", this.error_datas_flags)
            },
            service_sub_data_info: function() {
                this.$data.list = this.service_sub_data_info
            },
            dataDetail: function(newVal, oldVal) {
                let datas = []
                datas[0] = newVal
                datas[1] = 0
                this.$data.list = newVal
                this.$store.dispatch('getChangeServiceInfo', datas)
            }
        },
        data() {
            return {
                count: 0,
                page: 1,
                styleH: {
                    height:'200px'
                },
                list: [1,2,3]
            }
        },
        methods: {
            selectorService(event) {
                let elements = event.target
                let index = parseInt(elements.getAttribute('data-index'), 10)
                let datas = []
                datas[0] = this.$data.list
                datas[1] = index
                this.$emit("showDatasName", datas)
                this.$store.dispatch('getChangeServiceInfo', datas)
            }
        }
    }
</script>