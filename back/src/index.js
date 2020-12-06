const express = require('express');
const app = express();
var cors = require('cors')
const mysql = require('mysql');
app.use(cors())

const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plannerdb'
});
connection.connect();

app.get('/longgoal', (req, res) => {
    connection.query('SELECT * FROM LongGoal', (err,data)=> {
        res.json(data)
    });
});

app.listen(port,()=>{
    console.log('success')
})