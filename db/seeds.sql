INSERT INTO department (department_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Salesperson', 10000, 1),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 150000, 3),
  ('Accountant', 100000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 175000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Finn', 'Murton', 4, null),
('Barry', 'Manilow', 2, 1),
('Bobby', 'Saget', 3, 1),
('Constantine', 'SupDawg', 1, 2),
('Wilbert', 'Stephanopolis', 5, 2),
('Billy', 'Nye', 4, 1);
