<template>
  <div id="project-time-tracking" v-if="!isLoading">
    <h4>Project Time Tracking</h4>
    <b-button variant="warning" v-b-modal.add-project-time><b-icon icon="plus" scale="1.5"></b-icon> Add Project Hours</b-button>
    <b-alert variant="warning" show v-if="projectHours.length == 0">There are no project hours added to this project yet.</b-alert>

    <Pie :chart-data="chartData" :chart-options="chartOptions" :height="200" :width="200" v-if="projectHours.length > 0" />

    <b-modal id="add-project-time" title="Add project hours" content-class="my-modal">
      <label>What project member performed this task?</label>
      <b-select :options="sanitizeUsers" v-model="time.user"></b-select>
      <label>What task was performed?</label>
      <b-select :options="tasks" v-model="time.taskName"></b-select>
      <label>How many hours were performed for this task?</label>
      <b-input v-model="time.hours" type="number"></b-input>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="addProjectHours()">
          Add Hours to Project
        </b-button>
      </template>
    </b-modal>

    <b-modal id="hour-breakdown" title="Detailed Hourly Breakdown" content-class="my-modal">

      <template #modal-footer="{ cancel }">
        <b-button size="sm" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="addProjectHours()">
          Add Hours to Project
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  components: {Pie},
  data(){
    return {
      isLoading: false,
      tasks: ['Requirements Gathering', 'Development', 'Testing'],
      projectTimeTracking: [],
      projectMembers: [],
      projectHours: [],
      time: {
        taskName: null,
        hours: null,
        user: null
      }
    }
  },
  async created(){
    try {
      this.isLoading = true;
      await this.fetchProjectMembers();
      await this.fetchProjectHours();
      this.isLoading = false;

    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    fetchProjectMembers: async function(){
      try {
        let projectMembers = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/project/team-members/${this.$route.params.id}`);
        this.projectMembers = projectMembers.data;
      } catch (error) {
        console.log(error);
      }
    },
    addProjectHours: async function(){
      try {
        let payload = {
          project: this.$route.params.id,
          taskName: this.time.taskName,
          hours: this.time.hours,
          user: this.time.user
        }
        await this.$http.post(`${process.env.VUE_APP_BASE_API_URL}/project/time`, payload);
        this.$bvModal.hide('add-project-time');
        await this.fetchProjectHours();
        this.time = {
          taskName: null,
          hours: null,
          user: null
        }
      } catch (error) {
        console.log(error);
      }
    },
    fetchProjectHours: async function(){
      try {
        let projectHours = await this.$http.get(`${process.env.VUE_APP_BASE_API_URL}/project/time/${this.$route.params.id}`);
        this.projectHours = projectHours.data;
      } catch (error) {
        console.log(error);
      }
    },
    pieClick: function(event, items){
      console.log(items[0].index);
    }
  },
  computed: {
    sanitizeUsers: function(){
      let arr = [];
      this.projectMembers.forEach(user => {
        arr.push({value: user.member._id, text: `${user.member.fname} ${user.member.lname} - ${user.member.email}`,})
      });
      return arr;
    },
    computeHoursByTask: function(){
      let hoursObj = {
        development: 0,
        testing: 0,
        projectManagement: 0
      }
      this.projectHours.forEach(hours => {
        if(hours.taskName == 'Development'){
          hoursObj.development += hours.hours;
        }
        if(hours.taskName == 'Testing'){
          hoursObj.testing += hours.hours;
        }
        if(hours.taskName == 'Requirements Gathering'){
          hoursObj.projectManagement += hours.hours;
        }
      });
      return hoursObj;
    },
    chartData: function(){
      return {
        labels: ['Development', 'Testing', 'Requirements Gathering'],
        datasets: [
          {
            label: 'd1',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [this.computeHoursByTask.development, this.computeHoursByTask.testing, this.computeHoursByTask.projectManagement]
          }
        ]
      }
    },
    chartOptions: function(){
      return {
        responsive: true,
        maintainAspectRatio: false,
        onClick: this.pieClick
      }
    }
  }
}
</script>

<style>

</style>