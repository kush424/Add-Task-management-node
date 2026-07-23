# Task Management App

## Run
```
npm install
npm start
```
MongoDB should run locally (`mongodb://127.0.0.1:27017/taskapp`) — edit `.env` if different.

## Step 1 — Create the first Admin account (one-time, terminal only)
There is **no public registration page** — nobody can create an admin account
through the browser. Run this once from the terminal instead:
```
node seed-admin.js
```
It will ask for a username and password and create the admin account directly.

## Step 2 — Login
Everyone (admin and employees) uses the **same login page**:
```
http://localhost:3000/login
```
What you see after logging in depends on your role — no separate admin link.

## Step 3 — Admin creates employees
Admin logs in → clicks **"Employees"** in the navbar → creates a
username/password for each employee → shares those credentials with them.

## Step 4 — Admin assigns tasks
Admin clicks **"Assign Task"** → picks an employee from the dropdown →
fills in title/description/category/status → saves.

## Step 5 — Employee updates status
Employee logs in → sees only tasks assigned to them → clicks
**"Update Status"** → changes pending / in-progress / completed.
Employees cannot create, delete, or reassign tasks — only admins can.


video Link :- 
---
https://drive.google.com/file/d/18OQJmnpz2UOOBKqFasVx9K6vOoR-jg7n/view?usp=sharing
