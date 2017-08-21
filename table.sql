create table Projects(
    id int not NULL AUTO_INCREMENT,
    title varchar(50) not NULL,
    subtitle varchar(50),
    openstatus boolean default true,
    PRIMARY KEY (id)
);

create table Project_data(
    id int not NULL,
    createDate DATETIME DEFAULT NOW(),
    description varchar(150),
    imageUri varchar (150),
    target int ,
    FOREIGN KEY (id) REFERENCES Projects(id)
);

create table Rewards(
    id int not NULL AUTO_INCREMENT,
    amount int default 0,
    description varchar(150),
    project_id int not NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

create table Progress(
    project_id int not NULL,
    currentPledged int default 0,
    No_Backers int default 0,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);


create table Users(
    id int not NULL AUTO_INCREMENT,
    username varchar(50) not NULL UNIQUE,
    location varchar(100),
    email varchar(50),
    password varchar(50) not NULL,
    Token varchar(10),
    PRIMARY KEY (id)
);

create table Creators(
    user_id int not NULL,
    project_id int not NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

create table Pledge(
    PledgeId int not NULL AUTO_increment,
    amount int default 0,
    anonymous boolean not null,
    PRIMARY KEY (PledgeId)
);

create table Backers(
    user_id int not NULL,
    project_id int not NULL,
    pledge_id int not NULL,
    total_amount int default 0,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id),
    FOREIGN KEY (pledge_id) REFERENCES Pledge(PledgeId)
);




INSERT INTO Projects (title, subtitle) VALUES ('project1', 'remastered');
INSERT INTO Projects (title, subtitle) VALUES ('project2', 'star');
INSERT INTO Projects (title, subtitle) VALUES ('project3', 'lol');
INSERT INTO Projects (title, subtitle) VALUES ('project4', 'steam');
INSERT INTO Projects (title, subtitle) VALUES ('project5', 'seng365');
INSERT INTO Projects (title, subtitle) VALUES ('project6', 'LCK');
INSERT INTO Projects (title, subtitle) VALUES ('project7', 'CLeTEM');
INSERT INTO Projects (title, subtitle) VALUES ('project8', 'dankledong');

INSERT INTO Project_data (id) VALUES (1);
INSERT INTO Project_data (id) VALUES (2);
INSERT INTO Project_data (id) VALUES (3);
INSERT INTO Project_data (id) VALUES (4);
INSERT INTO Project_data (id) VALUES (5);
INSERT INTO Project_data (id) VALUES (6);
INSERT INTO Project_data (id) VALUES (7);
INSERT INTO Project_data (id) VALUES (8);

INSERT INTO Progress (project_id) VALUES (1);
INSERT INTO Progress (project_id) VALUES (2);
INSERT INTO Progress (project_id) VALUES (3);
INSERT INTO Progress (project_id) VALUES (4);
INSERT INTO Progress (project_id) VALUES (5);
INSERT INTO Progress (project_id) VALUES (6);
INSERT INTO Progress (project_id) VALUES (7);
INSERT INTO Progress (project_id) VALUES (8);

INSERT INTO Rewards (project_id) VALUES (1);
INSERT INTO Rewards (project_id) VALUES (2);
INSERT INTO Rewards (project_id) VALUES (3);
INSERT INTO Rewards (project_id) VALUES (4);
INSERT INTO Rewards (project_id) VALUES (5);
INSERT INTO Rewards (project_id) VALUES (6);
INSERT INTO Rewards (project_id) VALUES (7);
INSERT INTO Rewards (project_id) VALUES (8);

INSERT INTO Users (id, username, password) VALUES (123, 'Jinyoung Park', 123541);
INSERT INTO Users (id, username, password) VALUES (1,'Leo Jang', 123541);
INSERT INTO Users (id, username, password) VALUES (2, 'Joonsu Kim', 123541);
INSERT INTO Users (id, username, password) VALUES (3, 'Paul Lee', 123541);
INSERT INTO Users (id, username, password) VALUES (5, 'Erskin THEFT', 123541);

INSERT INTO Creators (user_id, project_id) VALUES (1,1);
INSERT INTO Creators (user_id, project_id) VALUES (1,2);
INSERT INTO Creators (user_id, project_id) VALUES (1,3);
INSERT INTO Creators (user_id, project_id) VALUES (2,1);
INSERT INTO Creators (user_id, project_id) VALUES (2,3);
INSERT INTO Creators (user_id, project_id) VALUES (3,1);

INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);
INSERT INTO Pledge (anonymous) VALUEs (false);

INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (1, 2, 1);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (2, 2, 2);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (2, 3, 3);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (3, 2, 4);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (2, 4, 5);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUEs(1, 5, 6);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (1, 3, 7);
INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (1, 4, 8);
