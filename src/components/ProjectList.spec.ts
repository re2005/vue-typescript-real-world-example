import {createLocalVue, mount} from '@vue/test-utils';
import ProjectList from '@/components/ProjectList.vue';
import {projectsMock} from '@/mocks/projects';
import Vuex from 'vuex';
import Buefy from 'buefy';
import {questionsMock} from '@/mocks/questions';

let wrapper: any;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

const state = {
    reasoning: questionsMock.firstQuestions,
    other: questionsMock.secondQuestions
};

const getters = {
    projects: () => projectsMock,
    isLoading: () => false
};
const actions = {
    getProjects: jest.fn()
};

const store = new Vuex.Store({
    modules: {
        projects: {
            state,
            actions,
            getters,
            namespaced: true
        }
    }
});

describe('Tests Project List', () => {
    beforeEach(() => {
        wrapper = mount(ProjectList, {
            sync: false,
            stubs: ['router-link', 'b-dropdown', 'b-dropdown-item'],
            store,
            localVue,
            propsData: {
                isPaginated: true,
                paginationPosition: 'bottom',
                currentPage: 1,
                perPage: 5,
                getDays: jest.fn(),
                stageTip: jest.fn(),
                confirmDeletion: jest.fn()
            }
        });
    });

    it('Instantiate component', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Projects table is rendered with 5 items', () => {
        const questions = wrapper.findAll('tbody tr');
        expect(questions.length).toBe(5);
    });
});
