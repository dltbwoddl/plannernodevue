const express = require('express');
const app = express();
const cors = require('cors')
const gethomedata = require('./DataBase/gethomedata')

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

app.listen(port, () => {
    console.log('success')
})
