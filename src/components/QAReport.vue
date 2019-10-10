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
                .el-table .warning-row {
                    background: oldlace;
                }
                .el-table .success-row {
                    background: #f0f9eb;
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
                <h3>QA报告 - 项目整体报告</h3>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="date"
                        label="文件总计"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="单词数"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="句子数">
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</div>
</template>
<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    
    export default {
        name: "QAReport",
        data() {
            return {
                tableData: [],
                input_memory: '',
                input_term: '',
                input_fixed: '',
                isMemory:true,
                isFixed:true,
                dialogFormVisible:false,
                dialogTableVisible: false,
                isTerm:true
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                get_project_report_datas: 'get_project_report_datas',
                report_file_datas: 'report_file_datas',
                assign_part_list_datas: 'assign_part_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            get_project_report_datas: function() {
                console.log("get_project_report_datas : ", this.get_project_report_datas)
            },
            report_file_datas: function() {
                console.log("report_file_datas : ", this.report_file_datas)
            },
            assign_part_list_datas: function() {
                console.log("this.assign_part_list_datas : ", this.assign_part_list_datas)
            },
        },
        methods : {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        mounted() {
            let _self = this
            let datas = 2
            let data = {}
            data.projectId = this.$route.params.id
            this.$store.dispatch('getPartInfo', datas)
            this.$store.dispatch('getProjectReportDatas', data)
        }
    }
</script>