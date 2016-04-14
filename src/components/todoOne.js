let template = `<section @click.stop="enableEdit">
    <div v-if="isEditMode">
        <input type="text" :value="todoItem.text" />
    </div>
    <div v-else>
        <label>{{todoItem.text}}</lable>
    </div>
<section>`;
export default {
    template: template ,
    props: ['todoItem'],
    data(){
        return {
            isEditMode: false
        };
    },
    methods:{
        enableEdit(){
            this.isEditMode = true;
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
    }
}
