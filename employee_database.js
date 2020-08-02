const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

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
            // let roleArray = [];
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
        function (err, emp) {
            if (err) throw err;
            // let employeeArray = [];
            for (let i = 0; i < emp.length; i++) {
                let employeeList = emp[i].id + ' ' + emp[i].first_name + ' ' + emp[i].last_name + ' ' + emp[i].role_id + ' ' + emp[i].manager_id;
                console.log(employeeList + "from employee query");
                employeeArray.push(employeeList);
            }
        })

    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            // let roleArray = [];
            for (let i = 0; i < res.length; i++) {
                // let roleList = res[i].id + ' ' + res[i].title +  ' ' + res[i].salary + ' ' + res[i].department_id;
                let roleList = res[i].title;
                console.log(roleList + "from role query");
                roleArray.push(roleList);
            }
            askRole();
        })


    function askRole() {
        inquirer
            .prompt([{
                    name: "employee",
                    type: "list",
                    message: "What is the employee's name?",
                    choices: employeeArray
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What is the employee's NEW role?",
                    choices:
                        // choices: roleArray
                        // choices: [{
                        //         name: "manager",
                        //         value: 0
                        //     },
                        //     {
                        //         name: "Tech Lead",
                        //         value: 1
                        //     }
                        // ]
                    ["Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Account Manager",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"]
                },
            ]).then(function (answer) {
                // let updateRoleArr = [];
                // let updatedRole = JSON.parse(answer);
                // updateRoleArr.push(updatedRole);
                console.log(answer);
                // {answer: answer.role_id}
                connection.query(`UPDATE employee SET role_id = ${answer.role_id} WHERE`
                    // "UPDATE employee SET role_id WHERE first_name ? AND last_name ?", {
                    // "UPDATE employee SET ? WHERE ?", 
                    // [{
                    //         role_id: answer.role_id
                    //     },
                    //     {
                    //         answer: answer.id
                    //     }
                    // ]
                    ,
                    function (err, res) {
                        if (err) throw err;
                        console.table(res.affectedRows);
                        start();
                    });
            })
    }
}

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
                    message: "What is the employee's role?",
                    choices: roleArray
                }]).then(function (answer) {
                    console.log(answer);
                    console.log("deleting an employee....\n");
                    connection.query(
                        "DELETE FROM employee SET role_id WHERE ?", {
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


