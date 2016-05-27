import _ from 'lodash';
import performance from '../js/performance_mixin';
import moment from 'moment';
import datePicker from 'vue-datepicker';
let template = `
<section  style="-webkit-user-select: none;padding: 10px 20px;">
    <div class="m-media">
        <div class="media-left media-middle">
            <input type="checkbox" id="chk_{{todoId}}" class="filled-in" v-model="todoItem.done" />
            <label style="margin-top:10px " for="chk_{{todoId}}"></label>
        </div>
        <div class="media-body" @dblclick.stop="enableEdit">
            <div v-show="isEditMode || !todoId" >
                <input
                    placeholder="todo content"
                    v-el:editinput :autofocus="!todoId" type="text" @keyup.enter="saveTodo" @click.stop v-model="todoItem.text" lazy />
            </div>
            <div :class="{'done-todo':todoItem.done}" v-else >
                <div class="todoItem-title">{{todoItem.text}}</div>
                <div class="todoItem-time">{{todoItem.time||new Date() | formatDate 'YYYY年MM月DD日 HH:mm'}}</div>
             </div>
        </div>
        <div class="media-right media-middle">
            <span class="icon-time">

            <date-picker :time.sync="todoItem.time" :option="timeoption"></date-picker>
            </span>
        </div>
    </div>

</section>`;

const initTodo = {
    id: null,
    text: '',
    done: false,
    time: ''
};

export default {
    template: template ,
    mixins:[performance],
    props: {
        todoId: {
            type: String,
            default() {
                return _.cloneDeep(initTodo).id;
            }
        },
        todoItem: {
            default() {
                return _.cloneDeep(initTodo);
            }
        }
    },
    data(){
        return {
            startTime: '',
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            isEditMode: false
        };
    },
    watch:{
        'todoItem.done':function (){
            this.saveTodo();
        },
        'todoItem.time':function (){
            this.saveTodo();
        }
    },
    methods:{
        saveTodo(){
            if (!_.isEmpty(this.todoItem.text)) {
                this.$dispatch('set-todo', this.todoId, this.todoItem);
                this.disableEdit();
            }else {
                this.$els.editinput.focus();
            }
        },
        enableEdit() {
            if (this.todoItem.done) {
                return;
            }
            this.isEditMode = true;
            this.$nextTick(() => {
                this.$els.editinput.focus();
            });
        },
        disableEdit() {
            this.isEditMode = false;
        }
    },
    created(){
        window.addEventListener('click', () => {
            this.disableEdit();
        });
    },
    beforeDestroy() {
        window.removeEventListener('click', () => {
            this.disableEdit();
        });
    },
    components: {
        datePicker
    },
    filters:{
        formatDate(val, format){
            let mt = moment(val);
            return  mt.isValid() ? mt.format(format||'YYYY-MM-DD HH:mm') : ''
        }

    },
    directives: {
        placeholder(placeString) {
            let vm = this.vm;
            if (_.isEmpty(vm.todoItem.text)) {
                vm.todoItem.text = placeString;
            }
            // console.log(placeString);
        }
    }
}
