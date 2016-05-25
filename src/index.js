let Vue = require('vue');
import _ from 'lodash';
import todoStore from './js/store';
import todoList from './components/todolist';
import datePicker from './components/calendar';
import myI18n from './js/i18n';
import translateLib from './js/translate'

let template =  `
<section>
    <div>
        <input id="lang-cn" v-model="language_" type="radio" v-bind:value="'CN'">
        <label for="lang-cn">Chinese</label>
        <input id="lang-en" v-model="language_" type="radio" v-bind:value="'EN'">
        <label for="lang-en" >Engilsh</label>
    </div>
    <div><span v-model="language_" v-bind:value="'CN'" @click=value="'CN'">CN</span>/<span v-model="language_" v-bind:value="'EN'">EN</span></div>
    <div id="toast-container" v-show="msg">
        <div class="toast" >{{msg}}</div>
    </div>
    <todo-list @set-todo="setOneTodo" :remove-todo="removeTodo"  :list-data="todoList"></todo-list>
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
        removeTodo(todoId,todoInfo){
            todoStore.updateTodoInfo(todoId,null).then(
                ()=>{
                    this.todoList.$remove(todoInfo);
                }
            );
        },
        _addTodo(todoInfo){
            let newId = this.todoList.length ;
            //todo 里面的id没有什么作用
            todoInfo.id = newId;
            todoStore.updateTodoInfo(newId, todoInfo).then(()=>{
                // 提示更新成功 临时使用
                this.msg="新增成功";
                setTimeout(() => {
                    this.msg = '';
                }, 3000);
                this.todoList.push(todoInfo);
            },()=>{
                // TODO: 调用更新出错的回调
            });
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
            !_.isUndefined(todoId ) ? this._updateTodo(todoId,todoInfo): this._addTodo(todoInfo);
        }

    },
    components:{
        todoList,datePicker
    },
    created(){
        todoStore.getTodoList().then((data) => {
            this.todoList = _.cloneDeep(data|| []);
        });
    }
});
