const pool = require('./pool');
const Promise = require('bluebird');
var async = require('async');
const mysql = require('mysql');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype)
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

module.exports = {
    longgoalmodify: function (req, res) {
        const pool_1 = new pool();
        var chagedata = new Array();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync('SELECT * FROM longgoal').then((ret) => {
                console.log(ret);
                return ret
            }).then(ret => {
                //deldata에 없어지 id를 찾아서 
                var pkey = []
                var rkey = Object.keys(req.body)
                var rkeys = new Array();
                for (i in rkey) {
                    rkeys.push(parseInt(rkey[i]))
                }
                for (i in Object.keys(ret)) {
                    pkey.push(ret[i].longgoal_id)
                }
                let difference = pkey.filter(x => !rkeys.includes(x));
                console.log('difference : ', difference);
                var deldata = `(${difference})`
                console.log(deldata)
                if (deldata.length != 2) {
                    conn.queryAsync(`DELETE FROM longgoal WHERE longgoal_id in ${deldata}`)
                        .then(delresult => {

                        });
                    console.log(ret);
                    console.log(req.body);
                }


                for (i in ret) {
                    if (req.body[ret[i].longgoal_id] != ret[i].longgoal) {
                        var data = new Object()
                        data[ret[i].longgoal_id] = req.body[ret[i].longgoal_id]
                        chagedata.push(data)
                    }
                }
                function updatelonggoal(longgoal_m, callback) {
                    // console.log('longgoal_m : ', longgoal_m, Object.values(longgoal_m)[0], Object.keys(longgoal_m)[0])
                    conn.queryAsync(`UPDATE longgoal SET longgoal = '${Object.values(longgoal_m)[0]}' where longgoal_id = ${Object.keys(longgoal_m)[0]}`)
                        .then(ret => {
                            callback(null)
                        }).catch(err => {
                            console.log(err);
                            callback(null)
                        });
                }
                if (chagedata.length != 0) {
                    async.each(chagedata,
                        updatelonggoal,
                        function (err) {
                            console.log(err);
                        });
                }


                var plusdata = ``
                for (i in Object.keys(req.body)) {
                    if (Object.keys(req.body)[i] > ret[Object.keys(ret).length - 1].longgoal_id) {
                        plusdata += ` ('${req.body[Object.keys(req.body)[i]]}'),`
                    }
                }
                console.log('plusdata:', plusdata.length)
                if (plusdata != 0) {
                    conn.queryAsync(`INSERT INTO longgoal(longgoal) VALUES` + plusdata.slice(0, -1) + `;`)
                        .then(ret => {
                            console.log(ret)
                        }).catch(err => {
                            console.log(err);
                        });
                }

                pool_1.end();
            });
        })
    }
}