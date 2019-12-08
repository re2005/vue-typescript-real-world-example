<template>
    <NavigationBar :user="user" @logout="onLogout()"/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import NavigationBar from './NavigationBar.vue';
    import {Action, Getter, namespace} from 'vuex-class';
    import {User} from '@/types/userTypes';

    const UserGetters = namespace('user', Getter);
    const UserActions = namespace('user', Action);

    @Component({
        name: 'Header',
        components: {
            NavigationBar
        }
    })

    export default class Header extends Vue {
        data: any;

        @UserGetters user!: User;
        @UserActions logout: any;

        public onLogout() {
            this.logout();
        }
    }
</script>
