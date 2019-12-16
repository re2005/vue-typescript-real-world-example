export interface QuestionsState {
    baseQuestions: QuestionsBase;
}

export interface QuestionsBase {
    firstQuestions: Array<Question>;
    secondQuestions: Array<Question>;
}

export interface Question {
    key: string;
    value: string
}
