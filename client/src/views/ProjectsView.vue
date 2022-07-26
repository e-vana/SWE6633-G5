<template>
  <div>
    <div class="d-flex justify-content-center mb-3" v-if="isLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-if="!isLoading" class="content-container">
      <b-row>
        <b-col lg="12" sm="12">
          <h2>Your Projects </h2>
          <p>Create new projects here.  You can add project requirements, project risks, add users to the project and track project times per task.</p>
          <b-button variant="primary" v-b-modal.create-project><b-icon icon="plus" scale="1.5"></b-icon> Create a new project</b-button>
          <b-table v-if="projects.length > 0" :items="projects" :fields="fields" hover  @row-clicked="myRowClickHandler">
          </b-table>
          <b-alert v-if="projects.length == 0" show variant="primary">There are no projects added yet.  Create a new project to get started.</b-alert>
        </b-col>
      </b-row>
      
      <b-modal id="create-project" title="Create a new project" content-class="my-modal">
        <label>What is the name of this project?</label>
        <b-input v-model="newProject.name"></b-input>
        <label>Project description</label>
        <b-input v-model="newProject.description"></b-input>

        <!-- select a user to be project manager -->
        <label>Assign a project owner</label>
        <b-select :options="sanitizeUsers" v-model="newProject.owner"></b-select>

        <!-- select a user to be project owner -->
        <label>Assign a project manager</label>
        <b-select :options="sanitizeUsers" v-model="newProject.manager"></b-select>

        <template #modal-footer="{ cancel }">
          <b-button size="sm" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="primary" @click="createNewProject()">
            Create
          </b-button>
        </template>

      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      fields: [
        {
          key: 'name',
          sortable: true,
          label: "Project Name"
        },
      ],
      projects: [],
      users: [],
      newProject: {
        name: null,
        description: null,
        owner: null,
        manager: null,
        createUser: null,
      }
    }
  },
  created: async function(){
    try {
      this.isLoading = true;
      await this.fetchProjects();
      await this.fetchUsers();
      this.isLoading = false;

    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    myRowClickHandler: function(record){
      this.$router.push(`/projects/${record._id}`)
    },
    createNewProject: async function(){
      try {
        let payload = this.newProject;
        await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/projects`, payload);
        this.fetchProjects();
        this.$bvModal.hide('create-project')
      } catch (error) {
        console.log(error);
      }
    },
    fetchProjects: async function(){
      try {
        let projects = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/projects`);
        this.projects = projects.data;
      } catch (error) {
        console.log(error);
      }
    },
    fetchUsers: async function(){
      try {
        let users = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/users`);
        this.users = users.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    sanitizeUsers: function(){
      let arr = [];
      this.users.forEach(user => {
        arr.push({value: user._id, text: `${user.fname} ${user.lname} - ${user.email}`,})
      });
      return arr;
    }
  }
}
</script>

<style>
td:hover {
  cursor: pointer;
}


</style>