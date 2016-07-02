<template>
    <div class="color-type">
        <div v-for="f in filters" :class="{[f]:true,'selected':f===typeFilter}" @click="setTodoType(f)"></div>
    </div>
</template>

<style scoped>
    .color-type{
      font-size: 0;
      text-align: center;
      vertical-align: middle;
    }
    .color-type div{
      display:inline-block;
      width:10%;
      height: 10px;
      opacity: .9;
      transition: .5s;
      cursor: pointer;
    }

    .color-type div.selected{
      width: 20%;
    }
    .color-type div:hover{
      width: 20%;
    }
</style>
<script >
import {
    updateFielter
} from '../../vuex/actions.js';

    export default {
        // Options / Data
        vuex:{
            actions: { updateFielter },
            getters: {
                typeFilter: state => state.typeFilter
            }
        },
        data () {
            return {}
        },
        props: {
            filters:{
                type:Array
            }
        },
        computed: {},
        methods: {
            setTodoType(_type){
                if(this.typeFilter === _type)
                    _type = '';
                this.updateFielter(_type);
            }
        }// ,
        // watch: {},
        // Options / DOM
        // el () {},
        // replace: true,
        // template: '',
        // Options / Lifecycle Hooks
        // init () {},
        // crated () {},
        // beforeCompile () {},
        // compiled () {},
        // ready () {},
        // attached () {},
        // detached () {},
        // beforeDestroy () {},
        // destroyed () {},
        // Options / Assets
        // directives: {},
        // elementDirectives: {},
        // filters: {},
        // components: {},
        // transitions: {},
        // partials: {},
        // Options / Misc
        // parent: null,
        // events: {},
        // mixins: [],
        // name: ''
    }
</script>
