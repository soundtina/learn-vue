<template>
    <div class="top-msg">
        <div id="toast-container" v-show="isShowTopMsg">
            <div class="toast" >{{topMsg}}</div>
        </div>
    </div>
</template>

<script>
import {
    getTodoList as todoList, getTopMsg
} from '../../vuex/getters.js';


export default {
    name: 'TopMsg',
    vuex: {
        getters: { getTopMsg }
    },

    data() {
        return {
            isShowTopMsg: false
        };
    },
    computed: {
        topMsg() {
            const self = this;
            const messages = self.getTopMsg;

            if (!messages || messages.length === 0) {
                self.isShowTopMsg = false;
                return '';
            }

            setTimeout(function() {
                self.isShowTopMsg = false;
            }, 2000);

            self.isShowTopMsg = true;

            return messages[messages.length - 1];
        }
    }
};
</script>
