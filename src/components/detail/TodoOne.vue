<template>
    <section  style="-webkit-user-select: none;padding: 10px 20px;" class="type type-{{todoItem.color}}">
        <div class="m-media">
            <div class="media-left media-middle">
                <input type="checkbox" id="chk_{{todoId}}" class="filled-in" v-model="todoItem.done" />
                <label style="margin-top:10px " for="chk_{{todoId}}"></label>
            </div>
            <div class="media-body" @dblclick.stop="enableEdit">
                <div v-show="isEditMode || !todoId" >
                    <input
                        placeholder="todo content"
                        v-el:editinput :autofocus="!todoId" type="text" @keyup.enter="saveTodo" v-model="todoItem.text" lazy />
                </div>
                <div :class="{'done-todo':todoItem.done}" v-else >
                    <div class="todoItem-title">{{todoItem.text}}</div>
                    <div class="todoItem-time">{{todoItem.time||new Date() | formatDate 'YYYY年MM月DD日 HH:mm'}}</div>
                 </div>
            </div>
            <div class="media-right media-middle">
                <span @click="editTodo" class="icon-more ">
            </div>
        </div>

    </section>
</template>

<script>
import _ from 'lodash';
import performance from '../../js/performance_mixin';
import moment from 'moment';
import datePicker from 'vue-datepicker';
import {
    updateTodoById as updateTodoByIdAction,
    setTopMsg as setTopMsgAction,
    updateEditmode as updateEditmodeAction
} from '../../vuex/actions.js';


const initTodo = {
    id: null,
    text: '',
    content:'',
    done: false,
    time: '',
    color:'red'
};

export default {
    name: 'TodoOne',
    mixins: [performance],
    vuex: {
        actions: { updateTodoByIdAction, setTopMsgAction ,updateEditmodeAction}
    },
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
            isAdding: false,
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
    // watch:{
    //     'todoItem.done':function (){
    //         this.saveTodo();
    //     },
    //     'todoItem.time':function (){
    //         this.noticed = false;
    //         this.saveTodo();
    //     }
    // },
    methods:{
        saveTodo(){
            const self = this;

            if (_.isEmpty(self.todoItem.text)) {
                self.$els.editinput.focus();
                return;
            }
            if (self.isAdding) {
                return;
            }

            self.isAdding = true;
            self.updateTodoByIdAction(self.todoItem).then(function(isNew) {
                self.disableEdit();
                self.isAdding = false;

                self.setTopMsgAction(isNew ? '新增成功' : '更新成功');
                self.cleanTodo();
            }, function(errMsg) {
                self.isAdding = false;

                self.setTopMsgAction(errMsg);
            });
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
        },
        editTodo() {
            this.$dispatch('editTodo',this.todoItem )
        },
        cleanTodo(){
            this.todoItem.text=null;
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
};

</script>
