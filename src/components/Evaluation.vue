<style lang="less" scoped>
    .el-header {
        top:0;
    } 
    .el-footer {
        bottom:0;
    }
    .el-header, .el-footer {
        line-height: 60px;
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        position: fixed;
        left:0;
        right:0;
    }
    .el-main {
        margin: 60px 0;
        padding: 10px 0;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        overflow:hidden;
        .el-row {
            margin: 10px 0 0 0;
            height: 42px;
            line-height: 42px;
            &:last-child {
                margin-bottom: 0;
            }
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            .el-button--primary {
                width:92%;
                margin:20px auto 0;
                display:block;
            }
        }
    }
</style>
<template>
    <el-container>
        <el-header>评价</el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span>满意度评级：</span><el-rate v-model="discuzcode" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text></el-rate>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <el-input type="textarea" :rows="12" placeholder="请输入内容" v-model="textarea"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <el-button type="primary">立即提交</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            
        </el-footer>
    </el-container>
</template>

<script type="text/babel">    
    import $ from 'jQuery'

    export default {
        name: "service",
        components: {
        },
        data() {
            return {
                discuzcode : null,
                textarea: ''
            }    
        },
        mounted() {
        },
        methods: {
            handleClick(tab, event) {
              console.log(tab, event);
            }
        }
    }
</script>