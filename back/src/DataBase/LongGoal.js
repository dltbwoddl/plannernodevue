const mysql = require('mysql');

// module.exports = {
//     longgoallink: function () {
//         var data
//         const connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '123456',
//             database: 'plannerdb'
//         });

//         connection.connect();

//         connection.query('SELECT * FROM LongGoal',
//             function (error, results, fields) {
//                 if (error) throw error;
//                 console.log('The solution is: ', results);
//                 data = results
//                 connection.end();
//             });
//             return data
//     }
// }

function longgoallink() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'plannerdb'
    });

    connection.connect();

    connection.query('SELECT * FROM LongGoal',
        function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
            console.log(results) 
            connection.end();
        });
}
console.log(longgoallink())