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

//longgoal에서 가져와서 어디서부터 추가할지 정하기.
//추가하기.
app.post('/modify', (req, res) => {
    console.log(10000)
    console.log(req.body)
    var data = ``
    const pool_1 = new pool();
    Promise.using(pool_1.connect(), conn => {
        conn.queryAsync('select * from longgoal').then((ret) => {
            console.log(33)
            console.log(Object.keys(ret).length)
            var lenret = Object.keys(ret).length
            for (i in req.body) {
                if(i>lenret){
                    data+=`(${i},${req.body[i]})`
                }
                console.log(req.body[i])
            }
            console.log(data);
        }).then(() => {
            console.log(data);
            conn.queryAsync(`INSERT INTO longgoal(longgoal_id,longgoal) values ${data};`).then((ret) => {
                console.log(ret);
                console.log(10);
            }).then(ret => {
                pool_1.end();
            })
                .catch(err => {
                    pool_1.end();
                })
        })
    })
})

app.listen(port, () => {
    console.log('success')
})
