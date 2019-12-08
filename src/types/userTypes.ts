export interface UserState {
    userDetail: User;
    isLoading: boolean,
    isAuthenticated: boolean
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Login {
    email: string;
    password: string;
}
