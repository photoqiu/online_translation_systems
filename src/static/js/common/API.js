let DEBUG = process.env.NODE_ENV === 'production' ? false : true;
let USER_API = DEBUG ? 'http://127.0.0.1:9000/' : 'http://127.0.0.1:9000/';
// let USER_API = "http://132.232.35.109/"
const Constant = {
    debug : DEBUG,
    API   : {
        sendCode             : USER_API + 'login/send/code',
        login                : USER_API + 'login/to',
        logout               : USER_API + 'login/out',
        /////////////////////////////首页
        getBanner            : USER_API + 'banner/{{location}}?token={{token}}',
        getRecommendDatas    : USER_API + 'recommend/list?pageIndex={{pageIndex}}&token={{token}}',
        /////////////////////////////攻略
        getCategoryService   : USER_API + 'category/service?token={{token}}',
        getCategoryStrategy  : USER_API + 'category/strategy?token={{token}}',
        getStrategyDetail    : USER_API + 'strategy/{{artcleId}}?token={{token}}',
        getStrategyList      : USER_API + 'strategy/list?pageIndex={{pageIndex}}&token={{token}}',
        getStrategyDetail    : USER_API + 'strategy/{{id}}?token={{token}}',
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
