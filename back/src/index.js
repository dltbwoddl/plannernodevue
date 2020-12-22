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

//삭제하기 추가하기.
app.post('/modify', (req, res) => {
    const pool_1 = new pool();
    var chagedata = new Array();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('SELECT * FROM longgoal').then((ret) => {
            console.log(ret);
            return ret
        }).then(ret => {
            for (i in ret) {
                if (req.body[ret[i].longgoal_id] != ret[i].longgoal) {
                    var data = new Object()
                    data[ret[i].longgoal_id] = req.body[ret[i].longgoal_id]
                    chagedata.push(data)
                }
            }
            function updatelonggoal(longgoal_m, callback) {
                console.log('longgoal_m : ', longgoal_m, Object.values(longgoal_m)[0], Object.keys(longgoal_m)[0])
                conn.queryAsync(`UPDATE longgoal SET longgoal = '${Object.values(longgoal_m)[0]}' where longgoal_id = ${Object.keys(longgoal_m)[0]}`)
                    .then(ret => {
                        callback(null)
                    }).catch(err => {
                        console.log(err);
                        callback(null)
                    });
            }
            async.each(chagedata,
                updatelonggoal,
                function (err) {
                    console.log(err);
                });

            var plusdata = ``
            for(i in Object.keys(req.body)){
                if(Object.keys(req.body)[i] > Object.keys(ret).length){
                    plusdata += `('${req.body[parseInt(i)+1]}'),`
                }
            }
            console.log(plusdata.slice(0,-1));
            conn.queryAsync(`INSERT INTO longgoal(longgoal) VALUES ${plusdata.slice(0,-1)};`)
                    .then(ret => {
                        console.log(ret)
                    }).catch(err => {
                        console.log(err);
                    });
            pool_1.end();
        });
    });
});

app.listen(port, () => {
    console.log('success')
})
//INSERT INTO vuejs(date,do) VALUES ( CURDATE(),'1234');