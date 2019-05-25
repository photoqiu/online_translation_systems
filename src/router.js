import Vue from 'vue'
import VueRouter from 'vue-router'
import UserGuide from './components/UserGuide.vue'
import Index from './components/Index.vue'
import Statistics from './components/Statistics.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import CreateProjectBase from './components/CreateProjectBase.vue'
import Translation from './components/Translation.vue'
import ManuScriptAnalysisReport from './components/ManuScriptAnalysisReport.vue'
import Distribution from './components/Distribution.vue'
import EquallyDistributed from './components/EquallyDistributed.vue'
import BlockArticle from './components/BlockArticle.vue'
import Term from './components/Term.vue'
import CreateTerm from './components/CreateTerm.vue'
import EditorTerm from './components/EditorTerm.vue'
import TermList from './components/TermList.vue'
import UploaderTerm from './components/UploaderTerm.vue'
import QAReport from './components/QAReport.vue'
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
            path: '/blockarticle',
            name: 'blockarticle',
            component: BlockArticle
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
        }, {
            path: '/manuanalysisreport',
            name: 'manuanalysisreport',
            component: ManuScriptAnalysisReport
        }, {
            path: '/distribution',
            name: 'distribution',
            component: Distribution
        }, {
            path: '/equallydistributed',
            name: 'equallydistributed',
            component: EquallyDistributed
        }, {
            path: '/term',
            name: 'term',
            component: Term
        }, {
            path: '/createterm',
            name: 'createterm',
            component: CreateTerm
        }, {
            path: '/editorterm',
            name: 'editorterm',
            component: EditorTerm
        }, {
            path: '/termlist',
            name: 'termlist',
            component: TermList
        }, {
            path: '/uploaderterm',
            name: 'uploaderterm',
            component: UploaderTerm
        }, {
            path: '/qareport',
            name: 'qareport',
            component: QAReport
        }
    ]
})
export default router
