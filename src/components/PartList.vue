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
    <el-row :gutter="10">
        <el-col :span="12">
            <h3>区块详情</h3>
        </el-col>
    </el-row>

    <el-table
        :data="tableData"
        border
        style="width:1430"
        height="550">
        <el-table-column
          fixed
          prop="projectname"
          label="项目名称"
          width="420">
        </el-table-column>
        </el-table-column>  
        <el-table-column
          prop="partid"
          label="区块Id"
          width="220">
        </el-table-column>
        <el-table-column
          prop="language"
          label="语言"
          width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="区块起止时间"
          width="240">
        </el-table-column>
        <el-table-column
          prop="numsdata"
          label="翻译起始句"
          width="220">
        </el-table-column>
        <el-table-column
          fixed="fyname"
          label="翻译人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fyprocess"
          label="翻译进度"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="sxname"
          label="审校人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sxprocess"
          label="审校完成进度"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="pmname"
          label="项目经理"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button @click="handlePartClick(scope.row)" type="text" size="small">查看翻译</el-button>
            <el-button @click="handleReviewersClick(scope.row)" type="text" size="small">查看审校</el-button>
          </template>
        </el-table-column>
      </el-table>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "PartList",
        data() {
            return {
                pageIndex : 1,
                totalPage:0,
                tableData: [],
                project_indexpage : 1
            }
        },
        computed: {
            ...mapGetters({
                error_datas: 'error_datas',
                users_list_datas: 'users_list_datas',
                part_sentence_list_datas: 'part_sentence_list_datas',
                project_detail_datas: 'project_detail_datas',
                project_list_datas: 'project_list_datas'
            })
        },
        watch: {
            error_datas: function () {
                console.log("error_datas:", this.error_datas)
            },
            users_list_datas: function() {
                for (let keys of this.users_list_datas.list) {
                    if(keys.roleId <= 2 && keys.status === 1) {
                        keys.json_datas = JSON.stringify(keys)
                        this.$data.project_datas.push(keys)
                    }
                }
                if (!!this.users_list_datas.isLastPage) {
                    return false
                }
                this.$data.project_indexpage += 1
                this.$store.dispatch('getUsersInfo', this.$data.project_indexpage)
            },
            part_sentence_list_datas: function() {
                let datas = {}
                for (let keys of this.part_sentence_list_datas) {
                    datas = {}
                    datas.projectname = ''
                    datas.date = `${keys.startTime}~${keys.endTime}`
                    datas.pmname = ''
                    datas.fyname = keys.translator === null ? "暂无" : keys.translator.name
                    datas.sxname = keys.reviewer === null ? "暂无" : keys.reviewer.name
                    datas.numsdata = `${keys.partBegin}~${keys.partEnd}`
                    datas.language = ''
                    datas.fyprocess = keys.translateWordCount
                    datas.sxprocess = keys.reviewWordCount
                    datas.partid = keys.id
                    this.$data.tableData.push(datas)
                }
                let dataid = this.$route.params.id || 1
                this.$store.dispatch('getPorjectDetails', dataid)
            },
            project_detail_datas: function() {
                for (let keys of this.$data.tableData) {
                    keys.pmname = this.project_detail_datas.projectManager.nickName
                    keys.projectname = this.project_detail_datas.projectName
                    keys.language = `${this.project_detail_datas.languageFrom}~${this.project_detail_datas.languageTo}`
                }
            },
            project_list_datas: function() {
                this.$data.totalPage = this.project_list_datas.navigateLastPage
                let datas = {}
                this.$data.tableData = []
                for (let keys of this.project_list_datas.list) {
                    datas = {}
                    datas.date = `${keys.startTime}~${keys.endTime}`
                    datas.name = `${keys.customer.customerName}`
                    datas.pmname = `${keys.projectManager.nickName}`
                    datas.projectname = `${keys.projectName}`
                    datas.qkname = `${keys.projectName}`
                    datas.language = `${keys.languageFrom}->${keys.languageTo}`
                    datas.wordnumbers = `${keys.wordCount}`
                    datas.baseId = `${keys.id}`
                    if (keys.translateProgress === null) {
                        datas.process = `0%`
                    } else {
                        datas.process = `${keys.translateProgress}%`
                    }
                    this.$data.tableData.push(datas)
                }
                console.log("project_list_datas : ", this.project_list_datas)
            }
        },
        mounted() {
            let fid = this.$route.params.fid || 1
            let partInfoArguments = `?projectFileId=${fid}`
            this.$store.dispatch('getPartSentenceList', partInfoArguments)
        },
        methods: {
            handleClick(row) {
                window.location.href = `/#/blockarticle/${this.$route.params.id}`
            },
            handlePartClick(row) {
                window.location.href = `/#/translation/${row.partid}/${this.$route.params.id}`
            },
            handleReviewersClick(row) {
                window.location.href = `/#/reviewtranslation/${row.partid}/${this.$route.params.id}`
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