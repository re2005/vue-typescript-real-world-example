import {QuestionsState} from '@/types/questionsTypes';
import {questionsMock} from '@/mocks/questions';
import {updateByKey} from '@/helpers/store-connect';

const state: QuestionsState = {
    baseQuestions: questionsMock
};

const mutations = {
    updateByKey
};

export const questions = {
    state,
    mutations,
    namespaced: true
};
