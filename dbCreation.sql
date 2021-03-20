-- CREATE -- uncomment if necessary to create database
-- DATABASE "cscEventsBot"
--     WITH
--     OWNER = user1
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

CREATE SCHEMA master

    CREATE TABLE master.variables
    (
        "key"   text PRIMARY KEY,
        "value" text
    )

    CREATE TABLE master.stations
    (
        "stationID" integer PRIMARY KEY, -- corresponds to a table in stations schema
        "name"        text COLLATE pg_catalog."default" NOT NULL
    )

    CREATE TABLE master.participants
    (
        "userID"      bigint PRIMARY KEY,
        "station"       text,
        "queueNumber" integer NOT NULL,
        "stationID"   bigint  NOT NULL DEFAULT 0
    );

CREATE SCHEMA stations

--     CREATE TABLE stations."" -- put stationID in the blank
--     (
--         "userID"      bigint PRIMARY KEY,
--         "queueNumber" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 )
--     )