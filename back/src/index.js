const express = require('express');
const app = express();
const cors = require('cors')
const gethomedata = require('./DataBase/gethomedata')
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const port = 3000;

app.get('/longgoal', (req, res) => {
    gethomedata.longgoalget(req,res);
});

app.get('/habit', (req, res) => {
    gethomedata.habitget(req,res);
})

app.get('/todolist', (req, res) => {
    gethomedata.todolistget(req,res);
})

app.get('/:longgoal_id',(req,res)=>{
    var longgoal_id = req.params.longgoal_id;
    console.log('longgoal_id',longgoal_id)
    gethomedata.getmiddlegoal(req,res,longgoal_id);
})

app.post('/modify',(req,res)=>{
    console.log(10000)
    console.log(req.body)
    const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM middlegoal where longgoal_id = ${longgoal_id};`).then((ret) => {
                console.log(ret);
                res.json(ret);
            }).then(ret => { pool_1.end(); })
            .catch(err=>{ pool_1.end();})
        })
})

app.listen(port, () => {
    console.log('success')
})
