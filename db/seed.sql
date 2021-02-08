CREATE TABLE users (
    id serial primary key,
    username varchar(255) not null,
    hash varchar(255) not null,
    bag_id Int Default -1
)


Create table flavor ( 
id serial primary key,
author_id INT NOT null references users(id),
flavor_name text,
flavor1 text not null,
flavor2 text,
flavor3 text,
addin1 text,
addin2 text,
addin3 text,
price int NOT NULL,
date_created timestamp
)

CREATE TABLE bag (
    id serial primary key,
    author_id INT NOT null references users(id),
    date_created timestamp,
    check_out BOOL Default false
);

CREATE TABLE bag_list (
    id serial primary key,
    bag_id int not null references bag(id),
    flavor_id int NOT NULL references flavor(id),
    quantity int Default 1
    
)