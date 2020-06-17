const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "whitecat1",
    database: "employee_cms_DB"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // start();
  });

function start() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "Add role",
          "View all roles",
          "Remove role",
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
        viewEmployees();
        break;

        case "View all employees by department":
        viewDepartment();
        break;

        case "View all employees by manager":
        viewManager();
        break;

        case "Add employee":
        addEmployee();
        break;

        case "Remove employee":
            removeEmployee();
        break;

        case "Update employee role":
            updateRole();
        break;

        case "Update employee manager":
            updateManager();
        break;

        case "Add role":
            viewAllEmployees();
        break;

        case "View all roles":
            viewAllRoles();
        break;

        case "Remove role":
            removeRole();
        break;

        

        }
    })
}

function viewAllEmployees() {

}

function viewDepartment() {

}

function viewManager() {

}

function addEmployee() {

}

function removeEmployee() {

}

function updateRole() {

}

function updateManager() {

}

function viewAllRoles() {

}

function removeRole() {

}

//  pseudocode

//schema
//employee
//role
//department

//start function - Questions: What would you like to do
  //list choices, .then(answer -> switch case to choices, then to that function)

  //.then with if statements to 

  //create function- employee record
  //read function - list choices to retrieve and select employee record
  //update function- employee record (addEmployee function, update employee role function, )
  // delete function - employee record


