const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const http = require('node:http');
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
    //console.log(`Server running on port ${PORT}`);
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

const addDepartmentQuestions = [
  {
    type: 'input',
    name: 'department_name',
    message: "Enter new Department Name",
    validate: first_name => {
      if (first_name) {
        return true;
      } else {
        console.log("Please enter Department Name!");
        return false;
      }
    }
  }
]

const addRoleQuestions = [
  {
    type: 'input',
    name: 'role_name',
    message: "Enter new Role Name",
    validate: role_name => {
      if (role_name) {
        return true;
      } else {
        console.log("Please enter Role Name!");
        return false;
      }
    }
  },
  {
    type: 'number',
    name: 'salary',
    message: "Enter new Role's Salary",
    validate: role_name => {
      if (role_name) {
        return true;
      } else {
        console.log("Please enter Salary!");
        return false;
      }
    }
  },
  {
    type: 'number',
    name: 'department_id',
    message: "Enter new Role's Department ID",
    validate: role_name => {
      if (role_name) {
        return true;
      } else {
        console.log("Please enter Department ID!");
        return false;
      }
    }
  }
]

const addEmployeeQuestions = [
  {
    type: 'input',
    name: 'first_name',
    message: "Enter Employee's First Name",
    validate: first_name => {
      if (first_name) {
        return true;
      } else {
        console.log("Please enter Employee's First Name!");
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'last_name',
    message: "Enter Employee's Last Name",
    validate: last_name => {
      if (last_name) {
        return true;
      } else {
        console.log("Please enter Employee's Last Name!");
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'role',
    message: "Enter Employee's Role",
    validate: role => {
      if (role) {
        return true;
      } else {
        console.log("Please enter Employee's Role!");
        return false;
      }
    }
  },
  {
    type: 'number',
    name: 'manager_id',
    message: "Enter Employee's Manager ID Number",
    validate: manager_id => {
      if (manager_id) {
        return true;
      } else {
        console.log("Please enter Employee's Manager ID Number!");
        return false;
      }
    }
  }
]
const updateEmployeeQuestions = [
  {
    type: 'number',
    name: 'employee_id',
    message: "Enter ID number of Employee",
    validate: employee_id => {
      if (employee_id) {
        return true;
      } else {
        console.log("Please enter ID number of Employee!");
        return false;
      }
    }
  },
  {
    type: 'number',
    name: 'role_id',
    message: "Enter Desired Role ID",
    validate: role_id => {
      if (role_id) {
        return true;
      } else {
        console.log("Please enter ID of new Role!");
        return false;
      }
    }
  }
]

let coolFunc = function(){
  inquirer.prompt(mainMenuQuestions).then(inquirerResponses => {
    console.log(inquirerResponses.menu);
    let switchAnswer = inquirerResponses.menu
    switch (switchAnswer) {
      case "View Employees":
        axios.get('http://localhost:3001/api/employee').then(function (response) {
          // handle success
          console.table(response.data.data);
          coolFunc();
        })
          break;
      case "View Departments":
        axios.get('http://localhost:3001/api/departments').then(function (response) {
          // handle success
          console.table(response.data.data);
          coolFunc();
        })
          break;
      case "View Roles":
        axios.get('http://localhost:3001/api/roles').then(function (response) {
          // handle success
          console.table(response.data.data);
          coolFunc();
        })
          break;
      case "Add Employee":
        inquirer.prompt(addEmployeeQuestions).then(inquirerResponses => {
          let myfirst_name = inquirerResponses.first_name
          let mylast_name = inquirerResponses.last_name
          let myrole = inquirerResponses.role
          let mymanager = inquirerResponses.manager_id
          axios.post('http://localhost:3001/api/employee', {
            first_name: `${myfirst_name}`,
            last_name: `${mylast_name}`,
            role_id: `${myrole}`,
            manager_id: `${mymanager}`
          });
          console.log(`${myfirst_name} added to Database.`);
          coolFunc();
        });
          break;
      case "Add Department":
        inquirer.prompt(addDepartmentQuestions).then(inquirerResponses => {
          let mydepartment_name = inquirerResponses.department_name
          axios.post('http://localhost:3001/api/departments', {
            department_name: `${mydepartment_name}`
          });
          console.log(`${mydepartment_name} added to Database.`);
          coolFunc();
        });
          break;
      case "Add Role":
        inquirer.prompt(addRoleQuestions).then(inquirerResponses => {
          let myrole_name = inquirerResponses.role_name;
          let mysalary = inquirerResponses.salary;
          let mydepartment_id = inquirerResponses.department_id;
          axios.post('http://localhost:3001/api/roles', {
            title: `${myrole_name}`,
            salary: `${mysalary}`,
            department_id: `${mydepartment_id}`
          });
          console.log(`${myrole_name} added to Database.`);
          coolFunc();
        })
          break;
      case "Update Role":
        inquirer.prompt(updateEmployeeQuestions).then(inquirerResponses => {
          let myemployee_id = inquirerResponses.employee_id
          let desired_role = inquirerResponses.role_id
          axios.put(`http://localhost:3001/api/employee/${myemployee_id}`, {
            role_id: `${desired_role}`
          })
          console.log(`Role Changed.`);
          coolFunc();
        })
        break;
  }
  })
};



coolFunc();

// axios.post('http://localhost:3001/api/departments', {
//   department_name: 'Oversight'
// })


