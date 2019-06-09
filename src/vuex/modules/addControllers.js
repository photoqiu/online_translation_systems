import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
    error_datas: {},
    uploaders_file_status: {},
    save_term_status: {}
}

// getters
const getters = {
    error_datas: state => state.error_datas,
    uploaders_file_status: state => state.uploaders_file_status,
    save_term_status: state => state.save_term_status
}

// actions
const actions = {
    doUploaderFile({commit}, datas) {
        let url = Constant.API.fileUpload
        asyncAPI.jQueryPostDatas(url, datas,
            (datas) => commit(types.FILE_UPLOADER, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    doSaveTerm({commit}, datas) {
        let url = Constant.API.termSave
        asyncAPI.doPostDatas(url, datas,
            (datas) => commit(types.DO_TERM_SAVE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    }
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        state.error_datas = {"data": "请求错误"}
    },
    [types.DO_TERM_SAVE] (state, datas) {
        if (!!datas.data.status) {
            state.save_term_status = datas.data.result
        } else {
            state.error_datas = {"data": "系统错误"}
        }

    },
    [types.FILE_UPLOADER] (state, datas) {
        if (!!datas.data.status) {
            state.uploaders_file_status = datas.data.result
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
