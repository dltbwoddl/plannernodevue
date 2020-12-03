const express = require('express');
const app = express();
var cors = require('cors')
const mysql = require('mysql');
app.use(cors())

// const LongGoal = require('./DataBase/LongGoal')
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plannerdb'
});

connection.connect();

app.get('/longgoal', (err, req, res) => {
    if(err) throw err;
    connection.query('SELECT * FROM LongGoal', (error, data)=> {
            if (error) throw error;
            console.log(2);
            console.log(Object.values(data))
            connection.end();
            res.send(data)
        });
});

app.listen(port,()=>{
    console.log('success')
})