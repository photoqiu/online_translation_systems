import Vue from 'vue'
import VueRouter from 'vue-router'
import UserGuide from './components/UserGuide.vue'
import Index from './components/Index.vue'
import Statistics from './components/Statistics.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import CreateProjectBase from './components/CreateProjectBase.vue'
import Translation from './components/Translation.vue'
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
        }, {
            path: '/statistics',
            name: 'statistics',
            component: Statistics
        }, {
            path: '/projectdetail',
            name: 'projectdetail',
            component: ProjectDetail
        }, {
            path: '/createbase',
            name: 'createbase',
            component: CreateProjectBase
        }, {
            path: '/translation',
            name: 'translation',
            component: Translation
        }
    ]
})
export default router
