const express = require('express');
const app = express();
const cors = require('cors')
const gethomedata = require('./DataBase/gethomedata')
const bodyParser = require("body-parser")
const pool = require('./DataBase/pool')
const mysql = require('mysql');
const Promise = require('bluebird')
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype)
Promise.promisifyAll(require('mysql/lib/Pool').prototype);
var _ = require('lodash');
var async = require('async');
var modifydata = require('./DataBase/modifydata')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const port = 3000;

app.get('/longgoal', (req, res) => {
    gethomedata.longgoalget(req, res);
});

app.get('/habit', (req, res) => {
    gethomedata.habitget(req, res);
})

app.get('/todolist', (req, res) => {
    gethomedata.todolistget(req, res);
})

app.get('/:longgoal_id', (req, res) => {
    var longgoal_id = req.params.longgoal_id;
    console.log('longgoal_id', longgoal_id)
    gethomedata.getmiddlegoal(req, res, longgoal_id);
})
app.get('/:longgoal_id/middlegoal_id',(req,res)=>{
    var longgoal_id = req.params.longgoal_id;
    var middlegoal = req.params.middlegoal;
    console.log(longgoal_id,middlegoal)
})

//삭제하기 추가하기.
app.post('/modify', (req, res) => {
    modifydata.longgoalmodify(req,res);
});

app.post('/middlegoal/modify/:longgoal_id',(req,res)=>{
    var longgoal_id = req.params.longgoal_id;
    modifydata.middlegoalmodify(req,res,longgoal_id);
});

app.get('/shortgoal/:middlegoal_id',(req,res)=>{
    var middlegoal_id = req.params.middlegoal_id;
    console.log(middlegoal_id);
    gethomedata.getshortgoal(req,res,middlegoal_id);
});

app.post('/shortgoal/modify/:middlegoal_id',(req,res)=>{
    var middlegoal_id = req.params.middlegoal_id;
    console.log(middlegoal_id);
    modifydata.shortgoalmodify(req,res,middlegoal_id);
});
app.get('/todolist/:shortgoal',(req,res)=>{
    var shortgoal = req.params.shortgoal;
    console.log(shortgoal);
    gethomedata.shortgoaltodolist(req,res,shortgoal)
})
app.post('/todolist/modify/:shortgoal',(req,res)=>{
    var shortgoal = req.params.shortgoal;
    console.log(shortgoal);
    modifydata.todolistmodify(req,res,shortgoal);
})

app.listen(port, () => {
    console.log('success')
})
