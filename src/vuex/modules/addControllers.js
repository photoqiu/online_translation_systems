import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    error_datas: {}
}

// getters
const getters = {
    error_datas: state => state.error_datas
}

// actions
const actions = {
    doUploaderFile({commit}, datas) {
        let url = Constant.API.fileUpload
        asyncAPI.doPostRawDatas(url, data,
            (datas) => commit(types.FILE_UPLOADER, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    }
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.FILE_UPLOADER] (state, datas) {
        console.log("uploader:", datas)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
