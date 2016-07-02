<template>
    <div class="login">
        <h5 class="center-align">{{$t('common.login')}}</h5>
      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="text" class="validate" v-model="username">
            <!-- <label for="email">{{$t('common.username')}}</label> -->
          </div>
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="password">
            <!-- <label for="password">{{$t('common.password')}}</label> -->
          </div>
          <div class="s12">
            <div class="right-align">
              <button class="btn waves-effect waves-light" type="submit" name="action"
                @click="toLogin"
                :class="{'btn-loading': isLogining}"
                :disabled="!isOkBtn || isLogining">{{$t('common.submit')}}</button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
</template>

<script>
import {t as formatMessage} from 'vue';
import _ from 'lodash';

import {
    login as loginAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';
import {
    getUser as user
} from '../../vuex/getters.js';
import { checkUsername, checkPassword } from '../../utils/validator.js';


export default {
    name: 'Login',
    vuex: {
        actions: { loginAction, setTopMsgAction },
        getters: { user }
    },
    data() {
        const self = this;
        const user = self.user;

        if (user.isLogin) {
            self.$router.go({ name: 'detail' });
        }

        return {
            username: user.username || 'admin',
            usernameMsg: '',
            password: user.password || 'admin',
            passwordMsg: '',
            isLogining: false
        };
    },
    created() {
        const self = this;
        const user = self.user;

        if (user.isLogin) {
            self.$router.go({ name: 'detail' });
        }
    },
    computed: {
        isOkBtn() {
            const self = this;
            const { username, password } = self;
            let { usernameMsg, passwordMsg } = self;

            let isOk = true;
            const usernameResult = checkUsername(username);
            const passwordResult = checkUsername(password);

            if (usernameResult.isOk) {
                self.usernameMsg = '';
            } else {
                isOk = false;
                self.usernameMsg = formatMessage(`errorCode['${usernameResult.errorCode}']`);
            }

            if (passwordResult.isOk) {
                self.passwordMsg = '';
            } else {
                isOk = false;
                self.passwordMsg = formatMessage(`errorCode['${passwordResult.errorCode}']`);
            }

            return isOk;
        }
    },
    methods: {
        toLogin() {
            const self = this;
            const {
                isOkBtn,
                isLogining,
                username, password,
                usernameMsg, passwordMsg
            } = self;

            if (!isOkBtn) { return; }

            if (isLogining) {
                self.setTopMsgAction(formatMessage(`infoTips['${'PLEASE WAIT...'}']`));
                return;
            }

            self.isLogining = true;
            self.loginAction(username, password).then(function() {
                self.isLogining = false;

                self.setTopMsgAction(formatMessage(`infoTips['${'LOGIN SUCCESS'}']`));
                self.$router.go({ name: 'detail' });
            }, function(errMsg) {
                self.isLogining = false;

                const errorCode = _.get(errMsg, 'errorCode');
                if (errorCode) {
                    self.setTopMsgAction(formatMessage(`errorCode['${errorCode}']`));
                } else {
                    self.setTopMsgAction(errMsg);
                }
            });
        }
    }
};
</script>


<style media="screen">
  .login{
    background: rgba(255,255,255,.8);
    padding: 30px;
  }
</style>
