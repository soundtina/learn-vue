let template = `<section>
    <todo-filter @change-status="changeStatus"></todo-filter>
    <ul class="collection">
        <li class="collection-item" style="padding:0" >
            <todo-one :todo-item="defaultTodo" :todo-id="defaultTodo.id" ></todo-one>
        </li>
        <li class="collection-item" transition="expand" style="padding:0"
            v-for="t in listData | filterBy filterStatus in 'done' | sortByStatus">
            <div class="hoverable todo-container">
                <todo-one :todo-item="t" :todo-id="t.id"></todo-one>
                <i class="small material-icons" @click="removeTodo(t)" >close</i>
            </div>
        </li>
    </ul>
    <div class="lighten-3">
        <p v-translate="'editway'"></p>
        <p v-translate="'author'"></p>
    </div>
</section>`;
import todoOne from './todoOne';
import todoFilter from './todoFilter';
export default {
    template: template,
    props: {
        listData: Array,
        removeTodo: Function
    },
    data(){
        return {
            filterStatus: null,
            defaultTodo: {
                id: null,
                text: '',
                done: false,
                times: Math.random()
            }
        }
    },
    watch:{
        listData(){
            this.defaultTodo = {
                id: null,
                text: '',
                done: false
            }
        }

    },
    methods:{
        changeStatus(_status){
            this.filterStatus  = _status;
        }

    },
    components:{todoOne,todoFilter}
};
