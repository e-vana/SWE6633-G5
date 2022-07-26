<template>
<div>
  <loader-component v-if="isLoading"></loader-component>
  <div id="project-team-members" v-if="!isLoading">
    <h4>Project Team Members</h4>
    <b-button variant="primary" v-b-modal.add-project-team-member><b-icon icon="plus" scale="1.5"></b-icon> Add a team member</b-button>
    <b-table v-if="projectMembers.length > 0" :items="projectMembers" :fields="projectMemberFields" hover responsive></b-table>
    <b-alert variant="primary" show v-if="projectMembers.length == 0">There are no team members added to this project yet.</b-alert>

    <b-modal id="add-project-team-member" title="Add a team member to this project" content-class="my-modal">
      <label>Which user would you like to add to this project?</label>
      <b-select :options="sanitizeUsers" v-model="newMember.member"></b-select>
      <label>Which role does this user have in this project?</label>
      <b-select :options="userRoles" v-model="newMember.role"></b-select>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="addUserToProject()">
          Add User to Project
        </b-button>
      </template>
    </b-modal>
  </div>
  </div>
</template>

<script>
import LoaderComponent from '../Utility/LoaderComponent.vue';
export default {
  components: { LoaderComponent },
  data(){
    return {
    isLoading: false,
    userRoles: ['Developer', 'QA', 'Project Management'],
    newMember: {
      member: null,
      role: null
    },
    users: [],
    projectMembers: [],
    projectMemberFields: [
        {
          key: 'member.fname',
          label: 'First Name',
        },
        {
          key: 'member.email',
          label: 'Email',
        },
        {
          key: 'role',
          label: 'Role',
          sortable: true
        },

      ],
    }
  },
  async created(){
    try {
      this.isLoading = true;
      await this.fetchUsers();
      await this.fetchProjectMembers();
      this.isLoading = false;

    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    fetchUsers: async function(){
      try {
        let users = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/users`);
        this.users = users.data;
      } catch (error) {
        console.log(error);
      }
    },
    fetchProjectMembers: async function(){
      try {
        let projectMembers = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/project/team-members/${this.$route.params.id}`);
        this.projectMembers = projectMembers.data;
      } catch (error) {
        console.log(error);
      }
    },
    addUserToProject: async function(){
      try {
        let payload = {
          project: this.$route.params.id,
          member: this.newMember.member,
          role: this.newMember.role
        };
        await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/project/team-members`, payload);
        this.$bvModal.hide('add-project-team-member')
        await this.fetchProjectMembers();
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
    },
  }
}
</script>

<style>


</style>