import Constant from '../../static/js/common/API'
import asyncAPI from '../datas/doDatas.js'
import * as types from '../mutation-types.js'

const state = {
	error_datas_flags: '',
    extend_score: 0,
	service_data_info: [],
    service_sub_data_info: [],
    service_menus_data_info: [],
    service_sub_menus_data_info: [],
    service_sub_menus_data_orders: {},
    strategy_list_datas_info: [],
    strategy_category_data_info: [],
    counselor_list_datas_info: [],
    strategy_data_detail: {},
    counselor_data_detail: {},
    comment_list_datas: [],
    collect_list_datas: [],
    course_list_datas: [],
    course_category_datas: [],
    course_data_info: [],
    collect_data_status: false,
    counselor_data_info: []
}

// getters
const getters = {
    strategy_list_datas_info : state => state.strategy_list_datas_info,
    strategy_category_data_info : state => state.strategy_category_data_info,
    service_data_info : state => state.service_data_info,
    counselor_data_info : state => state.counselor_data_info,
    service_menus_data_info : state => state.service_menus_data_info,
    service_sub_data_info : state => state.service_sub_data_info,
    service_sub_menus_data_info : state => state.service_sub_menus_data_info,
    service_sub_menus_data_orders : state => state.service_sub_menus_data_orders,
    counselor_list_datas_info : state => state.counselor_list_datas_info,
    strategy_data_detail : state => state.strategy_data_detail,
    counselor_data_detail : state => state.counselor_data_detail,
    comment_list_datas : state => state.comment_list_datas,
    extend_score :  state => state.extend_score,
    collect_list_datas : state => state.collect_list_datas,
    collect_data_status : state => state.collect_data_status,
    course_list_datas: state => state.course_list_datas,
    course_category_datas: state => state.course_category_datas,
    course_data_info: state => state.course_data_info,
    error_datas_flags : state => state.error_datas_flags
}

// actions
const actions = {
    getCategoryCourse ({commit}, datas) {
        let url = Constant.API.getCategoryCourse
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_CATEGORY_COURSE, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCourseListResetDatas({commit}, datas) {
        commit(types.SET_COURSE_DEFAULT_DATA_LIST, datas)
    },
    getCourseListDatas ({commit}, datas) {
        let data = datas.searchId || {}
        let url = Constant.API.getCourseList
        url = url.replace('{{pageIndex}}', datas.pageIndex)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, data,
            (datas) => commit(types.GET_COURSE_DATA_LIST, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCourseDetailDatas ({commit}, datas) {
        let data = {}
        let url = Constant.API.getCourseDetails
        url = url.replace('{{id}}', datas.id)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.GET_COURSE_DATA_INFO, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    delCollectDatas ({commit}, datas) {
        let data = {}
        let url = Constant.API.delOnceCollect
        url = url.replace('{{id}}', datas.id)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, data,
            (datas) => commit(types.DEL_COLLECT_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    addCollectDatas ({commit}, datas) {
        let data = {}
        let url = Constant.API.addOnceCollect
        url = url.replace('{{id}}', datas.id)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, data,
            (datas) => commit(types.ADD_COLLECT_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCollectList ({commit}, datas) {
        let data = {}
        let url = Constant.API.getCollectList
        url = url.replace('{{pageIndex}}', datas.pageIndex)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, data,
            (datas) => commit(types.GET_COLLECT_LIST_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCommentList ({commit}, datas) {
        let url = Constant.API.getCommentDatas
        url = url.replace('{{pageIndex}}', datas.pageIndex)
        url = url.replace('{{token}}', datas.token)
        let data = {
            productId: datas.id,
            uid: datas.uid
        }
        asyncAPI.doPostDatas(url, data,
            (datas) => commit(types.GET_COMMENT_LIST_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getStrategyDetails({commit}, datas) {
        let url = Constant.API.getStrategyDetail
        url = url.replace('{{id}}', datas.id)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.STRATEGY_INFO_DATAS_DETAIL, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getConsultDetailsInfo({commit}, datas) {
        let url = Constant.API.getConsultDetails
        url = url.replace('{{id}}', datas.id)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.CONSULT_INFO_DATAS_DETAIL, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getStrategyList({commit}, datas) {
        let url = Constant.API.getStrategyList
        url = url.replace('{{pageIndex}}', datas.pageIndex)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, {},
            (datas) => commit(types.STRATEGY_INFO_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getStrategyInfo({commit}, datas) {
        let url = Constant.API.getCategoryStrategy
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.STRATEGY_CATEGORY_INFO, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getServiceInfo({commit}, datas) {
        let url = Constant.API.getServiceList
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, {},
            (datas) => commit(types.SERVICE_INFO_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCounselorList({commit}, datas) {
        let searchDatas = datas.searchId
        let url = Constant.API.getCounselorList
        url = url.replace('{{pageIndex}}', datas.pageIndex)
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doPostDatas(url, searchDatas,
            (datas) => commit(types.COUNSELOR_LIST_DATAS_INFO, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getServiceMenusInfo({commit}, datas) {
        let url = Constant.API.getCategoryService
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.SERVICE_INFO_DATAS_MENUS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    getCounselorInfo({commit}, datas) {
        let url = Constant.API.getCategoryCounselor
        url = url.replace('{{token}}', datas.token)
        asyncAPI.doGetDatas(url,
            (datas) => commit(types.COUNSELOR_INFO_DATAS, datas),
            (datas) => commit(types.HTTP_STATUS_ERROR, datas)
        );
    },
    changeServiceMenusInfo({commit}, datas) {
        commit(types.CHANGE_SERVICE_INFO_DATAS_MENUS, datas)
    },
    changeServiceSubMenusInfo({commit}, datas) {
        commit(types.CHANGE_SUB_SERVICE_INFO_DATAS_MENUS, datas)
    },
    getChangeServiceInfo({commit}, datas) {
        commit(types.CHANGE_SERVICE_INFO_DATAS, datas)
    },
    getServiceSubMenusOrderInfo({commit}, datas) {
        commit(types.GET_SERVICE_SUB_MENUS_ORDER_INFO_DATAS, datas)
    }
    
}

const mutations = {
    [types.HTTP_STATUS_ERROR] (state, datas) {
        console.log("error user status .")
    },
    [types.ADD_COLLECT_DATAS](state, datas) {
        console.log("add : ", datas)
        if (datas.code === 200) {
            state.error_datas_flags = ''
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.SET_COURSE_DEFAULT_DATA_LIST](state, datas) {
        for (let i = 0, lens = datas.length; i < lens; i++) {
            datas[i].styledata = "sprite sprite-angle-black-right"
            this.$data.optionStyle[i] = ["filter-option"]
        }
    },
    [types.GET_COURSE_DATA_LIST](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            console.log("course_list_datas : ", datas.data)
            state.course_list_datas = datas.data
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.GET_CATEGORY_COURSE](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            let Categorys = datas.data
            let orderCategory = []
            let tmpCategory = []
            let tmpMainCategory = []
            let categoryDatas = []
            for (var i =0, lens = Categorys.length; i < lens; i++) {
                tmpMainCategory[i] = {}
                for (var j =0, len = Categorys[i].categorys.length; j < len; j++) {
                    if (!!Categorys[i].categorys[j].categorys) {
                        Categorys[i].categorys[j].isShow = true
                        Categorys[i].categorys[j].fontstyledata = ""
                        Categorys[i].categorys[j].styledata = "sprite sprite-angle-black-right"
                    } else {
                        Categorys[i].categorys[j].isShow = false
                    }
                }
                tmpCategory[i] = Categorys[i].categorys
                tmpMainCategory[i].id = Categorys[i].id
                tmpMainCategory[i].pid = Categorys[i].pid
                tmpMainCategory[i].name = Categorys[i].name
            }
            categoryDatas[0] = tmpCategory
            categoryDatas[1] = tmpMainCategory
            state.course_category_datas = categoryDatas
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.GET_COURSE_DATA_INFO](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            let listDatas = datas.data || []
            let prices = listDatas.price.toString() || 10
            listDatas.fristPrice = prices.charAt(0)
            listDatas.otherPrice = prices.substr(1)
            state.course_data_info = listDatas
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.ADD_COLLECT_DATAS](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.collect_data_status = true
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.DEL_COLLECT_DATAS](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.collect_data_status = true
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.GET_COLLECT_LIST_DATAS](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.collect_list_datas = datas.data
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.GET_COMMENT_LIST_DATAS](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.comment_list_datas = datas.data
            state.extend_score = datas.extend || 0
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.CONSULT_INFO_DATAS_DETAIL](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            let listDatas = datas.data || {}
            let prices = listDatas.price.toString()
            listDatas.fristPrice = prices.charAt(0)
            listDatas.otherPrice = prices.substr(1)
            if (!!listDatas.service) {
                let tags = {}
                let tagList = listDatas.service.split(',')
                listDatas.services = []
                for (var i = 0, lens = tagList.length; i < lens; i++) {
                    tags = {}
                    tags.name = tagList[i]
                    if (i === 0) {
                        tags.classname = ''
                    } else if (i === 1) {
                        tags.classname = 'sub02'
                    } else {
                        tags.classname = 'sub03'
                    }
                    listDatas.services.push(tags)
                }
            }
            state.counselor_data_detail = listDatas
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.STRATEGY_INFO_DATAS_DETAIL](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.strategy_data_detail = datas.data
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.STRATEGY_CATEGORY_INFO](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.strategy_category_data_info = datas.data
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.STRATEGY_INFO_DATAS](state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.strategy_list_datas_info = datas.data
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.COUNSELOR_LIST_DATAS_INFO](state, datas) {
        let listDatas = []
        let prices = ''
        if (datas.code === 200) {
            state.error_datas_flags = ''
            listDatas = datas.data || []

            for (let keys of listDatas) {
                let prices = keys.price.toString()
                keys.fristPrice = prices.charAt(0)
                keys.otherPrice = prices.substr(1)
                if (!!keys.service) {
                    let tags = {}
                    let tagList = keys.service.split(',')
                    keys.services = []
                    for (var i = 0, lens = tagList.length; i < lens; i++) {
                        tags = {}
                        tags.name = tagList[i]
                        tags.type = 'info'
                        keys.services.push(tags)
                    }
                }
            }
            state.counselor_list_datas_info = listDatas
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.GET_SERVICE_SUB_MENUS_ORDER_INFO_DATAS](state, datas) {
        let datas_data = {}
        let objs = datas[0]
        let index = 0
        let OrderIndex = parseInt(datas[1], 10)
        for (let keys of objs) {
            if (OrderIndex === index) {
                datas_data = keys || {}
            }
            index += 1
        }
        console.log("datas_data", datas_data)
        state.service_sub_menus_data_orders = datas_data
    },
    [types.CHANGE_SERVICE_INFO_DATAS_MENUS] (state, datas) {
        let datas_data = {}
        let list_data_info = []
        let data_info = datas[0] || []
        let index = 1
        for (let keys of data_info) {
            datas_data = keys
            datas_data.index = index
            if (index === datas[1]) {
                datas_data.isCurrent = true
                datas_data.style="is-active el-menu-item"
            } else {
                datas_data.isCurrent = false
                datas_data.style="el-menu-item"
            }
            list_data_info.push(datas_data)
            index += 1
        }
        state.service_menus_data_info = list_data_info || []
    },
    [types.CHANGE_SERVICE_INFO_DATAS] (state, datas) {
        let data = datas[0]
        let index = parseInt(datas[1], 10)
        let order = 0
        let orderDatas = []
        for(let keys of data) {
            orderDatas.push(keys)
            orderDatas[order].style = 'list-datas'
            if (order === index) {
                orderDatas[order].style = 'list-datas selecotred'
            }
            order += 1
        }
        state.service_sub_data_info = orderDatas || []
    },
    [types.CHANGE_SUB_SERVICE_INFO_DATAS_MENUS] (state, datas) {
        let datas_data = {}
        let list_data_info = []
        let data_info = datas[0] || []
        let index = 1
        if (data_info.length <= 0) {
            state.service_sub_menus_data_info = []
            return false
        }
        for (let keys of data_info) {
            datas_data = keys
            datas_data.index = index
            if (index === datas[1]) {
                datas_data.isSubCurrent = true
                datas_data.style="grid-content showCuor bg-purple-light"
            } else {
                datas_data.isSubCurrent = false
                datas_data.style="grid-content showCuor bg-purple"
            }
            list_data_info.push(datas_data)
            index += 1
        }
        state.service_sub_menus_data_info = list_data_info || []
    },
    [types.COUNSELOR_INFO_DATAS] (state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.counselor_data_info = datas.data || []
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.SERVICE_INFO_DATAS_MENUS] (state, datas) {
        if (datas.code === 200) {
            let index = 1
            let datas_data = {}
            let list_data_info = []
            let data_info = datas.data || []
            for (let keys of data_info) {
                datas_data = keys
                datas_data.index = index
                if (index === 1) {
                    datas_data.isCurrent = true
                    datas_data.style="is-active el-menu-item"
                } else {
                    datas_data.isCurrent = false
                    datas_data.style="el-menu-item"
                }
                list_data_info.push(datas_data)
                index += 1
            }
            state.error_datas_flags = ''
            state.service_menus_data_info = list_data_info || []
        } else {
            state.error_datas_flags = '系统错误'
        }
    },
    [types.SERVICE_INFO_DATAS] (state, datas) {
        if (datas.code === 200) {
            state.error_datas_flags = ''
            state.service_data_info = datas.data || []
        } else {
            state.error_datas_flags = '系统错误'
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
