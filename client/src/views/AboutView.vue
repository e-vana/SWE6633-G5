<template>
  <div class="content-container">
    <h2>About</h2>
    <p>The scope of this project is to prototype an application that performs project management tasks.  In this application, you can create users to assign to projects, create projects that can have project requirements, risks, basic time tracking and you can attach users with different roles to projects.</p>
    <p>Get started by clicking any of the navigation buttons up top.</p>
    <hr>
    <h3>SWE 6633 - Group 5 Members </h3>
    <p><b>Navya Pravalika Sabbula</b> - Project Lead</p>
    <p><b>Jordan Davidson</b> - Documentation, Diagramming</p>
    <p><b>Samet Yekta Guclu</b> - Documentation, Diagramming</p>
    <p><b>Veerama Boddapati</b> - Backend Development, Database Design</p>
    <p><b>Evan Vana</b> - Front End Development, Backend Development</p>
    <hr>
    <h3>Tools and Frameworks</h3>
    <p><b>Front End - </b> The UI is developed in the single page application architecture pattern.  It is written in a javascript framework called <a href="https://vuejs.org/">Vue JS</a>, a framework that allows you to create web application using component based design.  This framework includes Vue Router which allows a devloper to have web routing without fetching rendered pages from a server. </p>
    <p><b>UI Library - </b>The <a href="https://bootstrap-vue.org/">Bootstrap</a> component library was used to more quickly develop frontend functionality.</p>
    <p><b>Back End- </b> The backend / API layer was prototyped in <a href="https://spring.io/">Java Spring</a> and SQL.  For ease of implementation and deployment, that prototype and logic was converted into a javascript backend using <a href="https://expressjs.com/">the Express.js framework</a>.</p>
    <p><b>Deployment- </b> This web application is deployed on <a href="https://www.digitalocean.com/">Digital Ocean</a> using the App functionality.</p>
    <p><b>Testing - </b> Manual testing is performed using <a href="">Postman</a>, an application that allows you to test and manage API endpoints.  Postman can also generate basic documentation based on the routes and endpoints created.  You can find a copy of that documentation <a href="https://documenter.getpostman.com/view/4066939/UzXM1yom">here</a>. </p>
    <hr>
    <h3>Source Code</h3>
    <p>You can view all of the source code on Github.</p>
    <p>To run the code, you'll need to install <a href="">Node Js</a> and clone the repository. Once cloned, you can run the following commands:</p>
    <b-alert show variant="primary">In the /client directory
    <br>
    <code>npm install</code>
    <br>
    <code>npm run serve</code>
    </b-alert>
    <b-alert show variant="primary">In the /server directory
    <br>
    <code>npm install</code>
    <br>
    <code>nodemon</code>
    </b-alert>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>