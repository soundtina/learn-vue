let template = `
<section  style="-webkit-user-select: none;padding: 10px 20px;">
    <div class="row" style="margin-bottom:0px">
        <div class="col s2">
            <input type="checkbox" id="chk{{todoItem.id}}" class="filled-in" v-model="todoItem.done" />
            <label style="margin-top:10px " for="chk{{todoItem.id}}"></label>
        </div>
        <div class="col s10"  @dblclick.stop="enableEdit">
            <input  v-el:editinput v-if="isEditMode|| !todoItem.id" :autofocus="!todoItem.id" type="text" @click.stop v-model="todoItem.text" lazy />
            <div :class={'done-todo':todoItem.done} style="height:3rem;line-height:3rem" v-else>{{todoItem.text}}</div >
        </div>
    </div>
</section>`;
import _ from 'lodash';
import performance from '../js/performance_mixin';
let initTodo = {
    id: null,
    text: '',
    done: false
};
export default {
    template: template ,
    mixins:[performance],
    props: {
        todoId:{
            type: Number
        },
        todoItem:{
            default(){
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
        todoItem:{
            //这地方逻辑处理的比较耦合，跟todolist 中的wath Listdata，不好理解
            handler(newVal){
                if (!_.isEmpty(newVal.text)) {
                    this.$dispatch('set-todo',this.todoId, newVal);
                    this.disableEdit();
                }else {
                    this.$els.editinput.focus();
                }
            },
            deep:true
        }
    },
    methods:{
        enableEdit(){
            this.isEditMode = true;
            this.$nextTick(()=>{
                this.$els.editinput.focus();
            });
        },
        disableEdit(){
            this.isEditMode = false;
        }
    },
    created(){
        window.addEventListener('click', ()=>{
            this.disableEdit();
        });
    },
    beforeDestroy(){
        window.removeEventListener('click', ()=>{
            this.disableEdit();
        });
    },
    directives:{
        placeholder(placeString){
            let vm = this.vm;
            if (_.isEmpty(vm.todoItem.text)) {
                vm.todoItem.text = placeString;
            }
            // console.log(placeString);
        }
    }
}
