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
.content-wrapper {
    overflow:scroll;
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
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="#" class="nav-link">Contact</a>
                </li>
            </ul>

            <!-- SEARCH FORM -->
            <form class="form-inline ml-3">
                <div class="input-group input-group-sm">
                    <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-navbar" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Messages Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-comments"></i>
                        <span class="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" class="dropdown-item">
                            <!-- Message Start -->
                            <div class="media">
                                <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                                <div class="media-body">
                                    <h3 class="dropdown-item-title">
                          Brad Diesel
                          <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                        </h3>
                                    <p class="text-sm">Call me whenever you can...</p>
                                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <!-- Message Start -->
                            <div class="media">
                                <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                                <div class="media-body">
                                    <h3 class="dropdown-item-title">
                          John Pierce
                          <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                        </h3>
                                    <p class="text-sm">I got your message bro</p>
                                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <!-- Message Start -->
                            <div class="media">
                                <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                                <div class="media-body">
                                    <h3 class="dropdown-item-title">
                          Nora Silvester
                          <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                        </h3>
                                    <p class="text-sm">The subject goes here</p>
                                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                </li>
                <!-- Notifications Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-users mr-2"></i> 8 friend requests
                            <span class="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-file mr-2"></i> 3 new reports
                            <span class="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                        <i class="fas fa-th-large"></i>
                    </a>
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
                                    <li class="nav-item has-treeview">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fas fa-circle"></i>
                                            <p>
                                                语料库
                                                <i class="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                    </li>
                                    <li class="nav-item has-treeview">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fas fa-tree"></i>
                                            <p>
                                                术语库
                                                <i class="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                    </li>
                                    <li class="nav-item has-treeview">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                禁用语
                                                <i class="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
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
        <div class="content-wrapper" style="min-height:1503.19px;height: auto;">
            <router-view></router-view>
        </div>
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
                                <el-menu-item index="1-1" :route="{path: '/', activeClass: 'active'}">
                                    项目列表
                                </el-menu-item>
                                <el-menu-item index="1-1-1" :route="{path: '/createbase', activeClass: 'active'}">新建项目</el-menu-item>
                                <el-menu-item index="1-2" :route="{path: '/', activeClass: 'active'}">进行中的项目..</el-menu-item>
                                <el-menu-item index="1-3" :route="{path: '/', activeClass: 'active'}">已完成项目</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-7">
                                <span slot="title">语料库</span>
                                <el-menu-item index="1-7-1" :route="{path: '/createcorpus', activeClass: 'active'}">
                                    新建语料库
                                </el-menu-item>
                                <el-menu-item index="1-7-2" :route="{path: '/corpuslist', activeClass: 'active'}">
                                    语料库-列表
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-8">
                                <span slot="title">术语库</span>
                                <el-menu-item index="1-8-1" :route="{path: '/createterm', activeClass: 'active'}">
                                    新建术语库
                                </el-menu-item>
                                <el-menu-item index="1-8-2" :route="{path: '/termlist', activeClass: 'active'}">
                                    术语库-列表
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-9">
                                <span slot="title">禁用语</span>
                                <el-menu-item index="1-9-1" :route="{path: '/createbanned', activeClass: 'active'}">
                                    新建禁用语
                                </el-menu-item>
                                <el-menu-item index="1-9-2" :route="{path: '/bannedlist', activeClass: 'active'}">
                                    禁用语-列表
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-menu>
                </el-aside>
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