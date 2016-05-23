let template = `<section>
    <todo-filter @change-status="changeStatus"></todo-filter>
    <ul class="collection">
        <li class="collection-item" transition="expand" style="padding:0" v-for="t in listData | filterBy filterStatus in 'done'" track-by="id">
            <div class="hoverable todo-container">
                <todo-one :todo-id="$index" :todo-item="t"></todo-one>
                <i class="small material-icons" @click="removeTodo(t)" >close</i>
            </div>
        </li>
        <li  class="collection-item" style="padding:0" >
            <todo-one :todo-item="defaultTodo" ></todo-one>
        </li>

    </ul>
    <div class=" grey-text lighten-3">
        <p v-translate="'editway'"></p>
        <p v-translate="'powerdby'"></p>
    </div>
</section>`;
import todoOne from './todoOne';
import todoFilter from './todoFilter';
export default {
    template: template,
    props: {
        listData: Array
    },
    data(){
        return {
            filterStatus: null,
            defaultTodo: {
                id: null,
                text: '',
                done: false
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
        removeTodo(todoInfo){
            this.listData.$remove(todoInfo);
        },
        changeStatus(_status){
            this.filterStatus  = _status;
        }

    },
    components:{todoOne,todoFilter}
};
