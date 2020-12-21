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

//longgoal에서 받아왔을 때
//key
app.post('/modify', (req, res) => {
    console.log(req.body);
    //{ '1': '코딩 마스터', '2': '인문학 마스터', '3': '123' }
    console.log(100000)
    var data = req.body;
    for(i in data){
        console.log(data[i])
    }
//     //users안에 있는 객체들이 o에 하나씩 들어가 age가 40보다 작으면 return하고 종료한다.
//   console.log(_.findKey(users, function(o) { return o.age < 40; }));
//   // =>bal
   
//   //age:35, active:true 조건에 맞는 객체를 가져온다.
//   console.log(_.findKey(users, { 'age': 35, 'active': true }));
//   // => story
   
//   //active값이 false인 객체를 가져온다.
//   console.log(_.findKey(users, ['active', false]));
//   // => mo

//   //active가 true인 첫 번째 값을 가져와 보여준다.
//   console.log(_.findKey(users, 'active'));
//   // => bal
});

app.listen(port, () => {
    console.log('success')
})
