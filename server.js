const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

//inquirer questions
const mainMenuQuestions = [
  {
    type: 'list',
    name: 'menu',
    message: "What would you like to do?",
    choices: ["View Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update Role"]
  }
]

let coolFunc = function(){
  inquirer.prompt(mainMenuQuestions).then(inquirerResponses => {
    console.log(inquirerResponses.menu);
    let switchAnswer = inquirerResponses.switch
    switch (switchAnswer) {
      case "View Employees":
          //view employees
          break;
      case "View Departments":
          //view departments
          break;
      case "View Roles":
          //view roles
          break;
      case "Add Employee":
          //"Add Employee"
          break;
      case "Add Department":
          //"Add Department"
          break;
      case "Add Role":
          //"Add Role"
          break;
      case "Update Role":
        //Update role
        break;
  }
  })
};


//axios passing answers to post requests

//display relevant table

coolFunc();