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

app.get('/todolist',(req,res)=>{
    const pool_1 = new pool();
    var shortgoallist = new Array();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM shortGoal').then((ret) => {
            for(i in ret){
                console.log(ret[i]['shortgoal'])
                conn.queryAsync(`SELECT * FROM ${ret[i]['shortgoal']}`).then(ret=>{
                    shortgoallist.push(ret)
                }).catch(err=>{
                    console.log('err');
                });
            }
        }).then(ret => {
            console.log(22);
            res.json(shortgoallist);
            pool_1.end(); 
        })
    })
})

app.listen(port, () => {
    console.log('success')
})