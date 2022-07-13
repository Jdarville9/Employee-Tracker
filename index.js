const inquirer = require("inquirer");
const db = require("./db/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  initializeApp();
});

const initializeApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseAction",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.chooseAction) {
        case "View all departments":
          viewAllDept();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmp();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmp();
          break;
        case "Update an employee role":
          updateEmp();
          break;
      }
    });
};

function viewAllDept() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    inquirer
      .prompt({
        type: "list",
        name: "chooseAction",
        message: "What would you like to do?",
        choices: ["Return to Main Menu", "Quit"],
      })
      .then((answer) => {
        switch (answer.chooseAction) {
          case "Return to Main Menu":
            initializeApp();
            break;
          case "Quit":
            console.log(`Ending application`);
            break;
        }
      });
  });
}

const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title,
  department.department_name, role.salary
  FROM role
  LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    inquirer
      .prompt({
        type: "list",
        name: "chooseAction",
        message: "What would you like to do?",
        choices: ["Return to Main Menu", "Quit"],
      })
      .then((answer) => {
        switch (answer.chooseAction) {
          case "Return to Main Menu":
            initializeApp();
            break;
          case "Quit":
            console.log(`Ending application`);
            break;
        }
      });
  });
};

const viewAllEmp = () => {
  const sql = `SELECT employee.first_name, employee.last_name, role.salary 
  AS salary, role.title
  AS job_title, department.department_name
  AS department, employee.manager_id
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    inquirer
      .prompt({
        type: "list",
        name: "chooseAction",
        message: "What would you like to do?",
        choices: ["Return to Main Menu", "Quit"],
      })
      .then((answer) => {
        switch (answer.chooseAction) {
          case "Return to Main Menu":
            initializeApp();
            break;
          case "Quit":
            console.log(`Ending application`);
            break;
        }
      });
  });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "text",
        name: "inputName",
        message: "What is the name of the new department",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department(department_name) VALUES (?)`;
      const params = answer.inputName;
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllDept();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "text",
        name: "addTitle",
        message: "What is the title for this role?",
      },
      {
        type: "text",
        name: "addSalary",
        message: "What is the salary for this role?",
      },
      {
        type: "text",
        name: "addId",
        message: "What is the department ID?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`;
      const params = [answer.addTitle, answer.addSalary, answer.addId];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllRoles();
      });
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "text",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "text",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        type: "text",
        name: "roleId",
        message: "What is the employees role id?",
      },
      {
        type: "text",
        name: "managerId",
        message: "What is the employees manager id?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [
        answer.firstName,
        answer.lastName,
        answer.roleId,
        answer.managerId,
      ];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllEmp();
      });
    });
};

function updateEmp() {
  let employeeList = [];
  let employeeId = [];
  let roleList = [];
  let roleId = [];
  const sqlEmp = `SELECT * FROM employee`;
  const sqlRole = `SELECT * FROM role`;

  db.query(sqlEmp, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((employee) => {
      employeeList.push(employee.first_name + " " + employee.last_name);
      employeeId.push(employee.id);
    });

    db.query(sqlRole, (err, rows) => {
      if (err) {
        return;
      }
      rows.forEach((role) => {
        roleList.push(role.title);
        roleId.push(role.id);
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "chooseEmp",
            message: "Select which employee you want to update",
            choices: employeeList,
          },
          {
            type: "list",
            name: "chooseRole",
            message: "What is the employees new role?",
            choices: roleList,
          },
        ])
        .then((answers) => {
          const employeeIndex = employeeList.indexOf(answers.chooseEmp);
          const roleIndex = roleList.indexOf(answers.chooseRole);
          const empID = employeeId[employeeIndex];
          const roleID = roleId[roleIndex];
          const sqlUpdate = `UPDATE employee SET role_id = ?
                             WHERE id = ?`;
          const params = [roleID, empID];

          db.query(sqlUpdate, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            viewAllEmp();
          });
        });
    });
  });
}
