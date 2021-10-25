DROP DATABASE IF EXISTS myCompany;
CREATE DATABASE myCompany;

USE myCompany;

CREATE TABLE department(
  department_id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  PRIMARY KEY (department_id)
);

CREATE TABLE employeeRole(
    employeeRole_id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (employeeRole_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INTEGER AUTO_INCREMENT NOT NULL, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employeeRole_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (employeeRole_id) REFERENCES employeeRole(employeeRole_id)
);