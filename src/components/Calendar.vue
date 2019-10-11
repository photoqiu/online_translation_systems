<style lang="less" scoped>
.content-wrapper {
    height:100%;
    margin:0;
    padding:0;
    display:block;
}
</style>
<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>事件日历</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{path:'/'}">首页</router-link></li>
                        <li class="breadcrumb-item active">事件日历</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <div class="sticky-top mb-2">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">拖拽内容到日历</h4>
                            </div>
                            <div class="card-body">
                                <div id="external-events">
                                    <div class="external-event bg-success">初译员设定</div>
                                    <div class="external-event bg-warning">审校设定</div>
                                    <div class="external-event bg-info">翻译任务完成</div>
                                    <div class="external-event bg-primary">审校完成</div>
                                    <div class="external-event bg-danger">审校发现错误</div>
                                    <div class="checkbox">
                                        <label for="drop-remove">
                                            <input type="checkbox" id="drop-remove"> 删除
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">创建事件日志</h3>
                            </div>
                            <div class="card-body">
                                <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                                    <ul class="fc-color-picker" id="color-chooser">
                                        <li><a class="text-primary" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-warning" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-success" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-danger" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-muted" href="#"><i class="fas fa-square"></i></a></li>
                                    </ul>
                                </div>
                                <div class="input-group">
                                    <input id="new-event" type="text" class="form-control" placeholder="输入事件标题">

                                    <div class="input-group-append">
                                        <button id="add-new-event" type="button" class="btn btn-primary">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card card-primary">
                        <div class="card-body p-0">
                            <!-- https://github.com/CroudTech/vue-fullcalendar -->
                            <div id="calendar">
                                <full-calendar ref="calendar" :events="events" :config="config" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->
</div>
</template>

<script type="text/babel">
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import 'fullcalendar/dist/locale/zh-cn'
    import FullCalendar from './UILayer/FullCalendar.vue'

    export default {
        name: "CalendarDatas",
        data() {
            return {
                config:{
                    defaultView: "month",
                    weekends: false,
                    drop(...args) {
                        // "vue-full-calendar": "^2.7.0",
                    },
                },
                events: [{
                    title  : 'event1',
                    start  : '2019-10-12',
                }]
            }
        },
        components: {
            fullCalendar:FullCalendar
        },
        methods: {
            refreshEvents() {
                this.$refs.calendar.$emit('refetch-events')
            }
        }

    }
</script>