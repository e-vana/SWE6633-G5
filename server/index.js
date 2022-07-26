require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const Project = require('./models/project');
const User = require('./models/user');
const ProjectMember = require('./models/projectMembers');
const ProjectRequirement = require('./models/projectRequirement');
const ProjectRisk = require('./models/projectRisk');
const ProjectTime = require('./models/projectTime');


const serveStatic = require("serve-static");
const path = require("path");


app.use(bodyParser.json())
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS, PATCH"
  );
  next();
});




async function startup(){
  try {
    await mongoose.connect(process.env.DB);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

startup();


//----------------- PROJECTS ------------------
app.get('/projects', async (req, res) => {
  let projects = await Project.find();
  res.send(projects);
});
app.post('/projects', async (req, res) => {
  let newProject = await Project.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
    manager: req.body.manager
  });
  res.send(newProject);
})
app.get('/projects/:id', async (req, res) => {
  let project = await Project.findById(req.params.id).populate('owner').populate('manager');
  res.send(project);
})


//----------------- USERS ------------------
app.post('/users', async (req, res) => {
  let newUser = await User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    role: req.body.role,
    mobileNumber: req.body.mobileNumber
  });
  res.send(newUser);
})
app.get('/users', async (req, res) => {
  let users = await User.find();
  res.send(users);
})
app.get('/users/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  res.send(user);
})


//----------------- PROJECT MEMBERS ------------------
app.get('/project/team-members/:id', async (req, res) => {
  let projectMembers = await ProjectMember.find({project: req.params.id}).populate('member');
  res.send(projectMembers);
})
app.post('/project/team-members', async (req, res) => {
  let newMember = await ProjectMember.create({
    project: req.body.project,
    member: req.body.member,
    role: req.body.role
  })
  res.send(newMember);
});



//----------------- PROJECT REQUIREMENTS ------------------
app.get('/project/requirements/:projectId', async (req, res) => {
  let requirements = await ProjectRequirement.find({project: req.params.projectId});
  res.send(requirements);
})
app.post('/project/requirements/', async (req, res) => {
  let newRequirement = await ProjectRequirement.create({
    project: req.body.project,
    type: req.body.type,
    priority: req.body.priority,
    description: req.body.description
  });
  res.send(newRequirement);
})


//----------------- PROJECT RISKS ------------------
app.get('/project/risks/:projectId', async (req, res) => {
  let risks = await ProjectRisk.find({project: req.params.projectId});
  res.send(risks);
})
app.post('/project/risks/', async (req, res) => {
  let newRisk = await ProjectRisk.create({
    project: req.body.project,
    type: req.body.type,
    severity: req.body.severity,
    description: req.body.description,
    resolved: req.body.resolved
  });
  res.send(newRisk);
})

//----------------- PROJECT TIME ------------------
app.get('/project/time/:projectId', async (req, res) => {
  let time = await ProjectTime.find({project: req.params.projectId}).populate('user');
  res.send(time);
})
app.post('/project/time/', async (req, res) => {
  let newTime = await ProjectTime.create({
    project: req.body.project,
    taskName: req.body.taskName,
    hours: req.body.hours,
    user: req.body.user
  });
  res.send(newTime);
});

app.use("/", serveStatic(path.join(__dirname, "/build")));
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});



