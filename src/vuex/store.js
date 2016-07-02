import Vue from 'vue';
import Vuex from 'vuex';

import { state, mutations } from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({ state, mutations });


export default store;
