import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    translator_models_datas : [],
    main_industry_models_datas : [],
    sub_one_industry_models_datas : [],
    sub_two_industry_models_datas : [],
    sub_there_industry_models_datas : [],
    sub_four_industry_models_datas : [],
    customer_info_datas : {},
    get_language_datas:[],
    error_datas: {}
}

// getters
const getters = {
    translator_models_datas: state => state.translator_models_datas,
    main_industry_models_datas: state => state.main_industry_models_datas,
    sub_one_industry_models_datas: state => state.sub_one_industry_models_datas,
    sub_two_industry_models_datas: state => state.sub_two_industry_models_datas,
    sub_there_industry_models_datas: state => state.sub_there_industry_models_datas,
    sub_four_industry_models_datas: state => state.sub_four_industry_models_datas,
    get_language_datas: state => state.get_language_datas,
    customer_info_datas: state => state.customer_info_datas,
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
    getLanguage({commit}, datas) {
        let url = Constant.API.language
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_LANGUAGE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    }
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.TRANSLATOR] (state, datas) {
        if (!!datas.data.status) {
            state.translator_models_datas = datas.data || []
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
            state.main_industry_models_datas = datas.data.industrys || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_ONE_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            state.sub_one_industry_models_datas = datas.data.industrys || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_TWO_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            state.sub_two_industry_models_datas = datas.data.industrys || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.SUB_THERE_INDUSTRY] (state, datas) {
        console.log("datas : ", datas)
        if (!!datas.data.status) {
            state.sub_there_industry_models_datas = datas.data.industrys || []
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
