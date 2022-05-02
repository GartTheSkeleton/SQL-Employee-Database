INSERT INTO department (department_name)
VALUES
    ("Marketing"),
    ("Accounting"),
    ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Associate", 21000.00, null),
    ("Marketing Manager", 50000.00, 1),
    ("Accountant", 39000.00, 2),
    ("Sales Manager", 40000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Ronald", "Jefferson", 2, null),
    ("Jessica", "Gottwald", 4, null),
    ("Roderica", "Stump", 3, null),
    ("Jerry", "Sinfield", 1, 1),
    ("Germaine", "Cocaine", 1, 2),
    ("Allison", "Babadook", 3, 3);