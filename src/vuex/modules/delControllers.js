import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    error_datas: {},
    del_status: {}
}

// getters
const getters = {
    error_datas: state => state.error_datas,
    del_status:  state => state.del_status
}

// actions
const actions = {
    
    delProjectFiles({commit}, datas) {
        let url = Constant.API.delProject
        url = url.replace("{{projectFileId}}", datas.projectFileId)
        url = url.replace("{{projectId}}", datas.projectId)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.DEL_PROJECT_FILES, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.DEL_PROJECT_FILES] (state, datas) {
        state.del_status = datas
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
