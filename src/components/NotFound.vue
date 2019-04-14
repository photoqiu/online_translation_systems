<style lang="less" scoped>
.recenter {
    color:#f00;
    font-size:5rem;
}
.center {
    width:100%;
    display: block;
    text-align: center;
}
</style>
<template>
    <main role="main" class="container">
        <h1 class="mt-5 fa fa-exclamation-triangle recenter center" aria-hidden="true"></h1>
        <h1 class="mt-5 center">DOCUMENT NOT FOUND</h1>
        <p class="lead center">Sorry, you do not have access to this document.</p>
        <p class="center">Please email <a v-bind:href="maildatas" target="_top">Palantir Support for access.</a></p>
    </main>
</template>
<script type="text/babel">
    import $ from 'jQuery'

    export default {
        name: "NotFound",
        data() {
            return {
                maildatas : ''
            }
        },
        mounted() {
            let pagerefure = window.document.referrer || window.location.href
            this.$data.maildatas = `mailto:qiubo2@lenovo.com?cc=yanghc2@lenovo.com&subject=DOCUMENT%20NOT%20FOUND&body=the%20not%20found%20url%20is%20:%20${pagerefure}`
            console.log(this.$data.maildatas)
        }
    }
</script>
