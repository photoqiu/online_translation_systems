<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .hd {
        width:100%;
        height:120px;
        line-height:50px;
        .row {
            width:100%;
            height:60px;
            line-height:60px;
            .nav {
                width:100%;
                height:30px;
                line-height:30px;
            }
        }
    }
    .bd {
        width:100%;
        height:430px;
        .datagrid {
            width:100%;
            height:400px;
        }
    }
    .ft {
        height:10%;
        .list-group {
            line-height:24px;
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="hd">
        <div class="row">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#">可视化分配</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        均分
                        <span class="badge badge-light">4</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="字数：29991字">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="未分配翻译：2149字">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="未分配审校：2149字">
            </div>
        </div>
    </div>
    <div class="bd">
        <canvas-datagrid v-bind.prop="grid" class="datagrid"></canvas-datagrid>
    </div>
    <div class="ft">
        <div class="row">
            <div class="col">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active">
                        您已选中116字
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">初译-选择译者</a>
                    <a href="#" class="list-group-item list-group-item-action">初译-截止时间</a>
                    <a href="#" class="list-group-item list-group-item-action">审校-选择译者</a>
                    <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">审校-截止时间</a>
                </div>
            </div>
            <div class="col">
                <button type="button" class="btn btn-link">区块分析报告</button>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import canvasDatagrid from 'canvasDatagrid'

    export default {
        name: "Distribution",
        componets : {
            canvasDatagrid:canvasDatagrid
        },
        data() {
            return {
                grid: {
                    data: [
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''}
                    ]
                }
            }
        },
        mounted() {
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
            }).catch(function(err) {
                console.log(err)
            })
        },
        methods: {
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>