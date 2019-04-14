<style lang="less" scoped>
body.native .tabbar {
  display: none;
}
.row {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: auto;
    display: block;
    zoom: 1;
}
.tabbar {
  height: 49px;
  width: 16rem;
}
.tabbar .com-tips {
  z-index: 10000;
  position: fixed;
  bottom: 70px;
  left: 8rem;
  margin-left: -66px;
}
.tabbar .com-tips .msg {
  width: 100px;
  text-align: center;
  padding: 10px 10px 10px 20px;
}
.tabbar .com-tips .container {
  position: absolute;
  height: 15px;
  width: 30px;
  bottom: -15px;
  overflow: hidden;
  right: 50px;
}
.tabbar-wrapper {
  border-top: 1px solid #ccc;
  height: 49px;
  width: 16rem;
  position: fixed;
  bottom: 0;
  background-color: #fafafa;
  z-index: 999;
}
.tabbar-wrapper .tabbar-item {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: center;
  height: 49px;
  line-height: 49px;
  width: 20%;
  position: relative;
  float: left;
}
.tabbar-wrapper .tabbar-item a {
  text-decoration: none;
  display: block;
  color: rgba(255, 255, 255, 0);
  background-size: 37px auto;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}
.tabbar-wrapper .tabbar-item:nth-child(1) a {
  background-image: url(../../static/assets/image/component/tabbar/home.png);
}
.tabbar-wrapper .tabbar-item:nth-child(2) a {
  background-image: url(../../static/assets/image/component/tabbar/adviser.png);
}
.tabbar-wrapper .tabbar-item:nth-child(3) a {
  background-image: url(../../static/assets/image/component/tabbar/class.png);
}
.tabbar-wrapper .tabbar-item:nth-child(4) a {
  background-image: url(../../static/assets/image/component/tabbar/service.png);
}
.tabbar-wrapper .tabbar-item:nth-child(5) a {
  background-image: url(../../static/assets/image/component/tabbar/profile.png);
}
.tabbar-wrapper .tabbar-item:nth-child(1) a.router-link-exact-active {
  background-image: url(../../static/assets/image/component/tabbar/home_active.png);
}
.tabbar-wrapper .tabbar-item:nth-child(2) a.router-link-exact-active {
  background-image: url(../../static/assets/image/component/tabbar/adviser_active.png);
}
.tabbar-wrapper .tabbar-item:nth-child(3) a.router-link-exact-active {
  background-image: url(../../static/assets/image/component/tabbar/class_active.png);
}
.tabbar-wrapper .tabbar-item:nth-child(4) a.router-link-exact-active {
  background-image: url(../../static/assets/image/component/tabbar/service_active.png);
}
.tabbar-wrapper .tabbar-item:nth-child(5) a.router-link-exact-active {
  background-image: url(../../static/assets/image/component/tabbar/profile_active.png);
}
</style>

<template>
    <div class="tabbar">
        <div class="tabbar-wrapper row">
            <div class="tabbar-item">
                <router-link :to="{path:'/', activeClass: 'active'}"></router-link>
            </div>
            <div class="tabbar-item">
                <router-link :to="{path:'/consultant', activeClass: 'active'}"></router-link>
            </div>
            <div class="tabbar-item">
                <router-link :to="{path:'/course', activeClass: 'active'}"></router-link>
            </div>
            <div class="tabbar-item">
                <a aria-current="false" href="###">
                </a>
            </div>
            <div class="tabbar-item">
                <a aria-current="false" href="/profile">
                </a>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    
    export default {
        name: "footerMenu"
    }
    
</script>