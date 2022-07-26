<template>
  <div>
    <div class="d-flex justify-content-center mb-3" v-if="isLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-if="!isLoading" class="content-container">
      <b-row>
        <b-col lg="12" sm="12">
          <h2>Users </h2>
          <p>Create new users here.  You'll need users in the system to be able to assign them to different projects.</p>

          <b-button variant="primary" v-b-modal.create-user><b-icon icon="plus" scale="1.5"></b-icon> Create a user</b-button>
          <b-table v-if="users.length > 0" :items="users" :fields="fields" hover >
          </b-table>
          <b-alert v-if="users.length == 0" show variant="primary">There are no users created.  Create a new user to get started.</b-alert>
        </b-col>
      </b-row>
      
      <b-modal id="create-user" title="Create a new user" content-class="my-modal">
        <label>First Name</label>
        <b-input v-model="newUser.fname"></b-input>
        <label>Last Name</label>
        <b-input v-model="newUser.lname"></b-input>
        <label>Email Address</label>
        <b-input v-model="newUser.email"></b-input>
        <label>Phone Number</label>
        <b-input v-model="newUser.mobileNumber"></b-input>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="primary" @click="createNewUser()">
            Save
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
      newUser: {
        fname: null,
        lname: null,
        email: null,
        mobileNumber: null,
      },
      users: [],
      fields: [
        {
          key: 'fname',
          sortable: true,
          label: "User Name"
        },
        {
          key: 'email',
          sortable: true,
          label: "Email Address"
        },
      ],
    }
  },
  created: async function(){
    try {
      this.isLoading = true;
      await this.fetchUsers();
      this.isLoading = false;

    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    myRowClickHandler: function(record, index){
      this.$router.push(`/projects/${record.id}`)
      console.log(record, index);
    },
    createNewUser: async function(){
      try {
        let payload = {
          fname: this.newUser.fname,
          lname: this.newUser.lname,
          email: this.newUser.email,
          mobileNumber: this.newUser.mobileNumber
        }
        await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/users`, payload);
        await this.fetchUsers();
        this.$bvModal.hide('create-user')
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
  }
}
</script>

<style>
td:hover {
  cursor: pointer;
}
</style>