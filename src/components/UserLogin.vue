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
                margin:0 auto;
                display:block;
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
                    <el-input v-model="phones" maxlength="11" minlength="10" type="tel" placeholder="注册手机号" clearable></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <el-input v-model="code" type="text" placeholder="验证码"></el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-button v-on:click="sendCode">发送验证码</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <el-checkbox v-model="checked">同意本站注册条款</el-checkbox>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-alert v-show="isError" title="错误提示的文案" type="error" show-icon></el-alert>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" v-on:click="userLogin">登录</el-button>
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
    import Constant from '../static/js/common/API'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "UserLogin",
        computed: {
            ...mapGetters({
                user_code_datas: 'user_code_datas',
                user_models_datas: 'user_models_datas',
                user_error_datas: 'user_error_datas'
            })
        },
        data() {
            return {
                checked: true,
                isError: false,
                labelPosition: 'right',
                phones : '',
                code : ''
            }    
        },
        watch: {
            user_code_datas: function () {
                console.log("user_code_datas:", this.user_code_datas)
            },
            user_models_datas: function () {
                localForage.setItem('users', this.user_models_datas).then(function () {
                    return localForage.getItem('users');
                }).then(function (value) {
                    // we got our value
                    localForage.setItem('users', value)
                }).catch(function (err) {
                    // we got an error
                    localForage.setItem('users', '')
                })
            },
            user_error_datas: function() {
                console.log("user_error_datas:", this.user_error_datas)  
            }
        },
        methods: {
            sendCode() {
                let phones = this.$data.phones
                let data = {}
                data.phone = phones
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(phones))) {
                    this.$data.isError = true
                } else {
                    this.$store.dispatch('sendUserCode', data)
                }
            },
            userLogin() {
                let phones = this.$data.phones
                let code = this.$data.code
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(phones))) {
                    this.$data.isError = true
                    return false;
                } 
                if (code.length < 6) {
                    this.$data.isError = true
                    return false;
                }
                if (!this.$data.checked) {
                    this.$data.isError = true
                    return false;
                }
                let data = {}
                data.phone = phones
                data.validateCode = code
                this.$store.dispatch('userModelsInfo', data)
            },
            handleClick(tab, event) {
              console.log(tab, event);
            }
        }
    }
</script>