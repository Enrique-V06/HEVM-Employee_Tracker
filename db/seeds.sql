
INSERT INTO department (department_name)
VALUES ("Security"), ("Electronics"), ("Toys"), ("Management"), ("HR");

INSERT INTO role (title, salary, department_id)
VALUE ("Security Officer", 25000, 1), ("T.V. Expert", 20000, 2), ("Store Manager", 100000, 3), ("Security Manager", 50000, 1), ("Recruiter", 80000, 5), ("Hot Wheels", 25000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Dwayne", "Hogan", 1, 4), ("Anton", "Johnson", 2, 3), ("Hank", "Donaldson", 3, 3), ("Steve", "Wayne", 4, 3), ("Stacy", "Potts", 5, 3), ("Logan", "Norris", 1, 4), ("Paul", "Johnson", 6, 3);