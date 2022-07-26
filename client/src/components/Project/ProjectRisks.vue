<template>
  <div id="project-risks">
    <h4>Project Risks</h4>
    <b-button variant="info" v-b-modal.add-project-risk><b-icon icon="plus" scale="1.5"></b-icon> Add a project risk</b-button>
    <b-alert variant="info" show v-if="projectRisks.length == 0">There are no project risks added to this project yet.</b-alert>

    <b-table :items="projectRisks" :fields="projectRisksFields" hover responsive v-if="projectRisks.length > 0">
      <template #cell(severity)="data">
        <b-badge v-if="data.value == 'High'" variant="danger">{{data.value}}</b-badge>
        <b-badge v-if="data.value == 'Medium'" variant="warning">{{data.value}}</b-badge>
        <b-badge v-if="data.value == 'Low'" variant="info">{{data.value}}</b-badge>
      </template>
    </b-table>
    <!-- <b-alert variant="info" show>There are no project risks yet.</b-alert> -->
    <b-modal id="add-project-risk" title="Add a project risk">
      <label>Describe the project risk</label>
      <b-input v-model="risk.description"></b-input>
      <label>What is the severity level?</label>
      <b-select :options="severityLevels" v-model="risk.severity"></b-select>
      <label>What is the type of this risk?</label>
      <b-select :options="riskTypes" v-model="risk.type"></b-select>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="addProjectRisk()">
          Add Risk to project
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      severityLevels: ['Low', 'Medium', 'High'],
      riskTypes: ['Bug', 'Feature Request'],
      risk: {
        type: null,
        severity: null,
        description: null,
      },
      projectRisks: [],
      projectRisksFields: [
        {
          key: 'description',
          label: 'Risk Description',
        },
        {
          key: 'type',
          label: 'Type'
        },
        {
          key: 'severity',
          label: 'Severity',
          sortable: true
        }
      ]
    }
  },
  async created(){
    try {
      await this.fetchProjectRisks();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    fetchProjectRisks: async function(){
      try {
        let projectRisks = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/project/risks/${this.$route.params.id}`);
        this.projectRisks = projectRisks.data;
      } catch (error) {
        console.log(error);
      }
    },
    addProjectRisk: async function(){
      try {
        let payload = {
          project: this.$route.params.id,
          type: this.risk.type,
          severity: this.risk.severity,
          description: this.risk.description
        };
        await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/project/risks`, payload);
        this.$bvModal.hide('add-project-risk');
        await this.fetchProjectRisks();


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>

</style>