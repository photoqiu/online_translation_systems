import Vue from 'vue'
import VueRouter from 'vue-router'
import UserGuide from './components/UserGuide.vue'
import Index from './components/Index.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)
//////Collection
const router = new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/notfound'
        }, {
            path: '/userguide',
            name: 'userguide',
            component: UserGuide
        }, {
            path: '/',
            name: 'index',
            component: Index
        }
    ]
})
export default router
