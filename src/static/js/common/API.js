let DEBUG = process.env.NODE_ENV === 'production' ? false : true;
let USER_API = 'http://127.0.0.1:9000/atreus/'
// let USER_API_HD = 'http://127.0.0.1:9000/';
// let USER_API = "http://139.129.201.64/atreus/"
// let USER_API = "http://139.129.201.64:8020/atreus/user/v1/list?pageNum=1"
const Constant = {
    debug : DEBUG,
    API   : {
        translator             : USER_API + 'translator/list{{pageIndex}}', // 获取译员列表
        industry               : USER_API + 'industry/list?parentId=-1', // 行业列表
        subIndustry            : USER_API + 'industry/list?parentId={{code}}', // 子行业列表
        language               : USER_API + 'language/dic/list', // 语言列表
        customer               : USER_API + 'customer/list?pageNum={{pageIndex}}', // 客户列表
        corpus                 : USER_API + 'corpus/list?pageNum={{pageIndex}}&pageSize={{pageSize}}',
        getUsers               : USER_API + 'user/list?pageNum={{pageIndex}}',
        ////////////////////////////////////////////////////////////////////////////////////////
        getFilePartList        : USER_API + 'part/assign/list?projectFileId={{projectFileId}}', //区块分配接口,返回某文件的全部句子
        partSave               : USER_API + 'part/save', //保存区块分配结果
        getPartList            : USER_API + 'part/list?projectFileId={{projectFileId}}&projectId={{projectId}}', //区块列表
        getPartDetails         : USER_API + 'part/detail?partId={{partId}}', // 区块详情获取单个区块内容 /
        /////////////////////////////攻略
        fileUpload             : USER_API + 'file/upload',
        fileDetail             : USER_API + 'file/detail',
        termList               : USER_API + 'term/list?pageNum={{pageIndex}}', /// 获取所有术语库数据
        getTermList            : USER_API + 'term/item/list?pageNum={{pageIndex}}', /// 获取术语项列表
        termSave               : USER_API + 'term/save', // 新增术语
        /////////////////////////////////////////////////////////////
        getProject             : USER_API + 'project/list?pageNum={{pageIndex}}',
        projectDetail          : USER_API + 'project/detail?projectId={{id}}',
        saveProject            : USER_API + 'project/save',
        translateUnit          : USER_API + 'tu/list?partId={{partId}}&pageSize=3000&projectFileId={{projectFileId}}&pageNum={{pageNum}}',
        translateUnitSave      : USER_API + 'tu/save',
        delProject             : USER_API + 'project/file/delete?projectId={{projectId}}&projectFileId={{projectFileId}}',
        ///////////////////////////////////////////////////////////// 导出接口
        exportSourceArticle    : USER_API + 'export/source?projectFileId={{projectFileId}}',
        exportTargetArticle    : USER_API + 'export/target?projectFileId={{projectFileId}}',
        exportReviewedArticle  : USER_API + 'export/reviewed?projectFileId={{projectFileId}}',
        /////////////////////////////////////////////////////////////
        corpusSave             : USER_API + 'corpus/save', // 新增语料
        corpusBatchSave        : USER_API + 'corpus/item/batch/save',
        corpusItemSave         : USER_API + 'corpus/item/list?pageNum={{pageIndex}}&pageSize={{pageSize}}',
        corpusList             : USER_API + 'corpus/list?pageNum={{pageIndex}}&pageSize={{pageSize}}'
    }
};
export default Constant;
