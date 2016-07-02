<template>
    <div class="register">
    <h5 class="center-align">{{$t('common.register')}}</h5>
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="text" class="validate" v-model="username">
          <label for="email">{{$t('common.username')}}</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" v-model="password">
          <label for="password">{{$t('common.password')}}</label>
        </div>
        <div class="input-field col s12">
          <input id="repeatPassword" type="password" class="validate" v-model="repeatPassword">
          <label for="repeatPassword">{{$t('common.repassword')}}</label>
        </div>
        <div class="s12">
          <div class="right-align">
            <button class="btn waves-effect waves-light" type="submit" name="action"
                @click="toRegister"
                :class="{'btn-loading': isAdding}"
                :disabled="!isOkBtn || isAdding">{{$t('common.submit')}}</button>
          </div>
        </div>
      </div>
    </form>
    </div>
    </div>
</template>

<script>
import {t as formatMessage} from 'vue';

import {
    findUser as findUserAction,
    register as registerAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';
import { checkUsername, checkPassword } from '../../utils/validator.js';


export default {
    name: 'Register',
    vuex: {
        actions: { findUserAction, registerAction, setTopMsgAction }
    },
    data() {
        return {
            username: 'admin',
            usernameMsg: '',
            password: 'admin',
            passwordMsg: '',
            repeatPassword: 'admin',
            repeatPasswordMsg: '',
            isAdding: false
        };
    },
    computed: {
        isOkBtn() {
            const self = this;
            const { username, password, repeatPassword } = self;

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

            if (repeatPassword === password) {
                self.repeatPasswordMsg = '';
            } else {
                isOk = false;
                self.repeatPasswordMsg = formatMessage(`errorMsg['${'PASSWORD NOT SAME'}']`);
            }

            return isOk;
        }
    },
    methods: {
        toRegister() {
            const self = this;
            const {
                isOkBtn,
                isAdding,
                username, password, repeatPassword,
                usernameMsg, passwordMsg, repeatPasswordMsg
            } = self;

            if (!isOkBtn) { return; }

            if (isAdding) {
                self.setTopMsgAction(formatMessage(`infoTips['${'PLEASE WAIT...'}']`));
                return;
            }

            self.isAdding = true;
            self.findUserAction(username).then(function(user) {
                self.isAdding = false;

                if (user) {
                    self.setTopMsgAction(formatMessage(`errorCode['${'SAME USERNAME'}']`));
                } else {
                    self.registerAction(username, password).then(function() {
                        self.setTopMsgAction(formatMessage(`infoTips['${'REGISTER SUCCESS'}']`));
                        self.$router.go({ name: 'login' });
                    }, function(errMsg) {
                        // TODO
                    });
                }
            }, function(errMsg) {
                self.isAdding = false;

                self.setTopMsgAction(errMsg);
            });
        }
    }
};
</script>


<style media="screen">
.register{
  background: rgba(255,255,255,.8);
  padding: 30px;
}
</style>
