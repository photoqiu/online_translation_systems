import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Statistics from './components/Statistics.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import CreateProjectBase from './components/CreateProjectBase.vue'
import Translation from './components/Translation.vue'
import ReviewTranslation from './components/ReviewTranslation.vue'
import ManuScriptAnalysisReport from './components/ManuScriptAnalysisReport.vue'
import Distribution from './components/Distribution.vue'
import BlockArticle from './components/BlockArticle.vue'
import Term from './components/Term.vue'
import CreateTerm from './components/CreateTerm.vue'
import CreateCorpus from './components/CreateCorpus.vue'
import EditorTerm from './components/EditorTerm.vue'
import TermList from './components/TermList.vue'
import QAReport from './components/QAReport.vue'
import PartList from'./components/PartList.vue'
import CorpusList from './components/CorpusList.vue'
import CorpusDetails from './components/CorpusDetails.vue'
import TermDetails from './components/TermDetails.vue'
import CreateBanned from './components/CreateBanned.vue'
import BlockReviewArticle from './components/BlockReviewArticle.vue'
import BannedList from './components/BannedList.vue'
import BannedDetails from './components/BannedDetails.vue'
import ToDoProject from './components/ToDoProject.vue'
import CompleteProject from './components/CompleteProject.vue'
import CalendarDatas from './components/Calendar.vue'
import NotFound from './components/NotFound.vue'


Vue.use(VueRouter)
//////Collection
const router = new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/notfound'
        }, {
            path: '/createcorpus',
            name: 'CreateCorpus',
            component: CreateCorpus
        }, {
            path: '/calendar',
            name: 'CalendarDatas',
            component: CalendarDatas
        }, {
            path: '/corpusdetails/:id',
            name: 'CorpusDetails',
            component: CorpusDetails
        }, {
            path: '/bannedlist',
            name: 'BannedList',
            component: BannedList
        }, {
            path: '/banneddetails/:id',
            name: 'BannedDetails',
            component: BannedDetails
        }, {
            path: '/createbanned',
            name: 'CreateBanned',
            component: CreateBanned
        }, {
            path: '/termdetails/:id',
            name: 'TermDetails',
            component: TermDetails
        }, {
            path: '/corpuslist',
            name: 'CorpusList',
            component: CorpusList
        }, {
            path: '/',
            name: 'index',
            component: Index
        }, {
            path: '/todolist',
            name: 'todo',
            component: ToDoProject
        }, {
            path: '/comletelist',
            name: 'CompleteProject',
            component: CompleteProject
        }, {
            path: '/statistics',
            name: 'statistics',
            component: Statistics
        }, {
            path: '/blockarticle/:id/:fid',
            name: 'blockarticle',
            component: BlockArticle
        }, {
            path: '/blockreviewarticle/:id/:fid',
            name: 'BlockReviewArticle',
            component: BlockReviewArticle
        }, {
            path: '/partlist/:id/:fid',
            name: 'PartList',
            component: PartList
        }, {
            path: '/projectdetail/:id',
            name: 'projectdetail',
            component: ProjectDetail
        }, {
            path: '/createbase',
            name: 'createbase',
            component: CreateProjectBase
        }, {
            path: '/translation/:id/:fid',
            name: 'translation',
            component: Translation
        }, {
            path: '/reviewtranslation/:id/:fid',
            name: 'reviewtranslation',
            component: ReviewTranslation
        }, {
            path: '/manuanalysisreport',
            name: 'manuanalysisreport',
            component: ManuScriptAnalysisReport
        }, {
            path: '/distribution',
            name: 'distribution',
            component: Distribution
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
            path: '/qareport/:id',
            name: 'qareport',
            component: QAReport
        }
    ]
})
export default router
