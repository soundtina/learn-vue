import _ from 'lodash';
import performance from '../js/performance_mixin';
import datePicker from './calendar';
import moment from 'moment';
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
            <div
                :class={'done-todo':todoItem.done}
                v-else
            >
                <div class="todoItem-title">{{todoItem.text}}</div>
                <div class="todoItem-time">{{todoItem.time || (new Date()) | formatDate}}</div>
             </div>
        </div>
        <div class="media-right media-middle">
            <span class="icon-time"><date-picker :set-Date="saveTodo" :val.sync="todoItem.time" placeholder="reminder time"></date-picker></span>
        </div>
    </div>
    <div class="row" style="margin-bottom:0px;display:none">
        <div class="col s2">
            <input type="checkbox" id="chk_{{todoId}}" class="filled-in" v-model="todoItem.done" />
            <label style="margin-top:10px " for="chk_{{todoId}}"></label>
        </div>
        <div class="col s8"  @dblclick.stop="enableEdit">
            <div v-show="isEditMode || !todoId" >
                <input
                    placeholder="todo content"
                    v-el:editinput :autofocus="!todoId" type="text" @click.stop v-model="todoItem.text" lazy />
                <date-picker placeholder="reminder time"></date-picker>
            </div>
            <div
                :class={'done-todo':todoItem.done}
                v-else
            >
                <div style="height:3rem;line-height:3rem">{{todoItem.text}}</div>
                <div style="height:2rem;line-height:2rem">{{todoItem.time || (new Date())}}</div>
            </div >
        </div>
        <div class="col s2"><span class="icon-time"></span></div>
    </div>
</section>`;

const initTodo = {
    id: null,
    text: '',
    done: false,
    times: Math.random()
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
            isEditMode: false
        };
    },
    watch:{
        'todoItem.done':function (){
            this.saveTodo();
        },
        'todoItem.time':function (val){
            this.todoItem.time = val;
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
            return mt.format(format||'YYYY-MM-DD HH:mm')
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
