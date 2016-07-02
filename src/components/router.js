import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const router = new VueRouter({
    // history: true,
    // saveScrollPosition: true,
    // transitionOnLoad: true,
});

router.map({
    '/login': {
        name: 'login',
        component: require('./user/Login.vue')
    },
    '/register': {
        name: 'register',
        component: require('./user/Register.vue')
    },
    '/detail': {
        name: 'detail',
        component: require('./detail/Detail.vue')
    },
    '*': {
        name: 'index',
        component: require('./Index.vue')
    }
});
// router.redirect({
//     '/': '/index'
// });


export default router;
