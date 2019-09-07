<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
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
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-select {
        float:left;
        width:100%;
    }
    .el-table th {
        max-height:30px;
    }
    .el-table {
        width:1430px;
        line-height:20px;
    }
    .el-pagination {
        margin:20px 0 0 0;
        float:right;
    }
}
</style>
<template>
<div class="container_bd">
    <el-row :gutter="20">
        <el-col :span="12">
            <div class="grid-content">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="语料库名称:">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="form.search_text"></el-input>
                    </el-form-item>

                    <el-form-item label="项目经理:">
                        <el-select v-model="form.region_users" placeholder="请选择项目经理">
                            <el-option
                                v-for="(item, $index) in project_datas"
                                :key="$index"
                                :data-datas="item.json_datas"
                                :label="item.nickName"
                                :value="item.json_datas">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态:">
                        <el-select v-model="form.status" placeholder="请选择项目状态">
                            <el-option label="未进行" value="shanghai"></el-option>
                            <el-option label="进行中" value="beijing"></el-option>
                            <el-option label="审核校对" value="beijing"></el-option>
                            <el-option label="已完成" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">语料库列表</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <router-link class="btn btn-outline-info" role="button" :to="{path:'/createbase'}">新建项目</router-link>
                </div>
            </div>
        </div>
    </el-row>
    <el-table
        :data="tableData"
        border
        style="width:1430"
        height="550">
        <el-table-column
          fixed
          prop="corpusName"
          label="语料库名称"
          width="420">
        </el-table-column>
        <el-table-column
          prop="language"
          label="语言"
          width="120">
        </el-table-column>
        <el-table-column
          prop="levelName"
          label="语言级别"
          width="90">
        </el-table-column>
        <el-table-column
          prop="organName"
          label="从属行业名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="行业分类"
          width="440">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button @click="handleDetailClick(scope.row)" type="text" size="small">修改/查看</el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="totalPage">
    </el-pagination>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "TermList",
        data() {
            return {
                form : {
                    search_text: "",
                    region_users: "",
                    status:""
                },
                project_datas: [],
                tableData: [],
                pageIndex : 1,
                pageSize: 30,
                totalPage:0,
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                corpus_list_datas: 'corpus_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            corpus_list_datas: function() {
                this.$data.totalPage = this.corpus_list_datas.corpusList.pages
                let datas = {}
                for (let keys of this.corpus_list_datas.corpusList.list) {
                    datas = {}
                    datas.id = keys.id
                    datas.corpusName = keys.corpusName
                    if (keys.corpusLevel === 3) {
                        datas.levelName = "参考级"
                    } else if (keys.corpusLevel === 2) {
                        datas.levelName = "标准级"
                    } else if (keys.corpusLevel === 1) {
                        datas.levelName = "权威级"
                    }
                    datas.language = `${keys.languageFrom} ~ ${keys.languageTo}` 
                    datas.organName = keys.organ.organName
                    datas.industry = `${keys.industry1.name}->${keys.industry2.name}->${keys.industry3.name}->${keys.industry4.name}`
                    this.$data.tableData.push(datas)
                }
                console.log("this.tableData : ", this.$data.tableData)
                if (!!this.corpus_list_datas.corpusList.isLastPage) {
                    return false
                }
                this.$data.pageIndex += 1
                this.$store.dispatch('getCorpusList', this.$data.pageIndex)
            }
        },
        mounted() {
            this.$store.dispatch('getCorpusList', this.$data.pageIndex)
        },
        methods: {
            handleClick(row) {
                console.log(row)
                window.location.href = `/#/blockarticle/${row.baseId}`
            },
            handleDetailClick(row) {
                console.log(row, `/#/corpusdetails/${row.id}`)
                window.location.href = `/#/corpusdetails/${row.id}`
                return false
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>