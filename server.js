const myExpress  = require('express');
const mySQL      = require('mysql2');
const myInquirer  = require('inquirer');
//require("console.table");

var myArrayDepartments = [];
var myArrayRoles       = [];
var myArrayEmployees   = [];

// Open Connection to Database
const myDBConnection = mySQL.createConnection({
    host: 'localhost'
    , port: 3306
    , user: 'root'
    , password: 'MySQL2021/'
    , database: 'myCompany'
});

myDBConnection.connect(function (err) {
    if (err) throw err;

    console.log('id' + myDBConnection.threadId);

    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`);
    
    getMenu();
});

function getMenu() {
    myInquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Pick an option:",
      choices: 
      [
          "view all departments"
          , "view all roles"
          , "view all employees"
          , "add a department"
          , "add a role"
          , "add an employee"
          , "update an employee role"
          , "update employee managers"
          , "view employees by manager"
          , "view employees by department"
          , "delete department"
          , "delete role"
          , "delete employees"
          ,  "view the total utilized budget of a department"
          , "End"
      ]
    })
    .then(function ({ task }) {
        switch (task) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();                
                break;                
            case 'add a department':
                addDepartment();
                break;   
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;                
            case 'update an employee role':
                updateEmployeeRole();
                break;                
            case 'update employee managers':
                updateEmployeeManager();
                break;                
            case 'view employees by manager':
                viewEmployeesByManager();
                break;                
            case 'view employees by department':
                viewEmployeesByDepartment();
                break;
            case 'delete department':
                deleteDepartment();
                break;                
            case 'delete role':
                deleteRole();
                break;                
            case 'delete employees':
                deleteEmployee();
                break;                
            case 'view the total utilized budget of a department':
                viewDepartmentBudget();
                break;                
            case "End":
                myDBConnection.end();
                break;
        }
    });    
}

function viewDepartments() {
    console.log('View Departments\n');

    var myQuery = 'SELECT * FROM department;';
    myDBConnection.query(myQuery, function (err, res) {
        if (err) throw err;

        console.table(res);

        myArrayDepartments = [];
        for (i = 0; i < res.length; i++) {
            myArrayDepartments.push(res[i].department_id + '-' + res[i].department_name);
        };

        getMenu();
    });
};

function viewRoles() {
    console.log('View Roles\n');

    var myQuery = `
        SELECT 
            r.title
            , r.employeeRole_id
            , d.department_name
            , r.salary 
        FROM employeeRole r
        LEFT JOIN department d
            ON d.department_id = r.department_id;
        `;
    myDBConnection.query(myQuery, function (err, res) {
        if (err) throw err;

        console.table(res);

        myArrayRoles = [];        
        for (i = 0; i < res.length; i++) {
            myArrayRoles.push(res[i].employeeRole_id + '-' + res[i].title);
        };

        getMenu();
    });
};

function viewEmployees() {
    console.log('View Employees\n');

    var myQuery = `
        SELECT 
            e.employee_id
            , e.first_name
            , e.last_name
            , d.department_name
            , r.title
            , r.salary
            , (SELECT e2.last_name FROM employee e2 WHERE e2.employee_id =  e.manager_id) AS manager_name
        FROM employee e
        LEFT JOIN employeeRole r
            ON r.employeeRole_id = e.employeeRole_id
        LEFT JOIN department d
            ON d.department_id = r.department_id;
        `;
    myDBConnection.query(myQuery, function (err, res) {
        if (err) throw err;

        console.table(res);

        myArrayEmployees = [];
        for (i = 0; i < res.length; i++) {
            myArrayEmployees.push(res[i].employee_id + '-' + res[i].first_name + ' ' + res[i].last_name);
        };

        console.log(myArrayEmployees);

        getMenu();
    });
};

function addDepartment() {
    console.log('Add Department\n');

    myInquirer
    .prompt([ 
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter department:'
        }
    ])
    .then(function (myAnswer) {
        console.log(myAnswer.deptName);

        var query = 'INSERT INTO department (department_name) VALUES (?)';

        myDBConnection.query(query, myAnswer.deptName,
        function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log('Department Added.');

            getMenu();            
        });
    });    
};

function addRole() {
    console.log('Add Role\n');

    myInquirer
    .prompt([ 
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter Role:'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter Salary:'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Pick Department:',
            choices: myArrayDepartments
        }
    ])
    .then(function (myAnswer) {
        //console.log(myAnswer.roleName);
        //console.log(myAnswer.roleSalary);        
        //console.log(myAnswer.departmentId);

        var myString = myAnswer.departmentId.split('-');
        console.log(myString[0]);

        var query  = 'INSERT INTO employeeRole (title, salary, department_id) VALUES (?, ?, ?)';
        var params = [myAnswer.roleName, myAnswer.roleSalary, myString[0]];

        myDBConnection.query(query, params,
        function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log('Role Added.');

            getMenu();            
        });
    });    
}

function addEmployee() {
    console.log('Add Employee\n');

    myInquirer
    .prompt([ 
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter First Name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter Last Name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Pick Role:',
            choices: myArrayRoles
        },
        {
            type: 'list',
            name: 'employeeId',
            message: 'Pick Manager:',
            choices: myArrayEmployees
        }
    ])
    .then(function (myAnswer) {
        console.log(myAnswer.firstName);
        console.log(myAnswer.lastName);        
        console.log(myAnswer.roleId);
        console.log(myAnswer.employeeId);        

        var myString = myAnswer.roleId.split('-');
        console.log(myString[0]);        
        var myRoleId = myString[0];

        var myString = myAnswer.employeeId.split('-');
        console.log(myString[0]);        
        var myEmployeeId = myString[0];

        var query  = 'INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES (?, ?, ?, ?)';
        var params = [myAnswer.firstName, myAnswer.lastName, myRoleId, myEmployeeId];

        myDBConnection.query(query, params,
        function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log('Employee Added.');

            getMenu();            
        });
    });    
};

function updateEmployeeRole() {
    console.log('Update Employee Role\n');

    myInquirer
    .prompt([ 
        {
            type: 'list',
            name: 'roleId',
            message: 'Pick Role:',
            choices: myArrayRoles
        },
        {
            type: 'list',
            name: 'employeeId',
            message: 'Pick Manager:',
            choices: myArrayEmployees
        }
    ])
    .then(function (myAnswer) {
        console.log(myAnswer.roleId);
        console.log(myAnswer.employeeId);        

        var myString = myAnswer.roleId.split('-');
        console.log(myString[0]);        
        var myRoleId = myString[0];

        var myString = myAnswer.employeeId.split('-');
        console.log(myString[0]);        
        var myEmployeeId = myString[0];

        var query  = 'UPDATE employee SET employeeRole_id = ? WHERE employee_id = ?';
        var params = [myRoleId, myEmployeeId];

        myDBConnection.query(query, params,
        function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log('Role Updated.');

            getMenu();            
        });
    });    

};

function updateEmployeeManager() {
    console.log('Update Employee Manager\n');
    getMenu();
};

function viewEmployeesByManager() {
    console.log('View Employees By Manager\n');
    getMenu();
};

function viewEmployeesByDepartment() {
    console.log('View Employees By Department\n');
    getMenu();
};

function deleteDepartment() {
    console.log('Delete Department\n');
    getMenu();
};

function deleteRole() {
    console.log('Delete Role\n');
    getMenu();
};

function deleteEmployee() {
    console.log('Delete Employee\n');
    getMenu();
};

function viewDepartmentBudget() {
    console.log('View Departments Budget\n');
    getMenu();
};