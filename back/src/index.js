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
    const pool_1 = new pool();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM habit').then((ret) => {
            res.json(ret)
        }).then(ret => { pool_1.end(); })
    })
    console.log(req.params.longgoal_id);
    res.send(req.params.longgoal_id)
})

app.listen(port, () => {
    console.log('success')
})
