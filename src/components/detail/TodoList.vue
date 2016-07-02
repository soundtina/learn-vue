<template>
    <section>
        <todo-filter @change-status="changeStatus"></todo-filter>
        <ul class="collection">
            <li class="collection-item" style="padding:0" >
                <todo-one></todo-one>
            </li>
            <li class="collection-item" transition="expand" style="padding:0"
                v-for="t in listData | filterBy filterStatus in 'done' | filterBy typeFilter in 'color'  | sortByStatus" track-by="$index">
                <div class="hoverable todo-container">
                    <todo-one :todo-item="t" :todo-id="t.id"></todo-one>
                    <i class="small material-icons" @click="removeTodo(t)" >close</i>
                </div>
            </li>
        </ul>
        <todo-types :filters="filters" :on-change-type=""></todo-types >
        <edit-todo :todo-item="thisItemData" v-if="thisItemData"></todo-list>
    </section>
</template>
<script>
import TodoOne from './TodoOne.vue';
import TodoFilter from './TodoFilter.vue';
import EditTodo from './EditTodo.vue';
import TodoTypes from './TodoTypes.vue';
import {
    deleteTodoById as deleteTodoByIdAction,
    setTopMsg as setTopMsgAction,
    updateFielter
} from '../../vuex/actions.js';


export default {
    name: 'TodoList',
    vuex: {
        actions: { deleteTodoByIdAction, setTopMsgAction  },
        getters: {
            typeFilter: state => state.typeFilter
        }
    },
    props: {
        listData: {
            type: Array
        }
    },
    data(){
        return {
            filters:['red','yellow','green','blue'],
            filterStatus: null,
            thisItemData: null
        };
    },
    methods:{
        changeStatus(_status){
            this.filterStatus  = _status;
        },
        removeTodo(todoInfo){
            const self = this;

            self.deleteTodoByIdAction(todoInfo).then(function() {
                self.setTopMsgAction('删除成功');
            }, function(errMsg) {
                self.setTopMsgAction(errMsg);
            });
        },
        editThisTodo(data){
          this.thisItemData=data;
          console.log(data);
        }
    },
    events:{
      editTodo(msg) {
          // 事件回调内的 `this` 自动绑定到注册它的实例上
        this.editThisTodo(msg);
      },
      closeEdit(){
        this.thisItemData=null;
      }
    },
    components: {
        TodoOne,
        TodoFilter,
        EditTodo,
        TodoTypes
    }
};
</script>
