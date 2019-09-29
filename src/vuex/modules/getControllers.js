import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    translator_models_datas : [],
    main_industry_models_datas : [],
    sub_one_industry_models_datas : [],
    sub_two_industry_models_datas : [],
    sub_there_industry_models_datas : [],
    customer_info_datas : {},
    get_language_datas:[],
    project_list_datas: [],
    term_list_datas: [],
    users_list_datas: [],
    corpus_list_datas: [],
    assign_part_list_datas: [],
    part_sentence_list_datas: [],
    project_detail_datas: [],
    part_detail_datas: [],
    translate_unit_datas: [],
    export_source_datas: {},
    export_target_datas: {},
    export_review_datas: {},
    get_organ_list_datas: [],
    get_corpus_list_datas: {},
    term_item_datas: {},
    banned_list_datas: {},
    banned_item_datas: {},
    get_project_report_datas: {},
    term_item_list_datas: [],
    report_file_datas: {},
    error_datas: {}
}

// getters
const getters = {
    translator_models_datas: state => state.translator_models_datas,
    main_industry_models_datas: state => state.main_industry_models_datas,
    sub_one_industry_models_datas: state => state.sub_one_industry_models_datas,
    sub_two_industry_models_datas: state => state.sub_two_industry_models_datas,
    sub_there_industry_models_datas: state => state.sub_there_industry_models_datas,
    get_language_datas: state => state.get_language_datas,
    customer_info_datas: state => state.customer_info_datas,
    project_list_datas: state => state.project_list_datas,
    term_list_datas: state => state.term_list_datas,
    users_list_datas: state => state.users_list_datas,
    corpus_list_datas: state => state.corpus_list_datas,
    assign_part_list_datas: state => state.assign_part_list_datas,
    part_sentence_list_datas: state => state.part_sentence_list_datas,
    project_detail_datas: state => state.project_detail_datas,
    part_detail_datas: state => state.part_detail_datas,
    translate_unit_datas: state => state.translate_unit_datas,
    export_source_datas: state => state.translate_unit_datas,
    export_target_datas: state => state.translate_unit_datas,
    export_review_datas: state => state.translate_unit_datas,
    get_organ_list_datas: state => state.get_organ_list_datas,
    get_corpus_list_datas: state => state.get_corpus_list_datas,
    term_item_datas: state => state.term_item_datas,
    banned_list_datas: state => state.banned_list_datas,
    banned_item_datas: state => state.banned_item_datas,
    get_project_report_datas: state => state.get_project_report_datas,
    report_file_datas: state => state.report_file_datas,
    term_item_list_datas: state => state.term_item_list_datas,
    error_datas: state => state.error_datas
}

// actions
const actions = {
    getTranslatorInfo({commit}, datas) {
        let url = Constant.API.translator
        url = url.replace("{{pageIndex}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.TRANSLATOR, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCorpusItemList({commit}, datas) {
        let url = Constant.API.corpusItemList
        url = url.replace("{{querydatas}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_CORPUS_ITEM_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getItemsTermList({commit}, datas) {
        let url = Constant.API.termItemTermList
        url = url.replace("{{querydatas}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_TERM_ITEM_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getItemTermListDatas({commit}, datas) {
        let url = Constant.API.termItemTermList
        url = url.replace("{{querydatas}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_TERM_ITEM_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getExportSource({commit}, datas) {
        let url = Constant.API.exportSourceArticle
        url = url.replace("{{projectFileId}}", datas.projectFileId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.EXPORT_SOURCE_ARTICLE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getDataOrganList({commit}, datas) {
        let url = Constant.API.getOrganList
        url = url.replace("{{pageIndex}}", datas)
        url = url.replace("{{pageSize}}", 30)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_ORGAN_LIST_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getExportTarget({commit}, datas) {
        let url = Constant.API.exportTargetArticle
        url = url.replace("{{projectFileId}}", datas.projectFileId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.EXPORT_TARGET_ARTICLE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getExportReviewed({commit}, datas) {
        let url = Constant.API.exportReviewedArticle
        url = url.replace("{{projectFileId}}", datas.projectFileId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.EXPORT_REVIEW_ARTICLE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getTranslateUnitList({commit}, datas) {
        let url = Constant.API.translateUnit
        url = url.replace("{{projectFileId}}", datas.projectFileId)
        url = url.replace("{{partId}}", datas.partId)
        url = url.replace("{{pageNum}}", datas.pageNum)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.TRANSLATE_UNIT, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getPartInfo({commit}, datas) {
        let url = Constant.API.getFilePartList
        url = url.replace("{{projectFileId}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.ASSIGN_PART_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getPorjectDetails({commit}, datas) {
        let url = Constant.API.projectDetail
        url = url.replace("{{id}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PROJECT_DETAILS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getPartDetails({commit}, datas) {
        let url = Constant.API.getPartDetails
        url = url.replace("{{partId}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PART_DETAILS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getPartSentenceList({commit}, datas) {
        console.log("datas:", datas)
        let url = Constant.API.getPartList
        url = url.replace("{{arguments}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PART_SENTENCE_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getUsersInfo({commit}, datas) {
        let url = Constant.API.getUsers
        url = url.replace("{{pageIndex}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_USERS_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getTermList({commit}, datas) {
        let url = Constant.API.termList
        url = url.replace("{{pageIndex}}", datas)
        url = url.replace("{{pageSize}}", 30)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_TERM_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getBannedItemsList({commit}, datas) {
        let url = Constant.API.bannedList
        url = url.replace("{{pageIndex}}", datas)
        url = url.replace("{{pageSize}}", 30)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_BANNED_ITEMS_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getItemsBannedList({commit}, datas) {
        let url = Constant.API.bannedItemList
        url = url.replace("{{querydatas}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_BANNED_ITEM_DATAS_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCorpusList({commit}, datas) {
        let url = Constant.API.corpusList
        url = url.replace("{{pageIndex}}", datas)
        url = url.replace("{{pageSize}}", 30)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_CORPUS_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getQueryTermList({commit}, datas) {
        let url = Constant.API.termQueryList
        url = url.replace("{{querydatas}}", datas.arguments).replace("{{pageSize}}", 30).replace("{{pageIndex}}", datas.pageIndex)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_TERM_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getProjectReportDatas({commit}, datas) {
        let url = Constant.API.getProjectReport
        url = url.replace("{{projectId}}", datas.projectId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PROJECT_REPORT_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getProjectFilesReport({commit}, datas) {
        let url = Constant.API.getFilesReport
        url = url.replace("{{fileId}}", datas.fileId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PROJECT_REPORT_FILE_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getQueryCorpusList({commit}, datas) {
        let url = Constant.API.corpusQueryList
        url = url.replace("{{querydatas}}", datas.arguments).replace("{{pageSize}}", 30).replace("{{pageIndex}}", datas.pageIndex)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_CORPUS_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getBannedList({commit}, datas) {
        let url = Constant.API.bannedList
        url = url.replace("{{pageIndex}}", datas)
        url = url.replace("{{pageSize}}", 30)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_BANNED_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getIndustryInfo({commit}, datas) {
        let url = Constant.API.industry
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.MAIN_INDUSTRY, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCustomerInfo({commit}, datas) {
        let url = Constant.API.customer
        url = url.replace("{{pageIndex}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_CUSTOMER_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getOneIndustryInfo({commit}, datas) {
        let url = Constant.API.subIndustry
        url = url.replace("{{code}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.SUB_ONE_INDUSTRY, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getTwoIndustryInfo({commit}, datas) {
        let url = Constant.API.subIndustry
        url = url.replace("{{code}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.SUB_TWO_INDUSTRY, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getThereIndustryInfo({commit}, datas) {
        let url = Constant.API.subIndustry
        url = url.replace("{{code}}", datas)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.SUB_THERE_INDUSTRY, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getProjectList({commit}, datas) {
        let url = Constant.API.getProject
        url = url.replace("{{pageIndex}}", datas)
        console.log("url:", url)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_PROJECT, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        )
    },
    getLanguage({commit}, datas) {
        let url = Constant.API.language
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_LANGUAGE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        )
    }
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.GET_BANNED_ITEM_DATAS_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.banned_item_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PROJECT_REPORT_FILE_DATAS] (state, datas) {
        if (!!datas.data.status) {
            state.report_file_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_TERM_ITEM_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.term_item_list_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PROJECT_REPORT_DATAS] (state, datas) {
        if (!!datas.data.status) {
            state.get_project_report_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_TERM_ITEM_DATAS_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.term_item_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_BANNED_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.banned_list_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_ORGAN_LIST_DATAS] (state, datas) {
        if (!!datas.data.status) {
            let json_datas = datas.data.organs
            for (let keys of json_datas.list) {
                keys["json_datas"] = JSON.stringify(keys)
            }
            state.get_organ_list_datas = json_datas || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_CORPUS_ITEM_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.get_corpus_list_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.TRANSLATE_UNIT] (state, datas) {
        if (!!datas.data.status) {
            state.translate_unit_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.EXPORT_SOURCE_ARTICLE] (state, datas) {
        if (!!datas.data.status) {
            state.export_source_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.EXPORT_TARGET_ARTICLE] (state, datas) {
        if (!!datas.data.status) {
            state.export_target_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.EXPORT_REVIEW_ARTICLE] (state, datas) {
        if (!!datas.data.status) {
            state.export_review_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.ASSIGN_PART_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.assign_part_list_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PART_DETAILS] (state, datas) {
        if (!!datas.data.status) {
            state.part_detail_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PROJECT_DETAILS] (state, datas) {
        if (!!datas.data.status) {
            state.project_detail_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PART_SENTENCE_LIST] (state, datas) {
        if (!!datas.data.status) {
            console.log("part_sentence_list_datas:", datas.data)
            state.part_sentence_list_datas = datas.data.result || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_USERS_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.users_list_datas = datas.data.users || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_CORPUS_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.corpus_list_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.TRANSLATOR] (state, datas) {
        if (!!datas.data.status) {
            state.translator_models_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_TERM_LIST] (state, datas) {
        if (!!datas.data.status) {
            state.term_list_datas = datas.data.terms || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_PROJECT] (state, datas) {
        if (!!datas.data.status) {
            state.project_list_datas = datas.data.projects || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_CUSTOMER_DATAS] (state, datas) {
        if (!!datas.data.status) {
            let json_datas = datas.data.customers
            for (let keys of json_datas.list) {
                keys["json_datas"] = JSON.stringify(keys)
            }
            state.customer_info_datas = json_datas || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.MAIN_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            let data = datas.data.industrys
            let json_datas = []
            for (let keys of data) {
                keys.json_data = JSON.stringify(keys)
                json_datas.push(keys)
            }
            state.main_industry_models_datas = json_datas
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_ONE_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            let data = datas.data.industrys
            let json_datas = []
            for (let keys of data) {
                keys.json_data = JSON.stringify(keys)
                json_datas.push(keys)
            }
            state.sub_one_industry_models_datas = json_datas
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_TWO_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            let data = datas.data.industrys
            let json_datas = []
            for (let keys of data) {
                keys.json_data = JSON.stringify(keys)
                json_datas.push(keys)
            }
            state.sub_two_industry_models_datas = json_datas
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_THERE_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            let data = datas.data.industrys
            let json_datas = []
            for (let keys of data) {
                keys.json_data = JSON.stringify(keys)
                json_datas.push(keys)
            }
            console.log("datas:", data)
            state.sub_there_industry_models_datas = json_datas
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.GET_LANGUAGE] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            state.get_language_datas = datas.data.languages || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
