<template>
    <div class="app">
        <div class="bg" :style="{ 'background-image': 'url(\'http://i.ws234.com/BingImg/' + imgid + '/\')' }"></div>
        <top-msg></top-msg>
        <router-view></router-view>
        <top-nav></top-nav>
        <Setting></Setting>
    </div>
</template>

<script>
import store from '../vuex/store.js';
import TopNav from './menu/TopNav.vue';
import Setting from './menu/Setting.vue';
import TopMsg from './dialog/TopMsg.vue';

export default {
    name: 'App',
    store,
    components: {
        TopNav, TopMsg, Setting
    },
    data(){
      return{
        imgid: (Math.random() * 14 + 1).toFixed(0)

    }
    }

};
</script>
