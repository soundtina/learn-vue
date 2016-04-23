let template =`
<section>
    <div>
        <input id="lang-cn" v-model="lang" type="radio" v-bind:value="'CN'">
        <label for="lang-cn">CN</label>
        <input id="lang-en" v-model="lang" type="radio" v-bind:value="'EN'">
        <label for="lang-en" >EN</label>
    </div>
    <template v-for="st in status">
        <input name="group-status" type="radio" id="todo-{{st}}" @click="setStatus($index)" />
        <label for="todo-{{st}}" v-trans="st" :lang="lang" >{{st | capitalize}}</label>
    </template>
</section>
`;
var translate ={
    CN:[
        {'All': '所有'}
    ]
};
import _ from 'lodash';
export default {
    name: '',
    template: template,
    data(){
        return {
            lang:'CN',
            status: ['all','done','remain']
        }
    },
    methods:{
        setStatus(_status){
            let statusMap = [null, true, false];
            this.$dispatch('change-status',statusMap[_status]);
        }
    },
    directives:{
        trans:{
            params:['lang'],
            bind(value){
                // let vm = this.vm;
                this.el.innerHTML = _.get(translate,`${this.params.lang}[0]${value}`,value) ;
                console.log(this.el.innerHTML);
            }
        }
    }

}
