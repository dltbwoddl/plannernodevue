const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql')
const Promise = require('bluebird')
const pool = require('./DataBase/pool')
var async = require('async');

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

app.get('/habit', (req, res) => {
    const pool_1 = new pool();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM habit').then((ret) => {
            res.json(ret)
        }).then(ret => { pool_1.end(); })
    })
})

app.get('/todolist', async (req, res) => {
    const pool_1 = new pool();
    const pool_2 = new pool();
    var shortgoallist = new Array();
    var todolist = new Array();

    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM shortGoal')
            .then((ret) => {
                for (i in ret) {
                    shortgoallist.push(ret[i]['shortgoal'])
                }
            }).then(() => {

                function gettodolist(shortgoal, callback) {
                    conn.queryAsync(`SELECT * FROM ${shortgoal}`)
                        .then(ret => {
                            for(i in ret){
                                todolist.push(ret[i])
                            }
                            callback(null)
                        }).catch(err => {
                            callback(null)
                        });
                }

                async.each(shortgoallist,
                    gettodolist,
                    function (err) {
                        console.log(100);
                        console.log(todolist);
                        res.json(todolist);
                    })
            })
    })
})

app.listen(port, () => {
    console.log('success')
})
// select * from vuejs, shortgoal where date = date_format("2020-12-11","%Y-%m-%d")
