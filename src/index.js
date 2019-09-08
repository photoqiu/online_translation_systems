import Vue from 'vue'
////////////////////////////////////////////////
import { sync } from 'vuex-router-sync'
import Constant from './static/js/common/API'
import localforage from 'localforage'
import VueI18n from 'vue-i18n'
import VueLogger from 'vuejs-logger'
import VueTimeago from 'vue-timeago'
import moment from 'moment'
import canvasDatagrid from 'canvasDatagrid'
import VueWorker from 'vue-worker'
import router from './router.js'
import store from './vuex/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Grid from 'vueCanvasGrid'
import App from './App.vue'


Vue.config.debug = Constant.debug
Vue.config.ignoredElements = ['canvas-datagrid'];
const options = {
    // optional : defaults to true if not specified
    isEnabled: true,
    // required ['debug', 'info', 'warn', 'error', 'fatal']
    logLevel : 'debug',
    // optional : defaults to false if not specified
    stringifyArguments : false,
    // optional : defaults to false if not specified
    showLogLevel : false,
    // optional : defaults to false if not specified
    showMethodName : false,
    // optional : defaults to '|' if not specified
    separator: '|',
    // optional : defaults to false if not specified
    showConsoleColors: false
}
// https://elemefe.github.io/v-charts/#/props
// this registers `store.state.route`

Vue.use(VueLogger, options)
Vue.use(VueWorker)
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja'),
  }
})

Vue.use(ElementUI)

sync(store, router)
localforage.config({
    driver      : localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
    name        : 'photoqiu_local',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'alphanumeric', // Should be alphanumeric, with underscores.
    description : 'photoqiu is localstorage.'
})
console.log("enter viewer datas.")
Vue.component('grid', Grid)
const app = new Vue({
  router,
  store,
  ...App
}).$mount('#app')
