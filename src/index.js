let Vue = require('vue');
import todoList from './components/todolist'
let template =  `<section>
    <todo-list :list-data="todoList"></todo-list>
</section>`;

new Vue({
    el: '#todo-app',
    template: template,
    data:{
        todoList:[{text:'t1', id:1 },{text:'t3', id:3 },{text:'t2', id:2 }]
    },
    components:{
        todoList
    }
});
