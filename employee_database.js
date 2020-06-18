const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_password,
    database: "employee_cms_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
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
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all departments":
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
                    addRole();
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

function addEmployee() {
    //connection.query (SELECT * FROM roles, an array of objects will return including id, title, salary, dept id)
    //use map function  to create a new array where it is just returning the title as a string; from an 
    connection.query(
        "SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            let roleArray = [];
            roleArray.push(res[0].title);
            inquirer
                .prompt([{
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?"
                }, {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?"
                }, {
                    name: "role_id",
                    type: "rawlist",
                    message: "What is the employee's role?",
                    choices: roleArray
                    // choices: [
                    //     "Sales Lead",
                    //     "Salesperson",
                    //     "Lead Engineer",
                    //     "Software Engineer",
                    //     "Account Manager",
                    //     "Accountant",
                    //     "Legal Team Lead",
                    //     "Lawyer",
                    // ]
                }, {
                    name: "manager_id",
                    type: "input",
                    message: "What is the employee's manager's name?"
                }]).then(function (answer) {
                    console.log("adding an employee....\n");
                    connection.query(
                        "INSERT INTO employee SET ?", {
                            //*need to add the placeholder value for this object*
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role_id,
                            manager_id: answer.manager_id,
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " employee added!\n");
                            start();
                        });

                })
        });

}

function viewAllEmployees() {
    connection.query(
        "SELECT * FROM employee", 
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
            // *Call next function AFTER the INSERT completes*
        });
    // console.table(query.res);
        
}

// function viewDepartment() {
//     let query = connection.query(
//         "SELECT * FROM employee_cms_DB.departments", {

//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " view all employees!\n");
//             // *Call next function AFTER the INSERT completes*
//         });
//     console.table(query.sql);

//     //Legal
//     //Sales
//     //Finance
//     //Engineering

// }

// function viewManager() {

// }

function removeEmployee() {
    console.log("Removing employee...\n");
    connection.query(
        "DELETE FROM employee WHERE ?",
        [{
            first_name: ""
        }, {
            last_name: ""
        }, ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
            // Call readProducts AFTER the DELETE completes

        }
    );

}
// function addRole() {

// // Sales Lead
// // Salesperson
// //Lead Engineer
// // Software Engineer
// //Account Manager
// //Accountant
// //Legal Team Lead
// //Lawyer
// }

// function updateRole() {

// }

// function updateManager() {

// }

// function viewAllRoles() {
//     console.log("Viewing all roles...\n");
//   connection.query("SELECT * FROM roles", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     connection.end();
// }

// function removeRole() {

// }

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