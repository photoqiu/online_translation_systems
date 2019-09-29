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
                    <el-form-item label="机构名称:">
                        <el-select v-model="form.search_text" placeholder="请选择机构名称">
                            <el-option
                                v-for="(item, $index) in customer_datas"
                                :key="$index"
                                :data-datas="item.json_datas"
                                :label="item.organName"
                                :value="item.json_datas">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="一级行业">
                        <el-select v-model="form.industry1" filterable @change="getOneLevelDatas" placeholder="请选择">
                            <el-option
                              v-for="item in main_industry_models_0"
                              :key="item.code"
                              :data-id="item.id"
                              :label="item.name"
                              :value="item.json_data">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级行业">
                        <el-select v-model="form.industry2" filterable @change="getTwoLevelDatas" placeholder="请选择">
                            <el-option
                              v-for="item in sub_industry_models_1"
                              :key="item.code"
                              :data-id="item.id"
                              :label="item.name"
                              :value="item.json_data">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="三级行业">
                        <el-select v-model="form.industry3" filterable @change="getThereLevelDatas" placeholder="请选择">
                            <el-option
                              v-for="item in sub_industry_models_2"
                              :key="item.code"
                              :data-id="item.id"
                              :label="item.name"
                              :value="item.json_data">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="四级行业">
                        <el-select v-model="form.industry4" filterable placeholder="请选择">
                            <el-option
                              v-for="item in sub_industry_models_3"
                              :key="item.code"
                              :data-id="item.id"
                              :label="item.name"
                              :value="item.json_data">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="submitdatas">查询</el-button>
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
                    industry1:'',
                    industry2:'',
                    industry3:'',
                    industry4:'',
                    status:""
                },
                project_datas: [],
                tableData: [],
                pageIndex : 1,
                pageSize: 30,
                customer_datas: [],
                customer_indexpage: 1,
                listPageIndex: 1,
                main_industry_models_0 : [],
                sub_industry_models_1 : [],
                sub_industry_models_2 : [],
                sub_industry_models_3 : [],
                sub_industry_models_4 : [],
                industry1:[],
                industry2:[],
                industry3:[],
                pageIndex: 1,
                totalPage:0,
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                customer_info_datas:'customer_info_datas',
                main_industry_models_datas: 'main_industry_models_datas',
                sub_one_industry_models_datas: 'sub_one_industry_models_datas',
                sub_two_industry_models_datas: 'sub_two_industry_models_datas',
                sub_there_industry_models_datas: 'sub_there_industry_models_datas',
                corpus_list_datas: 'corpus_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            main_industry_models_datas: function() {
                this.$data.main_industry_models_0 = this.main_industry_models_datas
            },
            sub_one_industry_models_datas: function() {
                this.$data.sub_industry_models_1 = this.sub_one_industry_models_datas
            },
            sub_two_industry_models_datas: function() {
                this.$data.sub_industry_models_2 = this.sub_two_industry_models_datas
            },
            sub_there_industry_models_datas: function() {
                this.$data.sub_industry_models_3 = this.sub_there_industry_models_datas
            },
            customer_info_datas: function() {
                for (let keys of this.customer_info_datas.list) {
                    this.$data.customer_datas.push(keys)
                }
                if (!!this.customer_info_datas.isLastPage) {
                    return false
                }
                this.$data.customer_indexpage += 1
                this.$store.dispatch('getCustomerInfo', this.$data.customer_indexpage)
            },
            corpus_list_datas: function() {
                this.$data.totalPage = this.corpus_list_datas.corpusList.pages
                let datas = {}
                this.$data.tableData = []
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
            this.$store.dispatch('getCustomerInfo', 1)
            this.$store.dispatch('getIndustryInfo', '')
        },
        methods: {
            handleClick(row) {
                console.log(row)
                window.location.href = `/atreus/#/blockarticle/${row.baseId}`
            },
            submitdatas(event) {
                let datas = {}
                let jsonDatas = {}
                datas.arguments = ''
                if (!!this.$data.form.search_text) {
                    jsonDatas = JSON.parse(this.$data.form.search_text)
                    datas.arguments += `organId=${jsonDatas.organId}`
                }
                if (!!this.$data.form.industry1) {
                    jsonDatas = JSON.parse(this.$data.form.industry1)
                    datas.arguments += `&industry1=${jsonDatas.code}`
                }
                if (!!this.$data.form.industry2) {
                    jsonDatas = JSON.parse(this.$data.form.industry2)
                    datas.arguments += `&industry2=${jsonDatas.code}`
                }
                if (!!this.$data.form.industry3) {
                    jsonDatas = JSON.parse(this.$data.form.industry3)
                    datas.arguments += `&industry3=${jsonDatas.code}`
                }
                if (!!this.$data.form.industry4) {
                    jsonDatas = JSON.parse(this.$data.form.industry4)
                    datas.arguments += `&industry4=${jsonDatas.code}`
                }
                datas.pageIndex = this.$data.pageIndex
                this.$store.dispatch('getQueryCorpusList', datas)
            },
            handleDetailClick(row) {
                console.log(row, `/atreus/#/corpusdetails/${row.id}`)
                window.location.href = `/atreus/#/corpusdetails/${row.id}`
                return false
            },
            getOneLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry1)
                this.$store.dispatch('getOneIndustryInfo', datas.code)
            },
            getTwoLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry2)
                this.$store.dispatch('getTwoIndustryInfo', datas.code)
            },
            getThereLevelDatas(event) {
                let datas = JSON.parse(this.$data.form.industry3)
                this.$store.dispatch('getThereIndustryInfo', datas.code)
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