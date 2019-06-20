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
.el-form-item__content div.el-progress:last-child {
    margin: 8px 0 0 0;
}
</style>
<template>
    <div class="container-fluid">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1-1" :router="isRouter" :unique-opened="isOpen" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">项目功能列表</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">项目</span>
                                <el-menu-item index="1-1" :route="{path: '/', activeClass: 'active'}">
                                    项目列表
                                </el-menu-item>
                                <el-menu-item index="1-2" :route="{path: '/statistics', activeClass: 'active'}">进行中的项目..</el-menu-item>
                                <el-menu-item index="1-3" :route="{path: '/statistics', activeClass: 'active'}">已完成项目</el-menu-item>
                                <el-menu-item index="1-4" :route="{path: '/qareport', activeClass: 'active'}">
                                    初审审校 稿件分析报告
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="审校相关">
                                <el-menu-item index="1-3-1" :route="{path: '/createbase', activeClass: 'active'}">初审审校</el-menu-item>
                                <el-menu-item index="1-4-1" :route="{path: '/projectdetail', activeClass: 'active'}">稿件分析报告 </el-menu-item>
                                <el-menu-item index="1-5-1" :route="{path: '/equallydistributed', activeClass: 'active'}">稿件分配</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-7">
                                <span slot="title">语料库</span>
                                <el-menu-item index="1-4-1" :route="{path: '/createcorpus', activeClass: 'active'}">
                                    新建语料库
                                </el-menu-item>
                                <el-menu-item index="1-4-2" :route="{path: '/term', activeClass: 'active'}">
                                    编辑语料库
                                </el-menu-item>
                                <el-menu-item index="1-4-4">
                                    导入语料库
                                </el-menu-item>
                                <el-menu-item index="1-4-3" :route="{path: '/term', activeClass: 'active'}">
                                    查看语料库
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-8">
                                <span slot="title">术语库</span>
                                <el-menu-item index="1-5-1" :route="{path: '/createterm', activeClass: 'active'}">
                                    新建术语库
                                </el-menu-item>
                                <el-menu-item index="1-5-2" :route="{path: '/term', activeClass: 'active'}">
                                    编辑术语库
                                </el-menu-item>
                                <el-menu-item index="1-5-2">
                                    导入术语库
                                </el-menu-item>
                                <el-menu-item index="1-5-3" :route="{path: '/term', activeClass: 'active'}">
                                    查看术语库
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-menu>
                </el-aside>
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
                isCollapse: false,
                isRouter:true,
                isOpen:true
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