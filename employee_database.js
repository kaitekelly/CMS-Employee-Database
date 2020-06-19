const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

let roleList = [];
let roleArray = [];
let employeeArray = [];
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
                "Add employee",
                "Add role",
                "Add department",
                "View all employees",
                "View all departments",
                "View all roles",
                "Update employee role",
                //bonus below
                "View employees by manager",
                "Update employee manager",
                "Delete employee",
                "Delete role",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add employee":
                    addEmployee();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add department":
                    addDepartment();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all departments":
                    viewDepartment();
                    break;

                case "View all employees by manager":
                    viewManager();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Delete employee":
                    deleteEmployee();
                    break;

                case "Update employee manager":
                    updateManager();
                    break;

                case "Delete role":
                    deleteRole();
                    break;

            }
        })
}

function addEmployee() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.log(res + "from line 108");
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
                // let roleList = res[i].id + ' ' + res[i].title +  ' ' + res[i].salary + ' ' + res[i].department_id;
                let roleList = res[i].title;
                console.log(roleList + "from line 111");
                roleArray.push(roleList);
            }
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

function addRole() {
    connection.query(
        "SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            let titleArray = [];
            titleArray.push(res[0].title);
            inquirer
                .prompt([{
                        name: "title",
                        type: "input",
                        message: "What is the title of the role you would like to create?"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What is the salary for this role?"
                    },
                    {
                        name: "department_id",
                        type: "input",
                        message: "What is the department id for this role?"
                    },
                ]).then(function (answer) {
                    console.log(`You have added the role ${answer.title}`);
                    connection.query(
                        "INSERT INTO role SET ?", {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.department_id,
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.table(res.affectedRows);
                            start();
                        });
                })
        });
}

function addDepartment() {
    connection.query(
        "SELECT * FROM departments",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            let deptArray = [];
            deptArray.push(res[0].name);
            inquirer
                .prompt([{
                        name: "id",
                        type: "input",
                        message: "What is the id of the department you would like to create?"
                    },
                    {
                        name: "name",
                        type: "input",
                        message: "What is the name of the department you would like to create?"
                    },
                ]).then(function (answer) {
                    console.log(`You have added the dept ${answer.dept}`);
                    connection.query(
                        "INSERT INTO departments SET ?", {
                            id: answer.id,
                            name: answer.name,
                            // department_id: answer.department_id,
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.table(res.affectedRows);
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
        });
}

function viewDepartment() {
    connection.query(
        "SELECT * FROM departments",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

function viewAllRoles() {
    connection.query(
        "SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

function updateRole() {
    connection.query(
        "SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            inquirer
                .prompt([{
                        name: "first_name",
                        type: "input",
                        message: "What is the employee's first name?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the employee's last name?"
                    }, {
                        name: "role_id",
                        type: "rawlist",
                        message: "What is the employee's NEW role?",
                        choices: [
                            "Sales Lead",
                            "Salesperson",
                            "Lead Engineer",
                            "Software Engineer",
                            "Account Manager",
                            "Accountant",
                            "Legal Team Lead",
                            "Lawyer",
                        ]
                    },
                ]).then(function (answer) {
                    console.log("updating employee role....\n");
                    connection.query(
                        "UPDATE employee SET role_id WHERE (?,?,?)", {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role_id
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.table(res.affectedRows);
                            start();
                        });
                })
        });
}





// function viewManager() {

// }

function deleteEmployee() {
    console.log("Removing employee...\n");
    connection.query(
        "SELECT * FROM employee",
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
                    message: "What is the employee's NEW role?",
                    choices: roleArray
                }]).then(function (answer) {
                    console.log(answer);
                    console.log("deleting an employee....\n");
                    connection.query(
                        "UPDATE employee SET role_id WHERE ?", {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role_id
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " employee deleted!\n");
                            console.table(res);
                            start();
                        }

                    );

                })
        })
}

function updateManager() {
    connection.query(
        "SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            inquirer
                .prompt([{
                        name: "first_name",
                        type: "input",
                        message: "What is the employee's first name?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the employee's last name?"
                    }, {
                        name: "role_id",
                        type: "rawlist",
                        message: "What is the employee's NEW role?",
                        choices: [
                            "Sales Lead",
                            "Salesperson",
                            "Lead Engineer",
                            "Software Engineer",
                            "Account Manager",
                            "Accountant",
                            "Legal Team Lead",
                            "Lawyer",
                        ]
                    },
                ]).then(function (answer) {
                    console.log("updating employee role....\n");
                    connection.query(
                        "UPDATE employee SET role_id WHERE ?", {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role_id
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.table(res.affectedRows);
                            start();
                        });
                })
        });
}

// function updateManager() {

// }


//     console.log("Viewing all roles...\n");
//   connection.query("SELECT * FROM roles", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     connection.end();




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