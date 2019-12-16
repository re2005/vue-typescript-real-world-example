import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/my-projects',
        name: 'my-projects',
        component: () => import(/* webpackChunkName: "myProjects" */ '../views/MyProjects.vue')
    },
    {
        path: '/project/:id',
        name: 'project-detail',
        component: () => import(/* webpackChunkName: "projectDetail" */ '../views/ProjectDetail.vue')
    },
    {
        path: '/new-project',
        name: 'new-project',
        component: () => import(/* webpackChunkName: "NewProject" */ '../views/NewProject.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
        path: '**',
        redirect: '/my-projects'
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = Vue.prototype.$authService.isAuthenticated();
    if (to.path !== '/login' && !isAuthenticated) {
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        next({name: 'my-projects'});
    }
    next();
});

export default router;
