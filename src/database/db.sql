-- Active: 1766377961597@@127.0.0.1@5432@youtube

create database youtube;

CREATE TABLE users(
    "id" SERIAL primary key,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" TEXT NOT NULL
);
CREATE TABLE files(
    "id" SERIAL,
    "title" VARCHAR(255) NOT NULL,
    "file_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES users(id) on delete cascade,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP DEFAULT current_timestamp
);