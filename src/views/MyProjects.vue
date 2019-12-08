<template>
    <div>
        <section :class="[heroData.class]">
            <div class="hero-body is-bold">
                <div class="container">
                    <h1 class="custom-title">
                        {{heroData.title}}
                    </h1>
                    <h2 class="custom-subtitle">
                        {{heroData.subtitle}}
                    </h2>
                </div>
            </div>
        </section>
        <ProjectList/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Login} from '@/types/userTypes';
    import ProjectList from '@/components/ProjectList.vue';

    @Component({
        name: 'my-projects',
        components: {
            ProjectList
        }
    })
    export default class MyProjects extends Vue {
        user: Login | {};
        heroData: object;

        constructor() {
            super();
            this.user = {
                email: '',
                password: ''
            };

            this.heroData = {
                title: 'My projects',
                subtitle: 'Here is your list of projects',
                class: ['hero', 'is-primary', 'is-bold']
            };
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/mixins';

    .custom-title {
        @include font-size($h1-font-sizes);
    }

    @include breakpoint-up(sm) {
        .custom-subtitle {
            background: $color-gray-00;
            color: $color-gray-80;
            margin-top: 10px;
            padding: 10px;
        }
    }
</style>
