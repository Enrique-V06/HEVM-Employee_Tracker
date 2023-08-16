const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
host: "127.0.0.1",
port: 3306,
user: "root",
password: "R00t",
database: "employee_db"
});

connection.connect(function(err) {
if (err) throw err;
start();
});

function logo(){
    console.log(`______   ______   ______   ______   ______   ______   ______   ______ 
    /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/ 
                                                                           
                                                                           
    ._. ___________              .__                                 ._.   
    | | \_   _____/ _____ ______ |  |   ____ ___.__. ____   ____     | |   
    |_|  |    __)_ /     \\____ \|  |  /  _ <   |  |/ __ \_/ __ \    |_|   
    |-|  |        \  Y Y  \  |_> >  |_(  <_> )___  \  ___/\  ___/    |-|   
    | | /_______  /__|_|  /   __/|____/\____// ____|\___  >\___  >   | |   
    |_|         \/      \/|__|               \/         \/     \/    |_|   
    ._. ___________                     __                           ._.   
    | | \__    ___/___________    ____ |  | __ ___________           | |   
    |_|   |    |  \_  __ \__  \ _/ ___\|  |/ // __ \_  __ \          |_|   
    |-|   |    |   |  | \// __ \\  \___|    <\  ___/|  | \/          |-|   
    | |   |____|   |__|  (____  /\___  >__|_ \\___  >__|             | |   
    |_|                       \/     \/     \/    \/                 |_|   
                                                                           
                                                                           
     ______   ______   ______   ______   ______   ______   ______   ______ 
    /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/ `);
};
function start() {
logo();
inquirer.prompt({
    message: "Please select the desired option:",
    name: "option",
    type: "list",
    choices: [
        "Add department", new inquirer.Separator(),
        "Add role", new inquirer.Separator(),
        "Add employee", new inquirer.Separator(),
        "View departments", new inquirer.Separator(),
        "View roles", new inquirer.Separator(),
        "View employees", new inquirer.Separator(),
        "Update employee role", new inquirer.Separator(),
        "Quit"
    ],
   
    }).then(function(result) {

    switch (result.option) {
        case "Add department":
            addDepartment();
            break;
        case "Add role":
            addRole();
            break;
        case "Add employee":
            addEmployee();
            break;
        case "View departments":
            viewDepartment();
            break;
        case "View roles":
            viewRoles();
            break;
        case "View employees":
            viewEmployees();
            break;
        case "Update employee role":
            updateEmployee();
            break;
        default:
            console.log("Thanks for visiting!")
            quit();
    }
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Please write the name of the department:",
        name: "deptName"
    }).then(function(answer){
        connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            start()
    })
    })
}

function addRole() {
inquirer.prompt([
    {
        type: "input",
        message: "What is the role's name?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary"
    },
    {
        type: "input",
        message: "Please add the department id number",
        name: "departmentID"
    }
    ])
    .then(function(answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salary, answer.departmentID], function(err, res) {
        if (err) throw err;
        start();
    });
    });
}

function addEmployee() {
inquirer.prompt([
    {
        type: "input",
        message: "What's the first name of the employee?",
        name: "First_Name"
    },
    {
        type: "input",
        message: "What's the last name of the employee?",
        name: "Last_Name"
    },
    {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
    },
    {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
    }
    ])
    .then(function(answer) {        
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
    [answer.First_Name, answer.Last_Name, answer.roleID, answer.managerID], 
    function(err, res) {
        if (err) throw err;
        start();
    });
    });
}

function updateEmployee() {
inquirer.prompt([
    {
        type: "input",
        message: "Which employee would you like to update?",
        name: "update"
    },

    {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
    }
    ])
    .then(function(answer) {
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.update],function(err, res) {
        if (err) throw err;
        start();
        });
    });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function quit() {
    connection.end();
    process.exit();
};