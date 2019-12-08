<template>
    <nav class="navbar is-dark is-spaced" role="navigation" aria-label="main navigation">
        <div class="container">

            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="@/assets/images/logo-wide.png"
                         alt="Vue Typescript real world example">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   @click="toggleMenu"
                   :class="{'is-active' : mobileMenu}">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu nav-right nav-menu"
                 :class="{'is-active': mobileMenu}">
                <div class="navbar-start">

                    <router-link to="/my-projects" class="navbar-item">
                        My Projects
                    </router-link>
                    <router-link to="/new-project" class="navbar-item">
                        New Project
                    </router-link>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Submenu
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Projects Overview
                            </a>
                            <a class="navbar-item">
                                Services Overview
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                FAQ
                            </a>
                        </div>

                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            {{user.email}}
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Profile Options
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item"
                               @click="logout()">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {User} from '@/types/userTypes';

    @Component
    export default class NavigationBar extends Vue {
        @Prop() user!: User;
        mobileMenu: boolean = false;

        public logout() {
            this.$emit('logout', true);
        }

        toggleMenu() {
            this.mobileMenu = !this.mobileMenu;
        }
    }
</script>
