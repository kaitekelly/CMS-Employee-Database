USE employee_cms_DB;

-- do not include this code below in final
-- CREATE TABLE  employee (
--     id INT NOT NULL AUTO_INCREMENT, 
--     first_name VARCHAR(30) NOT NULL, 
--     last_name  VARCHAR(30) NOT NULL, 
--     role_id INT, 
--     manager_id INT NULL
-- );

--add employee
INSERT INTO employee SET ?, { first_name: last_name: role_id: manager_id: }
VALUES ("Kaite", "Kelly", 101, 201);

-- add Role
// Sales Lead -2
// Salesperson -2
//Lead Engineer -3
// Software Engineer -3
//Account Manager -4
//Accountant -5
//Legal Team Lead -6
//Lawyer -6
Manager -1
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 150000, 2), ('Salesperson', 100000, 2), ('Lead Engineer', 200000, 3), ('Software Engineer', 150000, 3), 
('Account Manager', 90000, 4), ('Accountant', 90000, 5), ('Legal Team Lead', 200000, 6), ('Lawyer', 170000, 6);



INSERT INTO departments (name, department_id)
VALUES ('Sales', 2), ('Engineering', 3), ('Account Management', 4), ('Finance', 5), ('Legal', 6),

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

 * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

--    choices: [
--                          "Sales Lead",
--                         "Salesperson",
--                         "Lead Engineer",
--                         "Software Engineer",
--                         "Account Manager",
--                         "Accountant",
--                          "Legal Team Lead",
--                        "Lawyer",
--                     ]

 "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],

`"DELETE FROM employee WHERE ?",
