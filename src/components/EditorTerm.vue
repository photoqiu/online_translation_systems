<style lang="less" scoped>
.container_bd {
    height:100%;
    display:block;
    .hd {
        width:100%;
        height:120px;
        line-height:50px;
        .row {
            width:100%;
            height:60px;
            line-height:60px;
            .col {
                height:30px;
                line-height:30px;
            }
            .form-group {
                label {
                    width:40%;
                    float:left;
                }
                select {
                    width:60%;
                    float:left;
                }
            }
            .nav {
                width:100%;
                height:30px;
                line-height:30px;
            }
        }
    }
    .bd {
        width:100%;
        height:430px;
        table {
            line-height:24px;
            td {
                line-height:24px;    
            }
        }
    }
    .ft {
        height:10%;
        .list-group {
            line-height:24px;
        }
    }
}
</style>
<template>
<div class="container_bd">
    <div class="hd">
        <div class="row">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#">可视化分配<span class="badge badge-light">2</span></a>
                    
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        均分
                        
                    </a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="selectorder">拆分数量：</label>
                    <select class="form-control" name="selectorder">
                        <option value="1">1</option>
                        <option value="2" selected="true">2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="字数：29991字">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="未分配翻译：2149字">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="未分配审校：2149字">
            </div>
        </div>
    </div>
    <div class="bd">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">翻译字数</th>
                    <th scope="col">审校字数</th>
                    <th scope="col">起止句段</th>
                    <th scope="col">初译译员</th>
                    <th scope="col">审校译员</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>1075</td>
                  <td>1075</td>
                  <td>1-50</td>
                  <td></td>
                  <td></td>
                  <td><i class="fas fa-angle-right" style="font-size: 20px;"></i><button type="button" class="btn btn-link">分配</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>1075</td>
                  <td>1075</td>
                  <td>51-120</td>
                  <td></td>
                  <td></td>
                  <td><i class="fas fa-angle-right" style="font-size: 20px;"></i><button type="button" class="btn btn-link">分配</button></td>
                </tr>
              </tbody>
            </table>
    </div>
    <div class="ft">
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-link">区块分析报告</button>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/babel">    
    import $ from 'jQuery'
    import * as localForage from 'localforage'
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "EquallyDistributed",
        data() {
            return {
                grid: {
                    data: [
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''},
                        {'原文': 'I sincerely hope that our common cause will be successful, and I wish us a bright future!', '状态(未翻译)': '', '初译译员': 'a', '审校译员': ''}
                    ]
                }
            }
        },
        mounted() {
            localForage.getItem('users').then(function(value) {
                let data = {}
                userDatas = value
            }).catch(function(err) {
                console.log(err)
            })
        },
        methods: {
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>