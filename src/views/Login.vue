<template>
    <div class="modal-card">
        <section class="modal-card-body">

            <h3 class="title has-text-centered has-text-dark">Login</h3>
            <div class="box">
                <b-field label="E-Mail">
                    <b-input v-model="user.email" type="email" placeholder="E-Mail">
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input v-model="user.password" type="password" placeholder="Password" minlength="6"
                             password-reveal>
                    </b-input>
                </b-field>
                <button class="button is-dark is-large is-fullwidth"
                        @click="signUserIn(user)">
                    Login
                </button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Login} from '@/types/userTypes';
    import {namespace} from 'vuex-class';

    const userModule = namespace('user');

    @Component
    export default class LoginBox extends Vue {
        user: Login | {};

        constructor() {
            super();
            this.user = {
                email: '',
                password: ''
            };
        }

        @userModule.Action signUserIn: any;
    }
</script>

<style scoped lang="scss">
    .modal-card {
        margin-top: 40px;
    }
</style>
