let Vue = require('vue');
import _ from 'lodash';
import todoStore from './js/store';
require('materialize-css/bin/materialize.css');
import todoList from './components/todolist'
let template =  `
<section>
    <div id="toast-container" v-show="msg">
        <div class="toast" >{{msg}}</div>
    </div>
    <todo-list @set-todo="setOneTodo"   :list-data="todoList"></todo-list>
</section>`;

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
        _updateTodo(todoInfo){
            let status = todoStore.updateTodoInfo(todoInfo);
            if (status) {
                // 提示更新成功 临时使用
                this.msg="保存成功";

                setTimeout(() => {
                    this.msg = '';
                }, 3000);
            }else{
                // TODO: 调用更新出错的回调
            }
        },
        setOneTodo(todoInfo){
            todoInfo.id ? this._updateTodo(todoInfo): this._addTodo(todoInfo);
        }

    },
    components:{
        todoList
    },
    created(){
        this.todoList = todoStore.getTodoList();
    }
});
