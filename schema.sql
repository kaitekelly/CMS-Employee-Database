/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS employee_cms_DB;

/* Create database */
CREATE DATABASE employee_cms_DB;
USE employee_cms_DB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE  employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name  VARCHAR(30) NOT NULL, 
    role_id VARCHAR(30) NOT NULL, 
    manager_id VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
