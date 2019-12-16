<template>
    <section class="section">
        <div class="content">
            <h3>Your favourite animal</h3>

            <ValidationProvider rules="required|atLeastTwo" name="reason" v-slot="{ errors, valid }">
                <b-field style="display: block;" :message="errors"
                         :type="{ 'is-danger': errors[0], 'is-success': valid }">
                    <p v-for="q in questions.firstQuestions"
                       :key='q.key'
                       class="reasoning">
                        <b-checkbox v-model='firstQuestions'
                                    :native-value="q.key">
                            {{ q.value }}
                        </b-checkbox>
                    </p>
                </b-field>
            </ValidationProvider>
        </div>
        <div class='content'>
            <div class='content'>
                <h3>Favourite sport</h3>
            </div>
            <ValidationProvider rules="required|atLeastTwo" name="other" v-slot="{ errors, valid }">
                <b-field style="display: block;" :message="errors"
                         :type="{ 'is-danger': errors[0], 'is-success': valid }">

                    <p v-for="q in questions.secondQuestions"
                       :key='q.key'
                       class="other">
                        <b-checkbox v-model='secondQuestions'
                                    :native-value="q.key">
                            {{ q.value }}
                        </b-checkbox>
                    </p>

                </b-field>
            </ValidationProvider>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {Component, Vue} from 'vue-property-decorator';
    import {ValidationProvider} from 'vee-validate';
    import {connectToStore} from '../helpers/store-connect';

    @Component({
        name: 'projectQuestions',
        components: {
            ValidationProvider
        },
        computed: {
            ...connectToStore([
                {'firstQuestions': []},
                {'secondQuestions': []}
            ], 'questions'),
            ...mapState({
                questions: state => state.questions.baseQuestions
            })
        }
    })

    export default class ProjectQuestions extends Vue {
    }

</script>
