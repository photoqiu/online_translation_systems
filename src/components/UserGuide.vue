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
        padding: 0;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        .el-row {
            margin: 10px 0 0 0;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            text-align: left;
            text-indent: 2em;
            height: 42px;
            line-height: 42px;
            i {
                width: 22%;
                font-weight: bold;
                height: 42px;
                line-height: 42px;
                float: right;
            }
            &:last-child {
                margin-bottom: 0;
            }
            &:after {
                content: '';
                display: block;
                clear: both;
            }
        }
    }

</style>

<template>
    <el-container>
        <el-header>会员中心</el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        登陆/注册<i class="el-icon-arrow-right"></i>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        我的订单<i class="el-icon-arrow-right"></i>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        我的收藏<i class="el-icon-arrow-right"></i>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        联系客服<i class="el-icon-arrow-right"></i>
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
                dataCounter: {},
                activeIndex: "1",
                checked: false,
                activeName: 'second'
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