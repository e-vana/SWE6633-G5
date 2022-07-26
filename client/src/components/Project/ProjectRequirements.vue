<template>
  <div>
    <div class="d-flex justify-content-center mb-3" v-if="isLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div id="project-requirements" v-if="!isLoading">
      <h4>Project Requirements</h4>
      <b-button variant="success" v-b-modal.add-project-requirement><b-icon icon="plus" scale="1.5"></b-icon> Add a project requirement</b-button>
      <b-alert variant="success" show v-if="projectRequirements.length == 0">There are no project requirements added to this project yet.</b-alert>
      
      <b-table :items="projectRequirements" :fields="projectRequirementFields" hover responsive v-if="projectRequirements.length > 0">
        <template #cell(priority)="data">
          <b-badge v-if="data.value == 'High'" variant="danger">{{data.value}}</b-badge>
          <b-badge v-if="data.value == 'Medium'" variant="warning">{{data.value}}</b-badge>
          <b-badge v-if="data.value == 'Low'" variant="info">{{data.value}}</b-badge>
        </template>
      </b-table>
      <!-- <b-alert variant="success" show>There are no project requirements yet.</b-alert> -->
      <b-modal id="add-project-requirement" title="Add a project requirement" content-class="my-modal">
        <label>Describe the project requirement</label>
        <b-input v-model="requirement.description"></b-input>
        <label>Is this a functional or non-functional requirement?</label>
        <b-select :options="functionalOrNonFunctional" v-model="requirement.type"></b-select>
        <label>What is the priority level?</label>
        <b-select :options="priorityLevels" v-model="requirement.priority"></b-select>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="primary" @click="addProjectRequirement()">
            Add Requirement to Project
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLoading: false,
      priorityLevels: ['Low', 'Medium', 'High'],
      functionalOrNonFunctional: ['Functional', 'Non-Functional'],
      requirement: {
        description: null,
        type: null,
        priority: null
      },
      projectRequirementFields: [
        {
          key: 'description',
          label: 'Requirement',
        },
        {
          key: 'type',
          label: 'Type'
        },
        {
          key: 'priority',
          label: 'Priority',
          sortable: true
        }
      ],
      projectRequirements: [],
    }
  },
  async created(){
    try {
      this.isLoading = true;
      await this.fetchProjectRequirements();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    fetchProjectRequirements: async function(){
      try {
        let projectRequirements = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/project/requirements/${this.$route.params.id}`);
        this.projectRequirements = projectRequirements.data;
      } catch (error) {
        console.log(error);
      }
    },
    addProjectRequirement: async function(){
      try {
        let payload = {
          project: this.$route.params.id,
          type: this.requirement.type,
          priority: this.requirement.priority,
          description: this.requirement.description
        };
        let projectRequirements = await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/project/requirements`, payload);
        this.projectRequirements = projectRequirements.data;
        this.$bvModal.hide('add-project-requirement')
        await this.fetchProjectRequirements();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
.my-modal {
  padding: 20px;
}
input {
  margin-bottom: 20px;
}

</style>