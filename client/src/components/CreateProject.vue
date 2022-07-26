<template>
  <div id="create-project">
    <b-card>
      <h1>Create a new project</h1>
      <b-label>Name</b-label>
      <b-form-input v-model="project.name" type="text"></b-form-input>
      <b-label>Description</b-label>
      <b-form-input v-model="project.description" type="text"></b-form-input>
      <div id="assign-owner" >
        <b-label>Assign a project owner</b-label>
        <div class="vertical-align">
          <b-form-select v-model="selectedUser" :options="listOfUsers"></b-form-select>
          <b-button size="md" variant="primary" class="ml-2"><b-icon icon="plus"></b-icon></b-button>
        </div>

      </div>
      <div id="add-member" >
        <b-label>Add a project member</b-label>
        <div class="vertical-align">
         <b-form-select v-model="selectedProjectMember" :options="listOfUsers"></b-form-select>
         <b-button size="md" variant="primary" class="ml-2"><b-icon icon="plus"></b-icon></b-button>
        </div>
      </div>
      <hr>
      <b-label>Project Owner</b-label>
        <div v-if="project.owner">{{project.owner}}</div>
        <div v-if="!project.owner"><b-alert show variant="info">A project owner has not been assigned yet.</b-alert></div>

      <b-label>Project Members</b-label>
        <div v-if="project.members">{{project.owner}}</div>
        <div v-if="project.members.length == 0"><b-alert show variant="info">No members have been added to this project yet.</b-alert></div>
      <div class="align-right mt-4">
        <b-button variant="primary" >Create Project</b-button>
      </div>
    </b-card>

  </div>
</template>

<script>
export default {
  data(){
    return {
      project: {
        name: null,
        description: null,
        owner: null,
        members: []
      },
      listOfUsers: [
        {
          value: '001',
          text: 'Evan Vana',
          name: 'Evan Vana',
          email: 'evan@test.com'
        },
        {
          value: '002',
          text: 'John Doe',
          name: 'John Doe',
          email: 'John@test.com'
        },
        {
          value: '003',
          text: 'Jane Doe',
          name: 'Jane Doe',
          email: 'John@test.com'
        },
      ],
      selectedUser: null,
      selectedProjectMember: null,
      projectMembers: []
    }
    
  }
}
</script>

<style>
#create-project h1 {
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 100;
}
.card {
  padding: 20px;
  background-color: white;
}
b-label {
  text-transform: uppercase;
  color: rgb(70, 70, 70);
  font-weight: 400;
  font-size: 14px;
}
.align-right {
  text-align: right;
}
.vertical-align {
  display: flex;
  align-items: center;
}
</style>