<template>
    <div class-="detail">
      <div id="loader" v-show="isLoading">
          <div id="box"></div>
          <div id="hill"></div>
      </div>
        <todo-list v-show="!isLoading" :list-data="todoList"></todo-list>
    </div>
</template>

<script>
import {
    regetTodoList as regetTodoListAction,
    login as loginAction
} from '../../vuex/actions.js';
import {
    getTodoList as todoList,
    getUser as user
} from '../../vuex/getters.js';
import { getCookieByName } from '../../utils/other.js';

import TodoList from './TodoList.vue';


export default {
    name: 'Detail',
    vuex: {
        actions: { regetTodoListAction, loginAction },
        getters: { todoList, user }
    },
    data() {
        return {
            isLoading: true
        };
    },
    created() {
        const self = this;

        self.firstRender();
    },
    methods: {
        firstRender() {
            const self = this;
            const { user } = self;

            if (user.isLogin) {
                self.regetTodoListAction().then(function(d) {
                    self.isLoading = false;
                }, function(errMsg) {
                    self.isLoading = false;
                });
            } else if (user.isTryToLogin) {
                setTimeout(self.firstRender, 1000);
            } else {
                self.$router.go({ name: 'login' });
            }
        }
    },
    components: {
        TodoList
    }
};
</script>



<style>

#loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.7em;
    margin-left: -2.7em;
    width: 5.4em;
    height: 5.4em;
}

#hill {
    position: absolute;
    width: 7.1em;
    height: 7.1em;
    top: 1.7em;
    left: 1.7em;
    background-color: transparent;
    border-left: .25em solid whitesmoke;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

#hill:after {
    content: '';
    position: absolute;
    width: 7.1em;
    height: 7.1em;
    left: 0;
}

#box {
    position: absolute;
    left: 0;
    bottom: -.1em;
    width: 1em;
    height: 1em;
    background-color: transparent;
    border: .25em solid whitesmoke;
    border-radius: 15%;
    -webkit-transform: translate(0, -1em) rotate(-45deg);
    -moz-transform: translate(0, -1em) rotate(-45deg);
    -ms-transform: translate(0, -1em) rotate(-45deg);
    transform: translate(0, -1em) rotate(-45deg);
    animation: push 2.5s cubic-bezier(.79, 0, .47, .97) infinite;
}

@-webkit-keyframes push {
    0% {
        -webkit-transform: translate(0, -1em) rotate(-45deg);
    }
    5% {
        -webkit-transform: translate(0, -1em) rotate(-50deg);
    }
    20% {
        -webkit-transform: translate(1em, -2em) rotate(47deg);
    }
    25% {
        -webkit-transform: translate(1em, -2em) rotate(45deg);
    }
    30% {
        -webkit-transform: translate(1em, -2em) rotate(40deg);
    }
    45% {
        -webkit-transform: translate(2em, -3em) rotate(137deg);
    }
    50% {
        -webkit-transform: translate(2em, -3em) rotate(135deg);
    }
    55% {
        -webkit-transform: translate(2em, -3em) rotate(130deg);
    }
    70% {
        -webkit-transform: translate(3em, -4em) rotate(217deg);
    }
    75% {
        -webkit-transform: translate(3em, -4em) rotate(220deg);
    }
    100% {
        -webkit-transform: translate(0, -1em) rotate(-225deg);
    }
}

@-moz-keyframes push {
    0% {
        -moz-transform: translate(0, -1em) rotate(-45deg);
    }
    5% {
        -moz-transform: translate(0, -1em) rotate(-50deg);
    }
    20% {
        -moz-transform: translate(1em, -2em) rotate(47deg);
    }
    25% {
        -moz-transform: translate(1em, -2em) rotate(45deg);
    }
    30% {
        -moz-transform: translate(1em, -2em) rotate(40deg);
    }
    45% {
        -moz-transform: translate(2em, -3em) rotate(137deg);
    }
    50% {
        -moz-transform: translate(2em, -3em) rotate(135deg);
    }
    55% {
        -moz-transform: translate(2em, -3em) rotate(130deg);
    }
    70% {
        -moz-transform: translate(3em, -4em) rotate(217deg);
    }
    75% {
        -moz-transform: translate(3em, -4em) rotate(220deg);
    }
    100% {
        -moz-transform: translate(0, -1em) rotate(-225deg);
    }
}

@-ms-keyframes push {
    0% {
        -ms-transform: translate(0, -1em) rotate(-45deg);
    }
    5% {
        -ms-transform: translate(0, -1em) rotate(-50deg);
    }
    20% {
        -ms-transform: translate(1em, -2em) rotate(47deg);
    }
    25% {
        -ms-transform: translate(1em, -2em) rotate(45deg);
    }
    30% {
        -ms-transform: translate(1em, -2em) rotate(40deg);
    }
    45% {
        -ms-transform: translate(2em, -3em) rotate(137deg);
    }
    50% {
        -ms-transform: translate(2em, -3em) rotate(135deg);
    }
    55% {
        -ms-transform: translate(2em, -3em) rotate(130deg);
    }
    70% {
        -ms-transform: translate(3em, -4em) rotate(217deg);
    }
    75% {
        -ms-transform: translate(3em, -4em) rotate(220deg);
    }
    100% {
        -ms-transform: translate(0, -1em) rotate(-225deg);
    }
}

@keyframes push {
    0% {
        transform: translate(0, -1em) rotate(-45deg);
    }
    5% {
        transform: translate(0, -1em) rotate(-50deg);
    }
    20% {
        transform: translate(1em, -2em) rotate(47deg);
    }
    25% {
        transform: translate(1em, -2em) rotate(45deg);
    }
    30% {
        transform: translate(1em, -2em) rotate(40deg);
    }
    45% {
        transform: translate(2em, -3em) rotate(137deg);
    }
    50% {
        transform: translate(2em, -3em) rotate(135deg);
    }
    55% {
        transform: translate(2em, -3em) rotate(130deg);
    }
    70% {
        transform: translate(3em, -4em) rotate(217deg);
    }
    75% {
        transform: translate(3em, -4em) rotate(220deg);
    }
    100% {
        transform: translate(0, -1em) rotate(-225deg);
    }
}

</style>
