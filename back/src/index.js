const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql')
const gethomedata = require('./DataBase/gethomedata')
var async = require('async');

app.use(cors())

const port = 3000;

app.get('/longgoal', (req, res) => {
    gethomedata.longgoalget(req,res);
});

app.get('/habit', (req, res) => {
    gethomedata.habitget(req,res);
})

app.get('/todolist', async (req, res) => {
    gethomedata.todolistget(req,res);
})

app.listen(port, () => {
    console.log('success')
})
// select * from vuejs, shortgoal where date = date_format("2020-12-11","%Y-%m-%d")
