<template>
  <div class="content-container">
    <b-row>
      <b-col lg="12" sm="12">
        <div class="project-information" v-if="!isLoading">
          <h2>{{project.name}}</h2>
          <p>{{project.description}}</p>
          <p><b>Project Manager:</b></p>
          <p>{{project.manager.email}}</p>
          <p><b>Project Owner:</b></p>
          {{project.owner.email}}
        </div>

         

        <div id="project-section-container">
          <!-- TEAM MEMBER SECTION -->
          <project-team-members></project-team-members>

          <!-- PROJECT REQUIREMENTS SECTION -->
          <project-requirements></project-requirements>

          <!-- PROJECT RISKS SECTION -->
          <project-risks></project-risks>

          <!-- PROJECT HOURS SECTION -->
          <project-time-tracking></project-time-tracking>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProjectRequirements from '../components/Project/ProjectRequirements.vue';
import ProjectRisks from '../components/Project/ProjectRisks.vue';
import ProjectTeamMembers from '../components/Project/ProjectTeamMembers.vue';
import ProjectTimeTracking from '../components/Project/ProjectTimeTracking.vue';
export default {
  components: { ProjectTeamMembers, ProjectRisks, ProjectRequirements, ProjectTimeTracking },
  data(){
    return {
      project: {},
      isLoading: false
    }
  },
  async created(){
    try {
      this.isLoading = true;
      await this.fetchProject();
      this.isLoading = false;

    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    fetchProject: async function(){
      try {
        let project = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/projects/${this.$route.params.id}`);
        this.project = project.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
/* .project-section {
  border: 1px solid rgb(233, 233, 233);
  border-radius: 5px;
  padding: 20px;
} */

#project-section-container > div{
  margin: 70px 0px;
}
</style>