<template>
    <section class="section">
        <div class="container">
            <b-table :data="projects"
                     :current-page.sync="currentPage"
                     :pagination-position="paginationPosition"
                     :paginated="isPaginated"
                     :per-page="perPage"
                     detail-key="id">
                <template slot-scope="props">

                    <b-table-column field="projectName" label="Project name" sortable>
                        <router-link :to="{ name: 'project-detail', params: { id: props.row.id }}">{{
                            props.row.projectName }}
                        </router-link>
                    </b-table-column>

                    <b-table-column width="220px" column field="projectId" label="Project ID" sortable>
                        <router-link v-if="props.row.projectId"
                                     :to="{ path: '/project/', params: { id: props.row.id }}">
                            {{ props.row.projectId }}
                        </router-link>
                        <div v-else>
                            <b-tooltip label="Tooltip message">
                                <scale-loader color="#e4e4e4" size="10px" height="10px" width="10px"/>
                            </b-tooltip>
                        </div>
                    </b-table-column>

                    <b-table-column field="createdAt" label="Since" sortable>
                        <div>
                            <b-tooltip :label="new Date(props.row.lastScan).toLocaleDateString()">
                                <span class="tag is-default"> {{ getDays(props.row.createdAt) }} </span>
                            </b-tooltip>
                        </div>
                    </b-table-column>

                    <b-table-column width="80px" field="alerts" label="Alerts" centered>
                        <b-taglist>
                            <b-tooltip label="Alerts">
                                <div v-if="props.row.alerts.blocking" class="tag has-text-weight-bold is-danger">
                                    {{ props.row.alerts.blocking }}
                                </div>
                            </b-tooltip>
                        </b-taglist>
                    </b-table-column>

                    <b-table-column field="testing" label="Scanner" centered>
                        <template slot="header" slot-scope="{ column }">
                            <b-tooltip label="Tool tip...">
                                {{ column.label }}
                            </b-tooltip>
                        </template>
                        <b-tooltip v-if='props.row.scanner === 0' label="Tool tip...">
                            <clip-loader size="25px"/>
                        </b-tooltip>
                        <b-tooltip v-else-if="props.row.scanner === 1" label="Tool tip...">
                            <b-icon icon="exclamation-circle" type="is-warning">
                            </b-icon>
                        </b-tooltip>
                        <b-icon v-else-if="props.row.scanner === 2" icon="circle" type="is-success">
                        </b-icon>
                    </b-table-column>

                    <b-table-column field="menue" icon="sliders-h" centered>
                        <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                            <b-icon type="is-default" icon="ellipsis-h" slot="trigger"/>
                            <b-dropdown-item v-if="props.row.projectId" aria-role="listitem">
                                <div class="media">
                                    <b-icon class="media-left" icon="file-download"/>
                                    <div class="media-content">
                                        <h3 class="has-text-weight-bold">Sign-off</h3>
                                        <small>Download the project Sign-Off documents</small>
                                    </div>
                                </div>
                            </b-dropdown-item>
                            <hr class="navbar-divider">
                            <b-dropdown-item v-if="props.row.projectId" aria-role="listitem"
                                             @click="confirmArchiving(props.row)">
                                <div class="media">
                                    <b-icon class="media-left" icon="box-open"/>
                                    <div class="media-content">
                                        <h3 class="has-text-weight-bold">Archive</h3>
                                        <small>Hide the project from everyone</small>
                                    </div>
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item v-else aria-role="listitem" @click="confirmDeletion(props.row)">
                                <div class="media">
                                    <b-icon class="media-left" icon="trash"/>
                                    <div class="media-content">
                                        <h3 class="has-text-weight-bold">Delete</h3>
                                        <small>Delete this project</small>
                                    </div>
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item
                                v-if="((!props.row.alerts.blocking) && props.row.projectId && (props.row.scanner !== false))"
                                aria-role="listitem" @click="confirmReadiness(props.row)">
                                <div class="media">
                                    <b-icon type="is-success" class="media-left" icon="check-double"/>
                                    <div class="media-content has-text-success">
                                        <h3 class="has-text-weight-bold">Ready</h3>
                                        <small>Mark this project as ready to be tested by PA</small>
                                    </div>
                                </div>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
    import {namespace} from 'vuex-class';
    import {Project} from '@/types/projectsTypes';

    const projectsModule = namespace('projects');

    @Component({
        name: 'projectList',
        components: {
            ClipLoader,
            ScaleLoader
        }
    })

    export default class ProjectList extends Vue {
        isPaginated = true;
        paginationPosition = 'bottom';
        currentPage = 1;
        perPage = 5;

        @projectsModule.Getter projects!: Project[];
        @projectsModule.Action getProjects: any;

        created() {
            this.getProjects();
        }

        getDays(dateString: string | number | Date) {
            const requestedAt = new Date(dateString).getTime();
            let now = new Date().getTime();
            let oneDay = 1000 * 60 * 60 * 24;
            let differenceMs = Math.round(Math.abs((now - requestedAt) / oneDay));
            return differenceMs + ' d';
        }

        confirmDeletion() {
            this.$buefy.dialog.confirm({
                title: 'Deleting project',
                message: 'Are you sure you want to <b>delete</b> this project? This action cannot be undone.',
                confirmText: 'Delete',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.$buefy.toast.open('Project deleted!')
            });
        }

        confirmArchiving() {
            this.$buefy.dialog.confirm({
                title: 'Archive project',
                message: 'Are you sure you want to <b>archive</b> this account? This action can be undone only with Portal Authority assistence.',
                confirmText: 'Archive',
                type: 'is-warning',
                hasIcon: true,
                onConfirm: () => this.$buefy.toast.open('Project archived!')
            });
        }

        confirmReadiness() {
            this.$buefy.dialog.confirm({
                title: 'Ready for planning',
                message: `
            <div class="content">
              <h2>Terms & Conditions</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
              <h3>Second level</h3>
              <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
              <ul>
                <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
                <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
                <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
                <li>Ut non enim metus.</li>
              </ul>
            </div>`,
                cancelText: 'Disagree',
                confirmText: 'Agree',
                type: 'is-success',
                onConfirm: () => this.$buefy.toast.open('User agreed')
            });
        }
    }
</script>
