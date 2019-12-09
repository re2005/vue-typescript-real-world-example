<template>
    <NavigationBar :user="user" @logout="onLogout()"/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import NavigationBar from './NavigationBar.vue';
    import {namespace} from 'vuex-class';
    import {User} from '@/types/userTypes';

    const userModule = namespace('user');

    @Component({
        name: 'Header',
        components: {
            NavigationBar
        }
    })

    export default class Header extends Vue {
        data: any;

        @userModule.Getter user!: User;
        @userModule.Action logout: any;

        public onLogout() {
            this.logout();
        }
    }
</script>
