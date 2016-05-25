let Vue = require('vue');
import _ from 'lodash';
import todoStore from './js/store';
import util from './js/util';
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
    <div id="toast-container" v-show="msg">
        <div class="toast" >{{msg}}</div>
    </div>
    <todo-list @set-todo="setOneTodo" :remove-todo="removeTodo"  :list-data="todoList"></todo-list>
</section>`;

Vue.use(myI18n,{translateLib});
Vue.filter('sortByStatus', function(list) {
    let doneList = [];
    let willList = [];
    list.forEach(function(d) {
        if (d.done) {
            doneList.push(d);
        } else {
            willList.push(d);
        }
    });

    return willList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }).concat(doneList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }));
});

new Vue({
    el: '#todo-app',
    template: template,
    data:{
        todoList: [],
        msg: ''
    },
    methods:{
        removeTodo(todoInfo){
            todoStore.removeTodoInfo(todoInfo).then(
                ()=>{
                    this.todoList.$remove(todoInfo);
                }
            );
        },
        _addTodo(todoInfo){
            let newId = `TODO-${Date.now()}`;

            todoInfo.id = newId;
            todoStore.updateTodoInfo(todoInfo).then(()=>{
                // 提示更新成功 临时使用

                this.msg="新增成功";
                setTimeout(() => {
                    this.msg = '';
                }, 3000);
                this.todoList.push(todoInfo);
            }, () => {
                // TODO: 调用更新出错的回调
            });
        },
        _updateTodo(todoInfo){
            todoStore.updateTodoInfo(todoInfo).then(()=>{
                // 提示更新成功 临时使用
                this.msg="保存成功";
                // util.pushNotification('你保存成功了');
                setTimeout(() => {
                    this.msg = '';
                }, 3000);
            },()=>{
                // TODO: 调用更新出错的回调
            });
        },
        setOneTodo(todoId, todoInfo){
            let _todoInfo = _.cloneDeep(todoInfo);
            //todo add Logic
            todoId ?
                this._updateTodo(_todoInfo) :
                this._addTodo(_todoInfo);
        }

    },
    components:{
        todoList,datePicker
    },
    created(){
        todoStore.getTodoList().then((todoList) => {
            this.todoList = _.cloneDeep(todoList);
        });
    }
});
