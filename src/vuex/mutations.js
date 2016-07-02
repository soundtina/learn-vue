import _ from 'lodash';

import {
    REGISTER, LOGIN, UPDATE_TODO_LIST, UPDATE_TODO_BY_ID, DELETE_TODO_BY_ID, NEW_TOP_MSG,UPDATE_EDITMODE, LOGOUT,UPDATE_FILTER_TYPE
} from './types.js';
import noticeJob from '../js/notice-job';
import { getCookieByName } from '../utils/other.js';

const username = getCookieByName('todos_username');
export const state = {
    /**
     * 数据结构标准：
     * {
     * 		username,
     * 		password,
     * 		isLogin        // 是否真实的登陆了，该标志用来在 false 的情况下，系统自动取 cookie 来后台模拟登陆,
     * 		isTryToLogin   // 是否正在登陆。。。
     * }
     * @type {[Object]}
     */
    user: username ? { username, isLogin: false } : null,
    todoList: null,
    /**
     * 提示信息缓存，存储量超过 100 时，会自动清除最早的：
     * [
     * 		'msg1', 'msg2'
     * ]
     * @type {Array}
     */
    topMsg: [],
    onSetting:false,
    typeFilter: '',
    isEditMode:false
};

export const mutations = {
    [UPDATE_FILTER_TYPE](state,filter){
        state.typeFilter = filter;
    },
    [UPDATE_EDITMODE](state) {
        state.isEditMode = !state.isEditMode;
    },
    [NEW_TOP_MSG](state, msg) {
        let topMsg = state.topMsg;
        if (topMsg.length >= 100) {
            topMsg = topMsg.slice(0, 99);
        }
        state.topMsg = topMsg.concat(msg);
    },
    [REGISTER](state, user) {
        state.user = {
            username: user.username,
            isLogin: false
        };
    },
    [LOGIN](state, user) {
        state.user = _.merge({ isLogin: true }, user);
    },
    [LOGOUT](state) {
        state.user = {};
    },
    [UPDATE_TODO_LIST](state, todoList) {
        state.todoList = todoList;

        noticeJob(todoList);
    },
    [UPDATE_TODO_BY_ID](state, todoInfo, isNew) {
        const todoList = state.todoList || [];
        const todoListLen = todoList.length;
        var i = -1;

        if (!isNew) {
            i = 0;
            for (i = 0; i < l; i++) {
                if (todoList[i].id === todoInfo.id) {
                    break;
                }
            }
        }

        if (i < 0 || i >= todoListLen) {
            state.todoList = todoList.concat(todoInfo);
        } else {
            todoList[i] = todoInfo;
        }

        state.todoList = todoList;
        // noticeJob(todoList);
    },
    [DELETE_TODO_BY_ID](state, todoInfo) {
        const todoList = state.todoList;

        let i = -1;
        const l = todoList.length;
        for (i = 0; i < l; i++) {
            if (todoList[i].id === todoInfo.id) {
                break;
            }
        }
        if (i >= 0) {
            state.todoList = todoList.slice(0, i).concat(todoList.slice(i + 1));
            noticeJob(state.todoList);
        }
    }
};
