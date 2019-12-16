import Vue from 'vue';
import Vuex from 'vuex';
import {user} from './user';
import {projects} from './projects';
import {questions} from './questions';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        projects,
        questions
    },
    plugins: [createPersistedState()]
});
