let template =`
<section>
    <template v-for="st in status">
        <input name="group-status" type="radio" id="todo-{{st}}" @click="setStatus($index)" />
        <label for="todo-{{st}}">{{st | capitalize}}</label>
    </template>
</section>
`;
export default {
    template: template,
    data(){
        return {
            status: ['all','done','remain']
        }
    },
    methods:{
        setStatus(_status){
            let statusMap = [null, true, false];
            this.$dispatch('change-status',statusMap[_status]);
        }
    }

}
