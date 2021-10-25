-- departments
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Information Technology');
INSERT INTO department (department_name) VALUES ('Operations');
INSERT INTO department (department_name) VALUES ('Maketing');
INSERT INTO department (department_name) VALUES ('Facilities');

-- roles
INSERT INTO employeeRole (title, salary, department_id) VALUES ('CEO', '350000.00', 3);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('IT Manager', '150000.00', 2);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('HR Manager', '125000.00', 1);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Operations Manager', '100000.00', 3);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Mkt Manager', '95000.00', 4);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Facilities Manager', '95000.00', 5);
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Worker Bee', '50000.00', 3);

INSERT INTO employee (first_name, last_name, employeeRole_id) VALUES ('Curt', 'Kubiak', 1);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Paul', 'Thomas', 2, 1);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Tricia', 'Andrist', 3, 1);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Amy', 'Sommerville', 4, 1);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Ryan', 'Lindemann', 4, 1);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Russ', 'Gignac', 6, 1);

INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Deanna', 'Thomas', 7, 4);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Nancy', 'Stumpf', 7, 4);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Chris', 'Nicolas', 7, 4);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Angie', 'Boudreau', 7, 4);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Melissa', 'Abraham', 7, 4);
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES ('Tonya', 'Miller', 7, 4);