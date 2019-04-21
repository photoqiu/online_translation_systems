<style lang="less" scoped>
    
</style>
<template>
    <div class="container">
        <el-row :gutter="20">
            <h2>区块分析报告</h2>
                <el-table
                    :data="tableData"
                    :span-method="arraySpanMethod"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="项目名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="世界人口状况报告"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="区块名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="世界人口状况报告-1"
                        width="180">
                    </el-table-column>
                    
                </el-table>

        </el-row>
    </div>
</template>
<script type="text/babel">

    import * as localForage from 'localforage'
    import {mapGetters} from 'vuex'
    export default {
        name: "TakeOrderDetail",
        computed: {
            ...mapGetters({
                error_datas_flags: 'error_datas_flags',
                counselor_data_detail: 'counselor_data_detail',
                extend_score: 'extend_score',
                comment_list_datas : 'comment_list_datas'
            })
        },
        watch: {
            error_datas_flags: function () {
                console.log("user_error_datas:", this.error_datas_flags)
            },
            extend_score: function() {
                this.$data.score = this.extend_score
            },
            comment_list_datas: function() {
                this.$data.commentLens = this.comment_list_datas.length
                this.$data.comments = this.comment_list_datas
                console.log("comment_list_datas:", this.comment_list_datas) 
            },
            counselor_data_detail: function() {
                this.$data.counselor_data_detail_info = this.counselor_data_detail
                console.log("counselor_data_detail:", this.counselor_data_detail)
            }
        },
        data() {
            return {
                styleH: {
                    height:'300px'
                },
                CommentStyleH: {
                    height:'300px'
                },
                input:'',
                token: ''
            }
        },
        mounted() {
            let _self = this
            localForage.getItem('users').then(function(value) {
                let data = {}
                data.id = _self.$route.params.id || 0
                data.token = value.token
                data.pageIndex = 1
                data.uid = value.phone
                _self.$data.token = value.token
                // _self.$store.dispatch('getConsultDetailsInfo', data)
                // _self.$store.dispatch('getCommentList', data)
            }).catch(function(err) {
                console.log(err);
            });
            let flowHeight = parseInt(document.body.scrollHeight, 10) - 60
            this.$data.styleH.height = `${flowHeight}px`
            let commentHeight = flowHeight - 400
            this.$data.CommentStyleH.height = `${commentHeight}px`
            this.$data.dataclass = [
                this.$data.activeClass,
                this.$data.normalClass   
            ]
        },
        methods: {
            getback(event) {
                window.history.back()
            }
        }
    }
</script>