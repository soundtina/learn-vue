let Vue = require('vue');
import _ from 'lodash';
import todoStore from './js/store';
import todoList from './components/todolist';
import myI18n from './js/i18n';
import translateLib from './js/translate'

let template =  `
<section>
    <div>
        <input id="lang-cn" v-model="language_" type="radio" v-bind:value="'CN'">
        <label for="lang-cn">CN</label>
        <input id="lang-en" v-model="language_" type="radio" v-bind:value="'EN'">
        <label for="lang-en" >EN</label>
    </div>
    <div id="toast-container" v-show="msg">
        <div class="toast" >{{msg}}</div>
    </div>
    <todo-list @set-todo="setOneTodo"   :list-data="todoList"></todo-list>
</section>`;

Vue.use(myI18n,{translateLib});

new Vue({
    el: '#todo-app',
    template: template,
    data:{
        todoList: [],
        msg: ''
    },
    methods:{
        _addTodo(todoInfo){
            todoInfo.id = _.uniqueId('todo_');
            let status = todoStore.addTodoInfo(todoInfo);
            if (status) {
                this.msg="新增成功";
                this.todoList.push(todoInfo);
                setTimeout(() => {
                    this.msg = '';
                }, 3000);
            }else{
                // TODO: 调用更新出错的回调
            }

        },
        _updateTodo(todoId ,todoInfo){
            todoStore.updateTodoInfo(todoId, todoInfo).then(()=>{
                // 提示更新成功 临时使用
                this.msg="保存成功";
                setTimeout(() => {
                    this.msg = '';
                }, 3000);
            },()=>{
                // TODO: 调用更新出错的回调
            });
        },
        setOneTodo(todoId ,todoInfo){
            //todo add Logic
            todoInfo.id ? this._updateTodo(todoId,todoInfo): this._addTodo(this.todoList.length,todoInfo);
        }

    },
    components:{
        todoList
    },
    created(){
        todoStore.getTodoList().then((data) => {
            this.todoList = _.cloneDeep(data);
        });
    }
});
