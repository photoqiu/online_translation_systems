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
</style>
<template>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</template>
<script type="text/babel">
    export default {
        name:"App"
    }
</script>