import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    user_code_datas : [],
    user_models_datas : [],
    user_status: [],
    bananer_data: [],
    recommend_data: [],
    error_datas: {}
}

// getters
const getters = {
    user_models_datas: state => state.user_models_datas,
    user_code_datas: state => state.user_code_datas,
    datas_data: state => state.datas_data,
    bananer_data: state => state.bananer_data,
    error_datas: state => state.error_datas,
    recommend_data: state => state.recommend_data,
    user_status: state => state.user_status
}

// actions
const actions = {
    getBananerInfo({commit}, datas) {
        let url = Constant.API.getBanner
        url = url.replace('{{location}}', datas.location)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, null,
            (datas) => commit(types.BANNER_STATU_DATA, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getRecommendDatas({commit}, datas) {
        let url = Constant.API.getRecommendDatas
        url = url.replace('{{pageIndex}}', datas.page)
        url = url.replace('{{pageSize}}', datas.pageSize)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, null,
            (datas) => commit(types.RECOMMEND_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    userModelsInfo({commit}, datas) {
        asyncAPI.doPostDatas(Constant.API.login, datas,
            (datas) => commit(types.USER_SIGNIN, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    setUserLogout({commit}, datas) {
        asyncAPI.doPostDatas(Constant.API.logout, null,
            (datas) => commit(types.USER_SIGNOUT, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    sendUserCode({commit}, datas) {
        asyncAPI.doPostDatas(Constant.API.sendCode, datas,
            (datas) => commit(types.USER_SENDCODE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    }
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.USER_SIGNIN] (state, datas) {
        if (datas.code === 200) {
            state.user_models_datas = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.BANNER_STATU_DATA](state, datas) {
        if (datas.code === 200) {
            state.bananer_data = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.RECOMMEND_DATAS](state, datas) {
        if (datas.code === 200) {
            state.recommend_data = datas.data || []
        } else {
            state.error_datas = {"data": "系统错误"}
        }
    },
    [types.USER_SIGNOUT] (state, datas) {
        state.user_models_datas = datas.data || []
    },
    [types.USER_SENDCODE] (state, datas) {
        state.user_code_datas = datas.data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
