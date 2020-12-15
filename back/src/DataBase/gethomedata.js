const pool = require('./pool');
const Promise = require('bluebird');
var async = require('async');

// const pool_1 = new pool();

module.exports = {

    longgoalget: function (req, res) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync('SELECT * FROM LongGoal').then((ret) => {
                res.json(ret)
            }).then(ret => { pool_1.end(); })
        })
    },

    habitget: function (req, res) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync('SELECT * FROM habit').then((ret) => {
                res.json(ret)
            }).then(ret => { pool_1.end(); })
        })
    },

    todolistget: function (req, res) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            var shortgoallist = new Array();
            var todolist = new Array();
            conn.queryAsync('SELECT * FROM shortGoal')
                .then((ret) => {
                    for (i in ret) {
                        shortgoallist.push(ret[i]['shortgoal'])
                    }
                }).then(() => {
                    function gettodolist(shortgoal, callback) {
                        conn.queryAsync(`SELECT * FROM ${shortgoal} where date = CURDATE();`)
                            .then(ret => {
                                for (i in ret) {
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
                            console.log(todolist);
                            res.json(todolist);
                            pool_1.end();
                        })
                })
        })
    },
    getmiddlegoal: function (req, res, longgoal_id) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM middlegoal where longgoal_id = ${longgoal_id};`).then((ret) => {
                console.log(ret);
                res.json(ret);
            }).then(ret => { pool_1.end(); })
            .catch(err=>{ pool_1.end();})
        })

    }
}