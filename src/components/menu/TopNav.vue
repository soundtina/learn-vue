<template>
    <div class="top-nav language">
        <div class="logo">
            <a v-link="{ name: 'index' }">{{$t('TODOS')}}</a>
        </div>
        <div class="user-menu">
            <div v-show="isLogining">{{formatMessage('infoTips', 'PLEASE WAIT...')}}</div>
            <div v-else>
                <span v-if="user.isLogin">
                    <a v-link="{ name: 'detail' }">{{user.username}}</a>[<span class="fake-alink" @click="onLogout">{{$t('common.logout')}}</span>]
                </span>
                <span v-else>
                    <a v-link="{ name: 'login' }">{{$t('common.login')}}</a>
                    &nbsp;/&nbsp;
                    <a v-link="{ name: 'register' }">{{$t('common.register')}}</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {t as formatMessage} from 'vue';

import {
    getUser as user
} from '../../vuex/getters.js';
import {
    login as loginAction,
    logout as logoutAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';
import { getCookieByName } from '../../utils/other.js';
import { checkUsername, checkPassword } from '../../utils/validator.js';


export default {
    name: 'TopNav',
    vuex: {
        getters: { user },
        actions: { loginAction, logoutAction, setTopMsgAction }
    },
    data() {
        return {
            isLogining: true
        };
    },
    created() {
        const self = this;
        const user = self.user;

        if (user.isLogin) { return self.isLogining = false; }

        const username = getCookieByName('todos_username');
        const password = getCookieByName('todos_password');

        if (!checkUsername(username).isOk || !checkPassword(password).isOk) {
            // cookie 有问题，放弃后台自动登陆
            return self.isLogining = false;
        }

        self.loginAction(username, password).then(function() {
            self.isLogining = false;
        }, function(errMsg) {
            self.isLogining = false;
        });
    },
    methods: {
        formatMessage() {
            let path = arguments[0];
            for (let i = 1; i < arguments.length; i++) {
                path += `['${arguments[i]}']`;
            }
            return formatMessage(path);
        },
        onLogout() {
            const self = this;

            self.logoutAction();
            self.$router.go({ name: 'login' });
        }
    }
};
</script>

<style>
.top-nav {
    left: 0;
}
.logo {
    float: left;
    margin-left: 30px;
    font-size: 30px;
    font-weight: bold;
    color: rgb(177, 192, 197);
    text-shadow: -1px -1px rgba(0, 0, 0, 0.5);
    text-rendering: optimizeLegibility;
}
.user-menu {
    float: right;
}
</style>
