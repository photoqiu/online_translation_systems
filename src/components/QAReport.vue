<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .bd {
        width:100%;
        height:100%;
        .row {
            width:100%;
            height:100%;
            position:relative;
            h3 {
                width:100%;
                margin: 20px 0 10px 0;
                padding: 0 0 10px 0;
                border-bottom:1px solid #ccc;
                text-align:center;
            }
            .btn-group {
                float:left;
                width:420px;
                position:absolute;
                top:10px;
                right:10px;
            }
            .table_wapper {
                width:100%;
                height:100%;
                .datagrid {
                    width:100%;
                    height:70%;
                }
            }
            .popovers {
                position: absolute;
                right:0;
                top:60px;
                .card_wapper {
                    width:1172px;
                    height:100%;
                    margin: 50px 0 0 0;
                    .card {
                        width:1172px;
                        over-flow:hidden;
                        .card-header {
                            line-height:24px;
                            text-align:left;
                            .el-input {
                                width:360px;
                            }
                        }
                        .card-body {
                            line-height:24px;
                            height:260px;
                            over-flow-y:scroll;
                            table {
                                tr {
                                    td {
                                        text-align:left;
                                        p {
                                            margin: 0;
                                            padding: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="bd">
        <div class="row">
            <div class="table_wapper">
                <h3>QA报告</h3>
                <canvas-datagrid v-bind.prop="grid" class="datagrid"></canvas-datagrid>
                <button type="button" class="btn btn-primary btn-lg float-right">保存报告</button>
            </div>

        </div>
    </div>
</div>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    import canvasDatagrid from 'canvasDatagrid'
    
    export default {
        name: "QAReport",
        componets : {
            canvasDatagrid:canvasDatagrid
        },
        data() {
            return {
                grid: {
                    data: [
                        {'区块名称': '翻译者01', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者02', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者03', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者04', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者05', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者06', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''},
                        {'区块名称': '翻译者07', '数字错误': '', '术语错误': '', '语料契合度': '', '译文被修改比例': '', '禁用语错误': ''}
                    ]
                },
                input_memory: '',
                input_term: '',
                input_fixed: '',
                isMemory:true,
                isFixed:true,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form: {
                    orgname:'',
                    name:'',
                    region:'',
                },
                gridData: [
                    {
                        errornumbers: '12',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '14',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '20',
                        errorname: '错误类型',
                        errordesc: '错别字'
                    }, {
                        errornumbers: '23',
                        errorname: '错误类型',
                        errordesc: '多义词错误'
                    }
                ],
                dialogTableVisible: false,
                isTerm:true
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            assign_part_list_datas: function() {
                console.log("this.assign_part_list_datas : ", this.assign_part_list_datas)
            },
        },
        methods : {
            memoryClick() {
                this.$data.isMemory = !this.$data.isMemory
            },
            fixedClick() {
                this.$data.isFixed = !this.$data.isFixed
            },
            termClick() {
                this.$data.isTerm = !this.$data.isTerm
            }
        },
        mounted() {
            let _self = this
            let datas = 2
            this.$store.dispatch('getPartInfo', datas)
        }
    }
</script>