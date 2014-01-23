CREATE TABLE users
(
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstname character varying(50),
    lastname character varying(50),
    isactive boolean DEFAULT true
);

CREATE TABLE cards 
(
    user_id integer,
    cardtype varchar(4),
    cardid character varying(20)
);
