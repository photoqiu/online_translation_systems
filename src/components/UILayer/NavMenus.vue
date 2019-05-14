<style lang="less" scoped>
.nav-menus {
    width: 200px;
    min-height: 400px;
    .el-menu-item  {
        a {
            color:#409EFF;
            text-decoration: none;
        }
        a:hover {
            color:#409ECC;
            text-decoration: none;    
        }
    }
}
</style>
<template>
<div class="nav-menus" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">翻译项目功能列表</span>
            </template>
            <el-menu-item-group>
                <span slot="title">初审</span>
                <el-menu-item index="1-1" :route="{path: '/', activeClass: 'active'}">
                    项目列表
                </el-menu-item>
                <el-menu-item index="1-2">初审审校</el-menu-item>
                <el-menu-item index="1-3" :route="{path: '/statistics', activeClass: 'active'}">
                    稿件分析报告
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="创建项目">
                <el-menu-item index="1-3">基本信息</el-menu-item>
                <el-menu-item index="1-4">稿件分析报告</el-menu-item>
                <el-menu-item index="1-5">项目详情</el-menu-item>
                <el-menu-item index="1-6">稿件分配</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-7">
                <span slot="title">翻译字典</span>
                <el-menu-item index="1-4-1">
                    新建翻译字典
                </el-menu-item>
                <el-menu-item index="1-4-2">
                    编辑翻译字典
                </el-menu-item>
                <el-menu-item index="1-4-3">
                    导入翻译字典
                </el-menu-item>
                <el-menu-item index="1-4-3">
                    查看翻译字典
                </el-menu-item>
            </el-submenu>
            <el-submenu index="1-8">
                <span slot="title">术语库</span>
                <el-menu-item index="1-5-1">
                    新建术语库
                </el-menu-item>
                <el-menu-item index="1-5-2">
                    编辑术语库
                </el-menu-item>
                <el-menu-item index="1-5-2">
                    导入术语库
                </el-menu-item>
                <el-menu-item index="1-5-3">
                    查看术语库
                </el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">进行中翻译任务</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">已完成翻译任务</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">统计翻译</span>
        </el-menu-item>
    </el-menu>
</div>
</template>
<script type="text/babel">

    import $ from 'jQuery'
    
    export default {
        name:"navMenuDatas",
        data() {
            return {
                isCollapse: false
            }
        },
        mounted() {
            this.$data.isCollapse = false
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>