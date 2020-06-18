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
// Sales Lead
// Salesperson
//Lead Engineer
// Software Engineer
//Account Manager
//Accountant
//Legal Team Lead
//Lawyer
INSERT INTO role (title, salary, department_id)
VALUES (NULL, NULL, NULL);

 * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to



