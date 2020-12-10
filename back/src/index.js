const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql')
const Promise = require('bluebird')
const pool = require('./DataBase/pool')




app.use(cors())

const port = 3000;



app.get('/longgoal', (req, res) => {
    const pool_1 = new pool();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM LongGoal').then((ret) => {
            res.json(ret)
        }).then(ret => { pool_1.end(); })
    })
});

app.get('/habit',(req,res)=>{
    const pool_1 = new pool();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM habit').then((ret) => {
            res.json(ret)
        }).then(ret => { pool_1.end(); })
    })
})

app.listen(port, () => {
    console.log('success')
})