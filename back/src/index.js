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

app.get('/todolist', async (req, res) => {
    gethomedata.todolistget(req,res);
})

app.listen(port, () => {
    console.log('success')
})
