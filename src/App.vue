<style lang="less">
html, body, .container-fluid, .el-container {
    width:100%;
    height:100%;
    padding:0;
    margin:0;
    font: 14px/1.5 'Hiragino Sans GB','micrlsoft yahei',arial,\5b8b\4f53,sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow:hidden;
}
ul, li{padding:0;margin:0;list-style: none;}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}  
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}  
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
body > .el-container {
    height:100%;
}
.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}  
.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu-item a {
    color:#409EFF;
    text-decoration: none;
}
.el-menu-item a:hover {
    color:#409ECC;
    text-decoration: none;
}
</style>
<template>
    <div class="container-fluid">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">项目列表</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">初审</span>
                            <el-menu-item index="1-1">初审审校</el-menu-item>
                            <el-menu-item index="1-2">稿件分析报告</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="创建项目">
                            <el-menu-item index="1-3">基本信息</el-menu-item>
                            <el-menu-item index="1-3">稿件分析报告</el-menu-item>
                            <el-menu-item index="1-3">项目详情</el-menu-item>
                            <el-menu-item index="1-3">稿件分配</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">
                                <router-link :to="{path:'/', activeClass: 'active'}">编辑翻译字典</router-link>
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
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script type="text/babel">
    export default {
        name:"App",
        data() {
            return {
                isCollapse: false
            }
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