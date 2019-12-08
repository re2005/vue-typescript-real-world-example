const authService = {

    isAuthenticated(): boolean {
        return this.isApiAuthenticated();
    },

    isApiAuthenticated() {
        // get api auth status
        return window.localStorage.getItem('auth') === 'true' || false;
    },

    logoutUser() {
        // post api logout
        return window.localStorage.removeItem('auth');
    }
};

export default authService;
