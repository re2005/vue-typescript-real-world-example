import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {User, UserState} from '@/types/userTypes';
import router from '@/router';
import authService from '@/services/authentication.service';

const state: UserState = {
    userDetail: <User>{},
    isLoading: false,
    isAuthenticated: false
};

const mutations: MutationTree<UserState> = {
    setAuth(state: UserState, payload: boolean) {
        state.isAuthenticated = payload;
    },
    setUser(state: UserState, payload: User) {
        state.userDetail = payload;
    },
    setLoading(state: { isLoading: boolean; }, payload: boolean) {
        state.isLoading = payload;
    }
};
const actions: ActionTree<UserState, any> = {
    signUserIn({commit}, payload) {
        commit('setLoading', true);
        try {
            // await call the API
            commit('setUser', payload);
            commit('setAuth', true);
            window.localStorage.setItem('auth', String(true));
            router.push('/');
        } catch (e) {
            console.log(e);
        }
        commit('setLoading', false);
    },
    logout({commit}) {
        commit('setUser', {});
        commit('setAuth', false);
        authService.logoutUser();
        router.push('/login');
    }
};

const getters: GetterTree<UserState, any> = {
    user: state => state.userDetail,
    isAuthenticated: state => state.isAuthenticated
};

export const user: Module<UserState, any> = {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
};
