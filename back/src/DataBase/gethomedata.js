const pool = require('./pool');
const Promise = require('bluebird');
var async = require('async');
const { database } = require('firebase');

// const pool_1 = new pool();

module.exports = {

    longgoalget: function (req, res) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync('SELECT * FROM LongGoal').then((ret) => {
                console.log(ret)
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
                .catch(err => { pool_1.end(); })
        })

    },
    getshortgoal: function (req, res, middlegoal_id) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM shortgoal where middelgoal_id = ${middlegoal_id};`).then((ret) => {
                console.log(ret);
                res.json(ret);
            }).then(ret => { pool_1.end(); })
                .catch(err => { pool_1.end(); })
        })
    },
    shortgoaltodolist: function (req, res, shortgoal) {
        const pool_1 = new pool();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM ${shortgoal};`).then((ret) => {
                for (i in ret) {
                    var date = ret[i].date
                    var m = 0
                    var day = 0
                    console.log(date)
                    console.log(date.getDate())
                    console.log(parseInt(date.getMonth()) < 9)
                    console.log(parseInt(date.getDate()) < 9)

                    if (parseInt(date.getMonth()) < 9) {
                        m = '0' + (date.getMonth() + 1)
                    } else {
                        m = date.getMonth() + 1
                    }

                    if (parseInt(date.getDate()) < 9) {
                        day = `0${date.getDate()}`
                    } else {
                        day = date.getDate()
                    }
                    var d = `${date.getFullYear()}-${m}-${day}`
                    ret[i].date = d;
                }
                console.log(ret);
                res.json(ret);
            }).then(ret => { pool_1.end(); })
                .catch(() => {
                    console.log(`CREATE TABLE ${shortgoal}(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            date datetime NOT NULL,
            do varchar(60) NOT NULL
        );`)
                    conn.queryAsync(`CREATE TABLE ${shortgoal}(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            date datetime NOT NULL,
            do varchar(60) NOT NULL
        );`)
                })
                .catch(err => {
                    console.log(err);
                    pool_1.end();
                })
        })
    }
}