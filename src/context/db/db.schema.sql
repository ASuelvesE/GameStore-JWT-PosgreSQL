create table users (
	name varchar(255) primary key,
	password varchar(255)
);

create table tasks(
	id serial,
	task text,
	"user" varchar(255),
	foreign key ("user") references users(name)
);