import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import _ from 'lodash';
import myI18n from './js/i18n';
import App from './components/App.vue';
// import router from './components/router.js';
import { getCookieAll, setCookie, getCookieByName } from './utils/other.js';
import zhCN from './locales/zh-CN.js';
import enUS from './locales/en-US.js';


Vue.use(VueRouter);
Vue.use(VueI18n);


// custom filter
Vue.filter('sortByStatus', function(list) {
    let doneList = [];
    let willList = [];
    list.forEach(function(d) {
        if (d.done) {
            doneList.push(d);
        } else {
            willList.push(d);
        }
    });

    return willList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }).concat(doneList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }));
});


// get all cookie
const allCookies = getCookieAll();


// ------ I18N
if (!allCookies.todos_lang || !{'en-US': true, 'zh-CN': true}[allCookies.todos_lang]) {
    allCookies.todos_lang = 'en-US';
    setCookie('todos_lang', allCookies.todos_lang);
}
Vue.config.lang = allCookies.todos_lang;
Vue.locale('en-US', enUS);
Vue.locale('zh-CN', zhCN);


// ------ router
const router = new VueRouter({
    // history: true,
    // saveScrollPosition: true,
    // transitionOnLoad: true,
});

router.map({
    '/login': {
        name: 'login',
        component: require('./components/user/Login.vue')
    },
    '/register': {
        name: 'register',
        component: require('./components/user/Register.vue')
    },
    '/detail': {
        name: 'detail',
        component: require('./components/detail/Detail.vue')
    },
    '/index': {
        name: 'index',
        component: require('./components/Index.vue')
    },
    '*': {
        name: 'index',
        component: require('./components/Index.vue')
    }
});
router.beforeEach(function({ to, next, redirect }) {
    const username = getCookieByName('todos_username');
    console.log(username, to.path);

    if (!username && to.path.substr(0, 7) === '/detail') {
        redirect('/login');
    } else {
        next();
    }
});
// router.redirect({
//     '/': '/index'
// });


// start App
router.start(App, '#todo-app');


// export default router;
