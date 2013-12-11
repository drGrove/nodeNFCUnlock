CREATE TYPE cardtype AS ENUM (
    'nfc',
    'rfid'
);

CREATE TABLE users
(
    id bigint NOT NULL,
    firstname character varying(50),
    lastname character varying(50),
    isactive boolean DEFAULT true
);

CREATE TABLE cards 
(
    user_id integer,
    cardtype cardtype,
    cardid character varying(20)
);
