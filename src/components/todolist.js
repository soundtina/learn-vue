let template = `<section>
    <todo-filter @change-status="changeStatus"></todo-filter>
    <ul class="collection">
        <li class="collection-item" style="padding:0" v-for="t in listData | filterBy filterStatus in 'done'" track-by="id">
            <todo-one :todo-item="t"></todo-one>
        </li>
        <li  class="collection-item" style="padding:0" >
            <todo-one :todo-item="defaultTodo" ></todo-one>
        </li>

    </ul>

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
        changeStatus(_status){
            debugger
            this.filterStatus  = _status;
        }

    },
    components:{todoOne,todoFilter}
};
