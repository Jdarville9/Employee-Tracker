const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    initializeApp();
});

const initializeApp = () => {
    // possibly only put inquirer here
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'chooseAction',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        },
    ])
    .then((answer) => {
            if (answer.chooseAction === 'View all departments') {
                viewAllDept();
            } else if (answer.chooseAction === 'View all roles') {
                viewAllRoles;
            } else if (answer.chooseAction === 'View all employees') {
                viewAllEmp();
            } else if (answer.chooseAction === 'Add a Department') {
                addDept();
            } else if (answer.chooseAction === 'Add a role') {
                addRole();
            } else if (answer.chooseAction === 'Add an employee') {
                addEmp();
            } else if (answer.chooseAction === 'Update an employee') {
                updateEmp();
            }
    });
};

function viewAllDept() {
    console.log('Viewed all Depts');
};

const viewAllRoles = () => {
    console.log('Viewed all Roles');
};

const viewAllEmp = () => {
    console.log('Viewed all Emps');
};

const addDept = () => {
    console.log('Added Dept');
};

const addRole = () => {
    console.log('Added Role!');
};

const addEmp = () => {
    console.log('Added Emp!');
};

const updateEmp = () => {
    console.log('Updated Emp!');
};

// git push once completed