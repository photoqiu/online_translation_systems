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
            .hd_title {
                width:12%;
                float:left;
                text-algin:right;
            }
            .hd_detail {
                float:left;
                width:88%;
                height:60px;
                line-height:60px;
                .el-select {
                    width:100%;
                    height:40px;
                    line-height:40px;
                    margin:10px 0;
                }
                li {
                    height: 30px;
                    line-height: 24px;
                    margin: 6px 0;
                    .progress {
                        height: 20px;
                        position:relative;
                        .desc {
                            height:20px;
                            font-size:12px;
                            color:#fff;
                            position:absolute;
                            line-height:20px;
                            margin:0;
                            padding:0;
                            top:0;
                            left:4px;
                        }
                    }
                }
            }
        }
    }
    .bd {
        width:100%;
        height:430px;
        .btn-lg {
            margin: 0 0 20px 0;
        }
        table {
            line-height:24px;
            td {
                line-height:24px;    
            }
        }
        .el-input {
            width:180px;
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
            <div class="col">
                <div class="hd_title">进度:</div>
                <div class="hd_detail">
                    <ul>
                        <li>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 60%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="desc">初译：60%</div>
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <div class="progress-bar bg-info" role="progressbar" style="width: 30%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="desc">审校：30%</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <div class="hd_title">筛选:</div>
                <div class="hd_detail">
                    <el-select
                        v-model="filtervalue"
                        multiple
                        style="margin-left: 20px;"
                        placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
    <div class="bd">
        <button type="button" class="btn btn-primary btn-lg float-right" @click="dialogFormVisible=true">添加术语库</button>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                    原文
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        style="width:320px;"
                        v-model="inputsearcharticle">
                    </el-input>
                    </th>
                    <th scope="col">
                    译文
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="inputsearch">
                    </el-input>
                    <i class="fas fa-arrows-alt-h" style="font-size: 24px;"></i>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="far fa-copy"
                        style="width:160px;"
                        v-model="inputcopy">
                    </el-input>
                    </th>
                    <th scope="col">状态</th>
                    <th scope="col">备注</th>
                </tr>
            </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>让我们共同努力，共创美好未来！</td>
                  <td>Let us working together to create a bright future!</td>
                  <td><i class="fas fa-check-circle" style="font-size: 24px;"></i></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>让我们共同努力，共创美好未来！</td>
                  <td>Let us working together to create a bright future!</td>
                  <td><i class="fas fa-check-double" style="font-size: 24px;"></i></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>让我们共同努力，共创美好未来！</td>
                  <td>Let us working together to create a bright future!</td>
                  <td><i class="fas fa-eye" style="font-size: 24px;"></i></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>让我们共同努力，共创美好未来！</td>
                  <td>Let us working together to create a bright future!</td>
                  <td><i class="fas fa-frown" style="font-size: 24px;"></i></td>
                  <td></td>
                </tr>
            </tbody>
        </table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
    <div class="ft">
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-link">区块分析报告</button>
            </div>
        </div>
    </div>
    <el-dialog title="操作数据库" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="原文：" :label-width="formLabelWidth">
                <el-input v-model="form.orginname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="译文：" :label-width="formLabelWidth">
                <el-input v-model="form.dname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新方式：" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="新加到术语库" value="1"></el-option>
                    <el-option label="更新到术语库" value="0"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import canvasDatagrid from 'canvasDatagrid'

    export default {
        name: "EquallyDistributed",
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
                },
                formLabelWidth: '120px',
                form:{},
                dialogFormVisible:false,
                filtervalue:[],
                inputsearcharticle:'',
                inputsearch:'',
                inputcopy:'',
                options:[{
                    value: '选项1',
                    label: '句段状态'
                }, {
                    value: '选项2',
                    label: '未翻译'
                }, {
                    value: '选项3',
                    label: '翻译完成'
                }, {
                    value: '选项4',
                    label: '审校完成'
                }, {
                    value: '选项5',
                    label: '校对完成'
                }, {
                    value: '选项6',
                    label: '重复状态'
                }, {
                    value: '选项7',
                    label: '语料填充'
                }, {
                    value: '选项8',
                    label: '修改状态'
                }, {
                    value: '选项9',
                    label: '被修改'
                }, {
                    value: '选项10',
                    label: '未被修改'
                }, {
                    value: '选项11',
                    label: '备注状态'
                }, {
                    value: '选项12',
                    label: '包含备注'
                }, {
                    value: '选项13',
                    label: '不含备注'
                }, {
                    value: '选项14',
                    label: 'QA状态'
                }, {
                    value: '选项15',
                    label: '带QA提醒'
                }]
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