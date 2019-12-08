<template>
    <div id="app">
        <Header v-if="isAuthenticated"/>
        <router-view/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Header from '@/components/Header.vue';
    import Component from 'vue-class-component';
    import {Getter, namespace} from 'vuex-class';

    const UserGetters = namespace('user', Getter);

    @Component({
        name: 'app',
        components: {
            Header
        }
    })

    export default class App extends Vue {
        @UserGetters isAuthenticated;
    }

</script>
