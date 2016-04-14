let template = `<section>
    <ul>
        <li v-for="t in listData">
            <todo-one :todo-item="t"></todo-one>
        </li>
    </ul>
</section>`;
import todoOne from './todoOne';

export default {
    template: template,
    props: {
        listData: Array
    },
    data(){
        return {
        }
    },
    components:{todoOne}
};
