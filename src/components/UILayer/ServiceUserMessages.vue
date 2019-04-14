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
        .mainTitle, .subTitle {
            height:24px;
            line-height: 24px;
            width: 100%;
            text-indent: 1.0em;
            text-align: left;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .subTitle {
            b {
                color:#ff0000;
            }
        }
    }
</style>
<template>
    <div class="scroll" v-bind:style="styleH">
        <div class="mainTitle bg-purple-dark"><b>用户评价</b>（255）</div>
        <div class="subTitle bg-purple-dark">综合评分：<b>4.94分</b></div>
        <div class="scroll-wappers">
            <div class="list-datas" v-for="(item, $index) in list" :key="$index">
               {{item}}
            </div>
            <infinite-loading direction="bottom" @infinite="infiniteDownHandler"></infinite-loading>
        </div>
    </div>
</template>
<script type="text/babel">
    
    import $ from 'jQuery'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: "ServiceUserMessages",
        components: {
            InfiniteLoading:InfiniteLoading
        },
        data() {
            return {
                count: 0,
                page: 1,
                styleH: {
                    height:'300px'
                },
                list: []
            }
        },
        mounted() {
            let flowHeight = parseInt(document.body.scrollHeight, 10) - (200 + 60  + 60 + 61 + 24 + 24)
            this.$data.styleH.height = `${flowHeight}px`
        },
        methods: {
            infiniteUpHandler($state) {
                console.log("updatas")
                setTimeout(() => {
                    for (var i = 0, j = 10; i < j; i++) {
                        this.$data.count++;
                        this.$data.list.unshift(this.$data.count);
                    }
                    $state.loaded();
                    //$state.complete();
                }, 1000);
            },
            infiniteDownHandler($state) {
                console.log("downdatas")
                setTimeout(() => {
                    for (var i = 0, j = 10; i < j; i++) {
                        this.$data.count++;
                        this.$data.list.push(this.$data.count);
                    }
                    $state.loaded();
                    //$state.complete();
                }, 1000);
            }
        }
    }
</script>