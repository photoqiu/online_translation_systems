<style lang="less">
html, body, .container-fluid, .el-container {
    width:100%;
    height:100%;
    padding:0;
    margin:0;
    font: 14px/1.5 'Hiragino Sans GB','micrlsoft yahei',arial,\5b8b\4f53,sans-serif;
    -webkit-font-smoothing: antialiased;
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
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="javascript:;"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="javascript:;" class="nav-link">Home</a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="javascript:;" class="nav-link">Contact</a>
                </li>
            </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="/" class="brand-link">
                <span class="brand-text font-weight-light">沃资拓-系统</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition">
                <div class="os-resize-observer-host">
                    <div class="os-resize-observer observed" style="left: 0px; right: auto;"></div>
                </div>
                <div class="os-size-auto-observer" style="height: calc(100% + 1px); float: left;">
                    <div class="os-resize-observer observed"></div>
                </div>
                <div class="os-content-glue" style="margin: 0px -8px; width: 249px; height: 904px;"></div>
                <div class="os-padding">
                    <div class="os-viewport os-viewport-native-scrollbars-invisible" style="overflow-y: scroll; right: 0px; bottom: 0px;">
                        <div class="os-content" style="padding: 0px 8px; height: 100%; width: 100%;">
                            <nav class="mt-2">
                                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->
                                    <li class="nav-header">项目</li>
                                    <li class="nav-item has-treeview">
                                        <router-link class="nav-link" :to="{path:'/', activeClass: 'active'}">
                                            <i class="nav-icon fas fa-circle"></i>
                                            <p>
                                                项目列表
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item has-treeview">
                                        <router-link class="nav-link" :to="{path:'/createbase', activeClass: 'active'}">
                                            <i class="nav-icon fas fa-tree"></i>
                                            <p>
                                                新建项目
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item has-treeview">
                                        <router-link class="nav-link" :to="{path:'/', activeClass: 'active'}">
                                            <i class="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                进行中的项目
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item has-treeview">
                                        <router-link class="nav-link" :to="{path:'/', activeClass: 'active'}">
                                            <i class="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                已完成项目
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item has-treeview menu-open">
                                        <a href="#" class="nav-link open">
                                            <i class="nav-icon fas fa-circle"></i>
                                            <p>
                                                语料库
                                                <i class="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/createcorpus', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>新建语料库</p>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/corpuslist', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>语料库列表</p>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item has-treeview menu-open">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fas fa-tree"></i>
                                            <p>
                                                术语库
                                                <i class="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/createterm', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>新建术语库</p>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/termlist', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>术语库列表</p>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item has-treeview menu-open">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                禁用语
                                                <i class="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/createbanned', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>新建禁用语</p>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{path:'/bannedlist', activeClass: 'active'}">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>禁用语列表</p>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                            <!-- /.sidebar-menu -->
                        </div>
                    </div>
                </div>
                <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div class="os-scrollbar-track">
                        <div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px, 0px);"></div>
                    </div>
                </div>
                <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
                    <div class="os-scrollbar-track">
                        <div class="os-scrollbar-handle" style="height: 71.9396%; transform: translate(0px, 0px);"></div>
                    </div>
                </div>
                <div class="os-scrollbar-corner"></div>
            </div>
            <!-- /.sidebar -->
        </aside>
        <div class="content-wrapper" style="height: auto;">
            <router-view></router-view>
        </div>
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