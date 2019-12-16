<template>
    <div>
        <section :class="[heroData.class]">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{heroData.title}}
                    </h1>
                    <h2 class="subtitle">
                        {{heroData.subtitle}}
                    </h2>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">

                <ValidationObserver ref="observer"
                                    v-slot="{ passes, valid }">
                    <projectQuestions/>
                    <hr>
                    <b-button size="is-medium"
                              expanded
                              :disabled="!valid"
                              @click='confirmIntakeSubmission'
                              type="is-primary">
                        Agree & Send
                    </b-button>
                </ValidationObserver>
            </div>
        </section>
    </div>
</template>

<script>
    import projectQuestions from '@/components/ProjectQuestions.vue';
    import {ValidationObserver} from 'vee-validate';
    import {mapActions} from 'vuex';

    export default {
        components: {
            projectQuestions,
            ValidationObserver
        },
        data() {
            return {
                heroData: {
                    title: 'Question',
                    subtitle: 'Here all important questions',
                    class: ['hero', 'is-danger', 'is-bold']
                }
            };
        },
        methods: {
            ...mapActions({
                resetIntake: 'intake/resetIntake'
            }),
            intakeConfirmSend() {
                this.$buefy.toast.open({
                    message: 'Intake form is send',
                    type: 'is-success'
                });
            },
            confirmIntakeSubmission() {
                this.$buefy.dialog.confirm({
                    message: 'Submit the intake form?',
                    onConfirm: () => this.intakeConfirmSend()
                });
            }
        }
    };
</script>
