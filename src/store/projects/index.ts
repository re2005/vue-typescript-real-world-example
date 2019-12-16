import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {Project, ProjectsState} from '@/types/projectsTypes';
import apiService from '@/services/api.service';

const state: ProjectsState = {
    projects: [],
    isLoading: false
};

const mutations: MutationTree<ProjectsState> = {
    setProjects(state: ProjectsState, payload: Project[]) {
        state.projects = payload;
    },
    setLoading(state: { isLoading: boolean; }, payload: boolean) {
        state.isLoading = payload;
    }
};

const actions: ActionTree<ProjectsState, any> = {
    async getProjects({commit}, payload) {
        commit('setLoading', true);
        try {
            const projects = await apiService.getProjects();
            commit('setProjects', projects);
        } catch (e) {
            console.log(e);
        }
        commit('setLoading', false);
    }
};

const getters: GetterTree<ProjectsState, any> = {
    projects: state => state.projects
};

export const projects: Module<ProjectsState, any> = {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
};
