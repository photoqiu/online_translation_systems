let DEBUG = process.env.NODE_ENV === 'production' ? false : true;
let USER_API = 'http://127.0.0.1:9000/atreus/';
// let USER_API = "http://139.129.201.64/atreus/"
// let USER_API = "http://139.129.201.64:8020/atreus//term/v1/list"
const Constant = {
    debug : DEBUG,
    API   : {
        translator             : USER_API + 'translator/v1/list{{pageIndex}}', // 获取译员列表
        industry               : USER_API + 'industry/v1/list?parentId=-1', // 行业列表
        subIndustry            : USER_API + 'industry/v1/list?parentId={{code}}', // 子行业列表
        language               : USER_API + 'language/dic/v1/list', // 语言列表
        customer               : USER_API + 'customer/v1/list?pageNum={{pageIndex}}', // 客户列表
        corpus                 : USER_API + 'corpus/v1/list?pageNum={{pageIndex}}&pageSize={{pageSize}}',
        /////////////////////////////攻略
        fileUpload             : USER_API + 'file/upload',
        fileDetail             : USER_API + 'file/v1/detail',
        termList               : USER_API + 'term/v1/list?pageNum={{pageIndex}}', /// 获取所有术语库数据
        getTermList            : USER_API + 'term/item/v1/list?pageNum={{pageIndex}}', /// 获取术语项列表
        termSave               : USER_API + 'term/v1/save', // 新增术语
        corpusSave             : USER_API + 'corpus/v1/save', // 新增语料
        getStrategyDetail      : USER_API + 'strategy/{{id}}?token={{token}}',
        /////////////////////////////////收藏列表
        getCollectList       : USER_API + 'collect/list?pageIndex={{pageIndex}}&token={{token}}',
        addOnceCollect       : USER_API + 'collect/add/{{id}}?token={{token}}',
        delOnceCollect       : USER_API + 'collect/del/{{id}}?token={{token}}',
        /////////////////////////////////留学攻略
        getCategoryCounselor : USER_API + 'category/counselor?token={{token}}',
        /////////////////////////////////咨询模块
        getCounselorList     : USER_API + 'consult/list?pageIndex={{pageIndex}}&token={{token}}',
        /////////////////////////////////顾问咨询详情
        getConsultDetails    : USER_API + 'consult/{{id}}?token={{token}}',
        ////////////////////////////////订单
        getOrderCounselor    : USER_API + 'category/order?token={{token}}',
        /////////////////////////////////服务
        getServiceList       : USER_API + 'service/list?token={{token}}',
        ////////////////////////////////课程
        getCategoryCourse    : USER_API + 'category/course?token={{token}}',
        getCourseList        : USER_API + 'course/list?pageIndex={{pageIndex}}&token={{token}}',
        getCourseDetails     : USER_API + 'course/{{id}}?token={{token}}',
        /////////////////////////////////评论列表
        getCommentDatas      : USER_API + 'comment/list?pageIndex={{pageIndex}}&token={{token}}'
        
    }
};
export default Constant;
