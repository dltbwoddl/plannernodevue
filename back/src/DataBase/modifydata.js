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
                console.log(rkeys);
                let difference = pkey.filter(x => !rkeys.includes(x));
                console.log('difference : ', difference);
                var deldata = `(${difference})`
                console.log(deldata)
                var middlegoaldeldata =``
                var shortgoaldeldata = ``
                var deltable = ``
                conn.queryAsync(`SELECT * FROM longgoal JOIN middlegoal on longgoal.longgoal_id = middlegoal.longgoal_id;`)
                            .then((result)=>{
                                var dellong = new Array();
                                for(i in result){
                                    if(difference.includes(result[i].longgoal_id)){
                                        dellong.push(result[i].longgoal_id)
                                    }
                                }
                                middlegoaldeldata=`(${dellong})`
                                console.log(middlegoaldeldata);
                                conn.queryAsync(`SELECT * FROM middlegoal JOIN shortgoal on middlegoal.id = shortgoal.middelgoal_id;`)
                                .then(shorres=>{
                                    var delmid = new Array();
                                    var delmidname = new Array();
                                    for(i in shorres){
                                        if(dellong.includes(shorres[i].middelgoal_id)){
                                            delmid.push(shorres[i].id)
                                            delmidname.push((shorres[i].shortgoal).replace(/(\s*)/g, ""))
                                        }
                                    }
                                    shortgoaldeldata = `(${delmid})`
                                    deltable = `${delmidname}`
                                    console.log(deldata);
                                    console.log(middlegoaldeldata);
                                    console.log(shortgoaldeldata);
                                    console.log(deltable);
                                    var query = `DELETE FROM longgoal WHERE longgoal_id in ${deldata};`+
                                    `DELETE FROM middlegoal WHERE longgoal_id in ${middlegoaldeldata};`+
                                    `DELETE FROM shortgoal WHERE middelgoal_id in ${middlegoaldeldata};`+
                                    `DROP TABLES ${deltable};`;
                                    console.log(query)
                                    conn.queryAsync(query).then(()=>{
                                        console.log('sucesssssssssssssss')
                                    })
                                })
                            });


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
                    if (Object.keys(ret).length != 0) {
                        if (Object.keys(req.body)[i] > ret[Object.keys(ret).length - 1].longgoal_id) {
                            plusdata += ` ('${req.body[Object.keys(req.body)[i]]}'),`
                        }
                    } else {
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
            });
        })
    },

    middlegoalmodify: function (req, res, longgoal_id) {
        const pool_1 = new pool();
        var chagedata = new Array();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM middlegoal where longgoal_id = ${longgoal_id};`).then((ret) => {
                console.log(ret);
                return ret
            }).then(ret => {
                var pkey = []
                var rkey = Object.keys(req.body)
                var rkeys = new Array();
                for (i in rkey) {
                    rkeys.push(parseInt(rkey[i]))
                }
                for (i in Object.keys(ret)) {
                    pkey.push(ret[i].id)
                }
                console.log(req.body)
                console.log('rkeys: ', rkeys);
                console.log('pkey:', pkey);
                let difference = pkey.filter(x => !rkeys.includes(x));
                console.log('difference : ', difference);
                var deldata = `(${difference})`
                console.log(deldata)
                if (deldata.length != 2) {
                    conn.queryAsync(`DELETE FROM middlegoal WHERE id in ${deldata}`)
                        .then(delresult => {

                        });
                    console.log(ret);
                    console.log(req.body);
                }


                for (i in ret) {
                    if (req.body[ret[i].id] != ret[i].middlegoal) {
                        var data = new Object()
                        data[ret[i].id] = req.body[ret[i].id]
                        chagedata.push(data)
                    }
                }
                function updatelonggoal(middlegoal_m, callback) {
                    conn.queryAsync(`UPDATE middlegoal SET middlegoal = '${Object.values(middlegoal_m)[0]}' where id = ${Object.keys(middlegoal_m)[0]}`)
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
                    if (Object.keys(ret).length != 0) {
                        if (Object.keys(req.body)[i] > ret[Object.keys(ret).length - 1].id) {
                            plusdata += ` ('${req.body[Object.keys(req.body)[i]]}',${longgoal_id}),`
                        }
                    } else {
                        plusdata += ` ('${req.body[Object.keys(req.body)[i]]}',${longgoal_id}),`
                    }
                }
                console.log('plusdata:', plusdata.length)
                if (plusdata != 0) {
                    conn.queryAsync(`INSERT INTO middlegoal(middlegoal,longgoal_id) VALUES` + plusdata.slice(0, -1) + `;`)
                        .then(ret => {
                            console.log(ret)
                        }).catch(err => {
                            console.log(err);
                        });
                }
                pool_1.end();
            });
        })

    },
    shortgoalmodify: function (req, res, middlegoal_id) {
        const pool_1 = new pool();
        var chagedata = new Array();
        console.log(100)
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM shortgoal where middelgoal_id = ${middlegoal_id};`).then((ret) => {
                console.log(ret);
                return ret
            }).then(ret => {
                var pkey = []
                var rkey = Object.keys(req.body)
                var rkeys = new Array();
                for (i in rkey) {
                    rkeys.push(parseInt(rkey[i]))
                }
                for (i in Object.keys(ret)) {
                    pkey.push(ret[i].id)
                }
                console.log(req.body)
                console.log('rkeys: ', rkeys);
                console.log('pkey:', pkey);
                let difference = pkey.filter(x => !rkeys.includes(x));
                console.log('difference : ', difference);
                var deldata = `(${difference})`
                console.log(deldata)
                if (deldata.length != 2) {
                    conn.queryAsync(`DELETE FROM shortgoal WHERE id in ${deldata}`)
                        .then(delresult => {

                        });
                    console.log(ret);
                    console.log(req.body);
                }

                console.log(10000);
                for (i in ret) {
                    if (req.body[ret[i].id] != ret[i].shortgoal) {
                        var data = new Object()
                        data[ret[i].id] = req.body[ret[i].id]
                        data['beforename'] = ret[i].shortgoal
                        chagedata.push(data)
                    }
                }
                console.log(chagedata);
                console.log('shortgoallafasf : ',ret)
                console.log(req.body)

                function updatelonggoal(shorgoal_m, callback) {
                    console.log("shortgoal_m : ",shorgoal_m,Object.values(shorgoal_m)[0],Object.keys(shorgoal_m)[0])
                    conn.queryAsync(`UPDATE shortgoal SET shortgoal = '${Object.values(shorgoal_m)[0]}' where id = ${Object.keys(shorgoal_m)[0]}`)
                        .then(ret => {
                            var shortgoal_1 = Object.values(shorgoal_m)[1].replace(/(\s*)/g, "")
                            var shortgoal_2 = Object.values(shorgoal_m)[0].replace(/(\s*)/g, "")
                            conn.queryAsync(`RENAME TABLE ${shortgoal_1} TO ${shortgoal_2}`)
                            .catch(err=>{console.log(err)})
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
                            pool_1.end();
                            console.log(err);
                        });
                }

                var plusdata = ``
                for (i in Object.keys(req.body)) {
                    if (Object.keys(ret).length != 0) {
                        if (Object.keys(req.body)[i] > ret[Object.keys(ret).length - 1].id) {
                            plusdata += ` ('${req.body[Object.keys(req.body)[i]]}',${middlegoal_id}),`
                        }
                    } else {
                        plusdata += ` ('${req.body[Object.keys(req.body)[i]]}',${middlegoal_id}),`
                    }
                }
                console.log('plusdata:', plusdata.length)
                if (plusdata != 0) {
                    conn.queryAsync(`INSERT INTO shortgoal(shortgoal,middelgoal_id) VALUES` + plusdata.slice(0, -1) + `;`)
                        .then(ret => {
                            console.log(ret)
                        }).catch(err => {
                            console.log(err);
                        });
                }
            });
            
        })

    },
    todolistmodify: function (req, res, shortgoal) {
        const pool_1 = new pool();
        var chagedata = new Array();
        console.log(req.body)
        console.log(100)
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'plannerdb';`)
                .then(tablenames => {
                    // var tablelist = new Array();
                    // for (i in tablenames) {
                    //     tablelist.push(tablenames[i].TABLE_NAME);
                    // }
                    // console.log(tablelist.includes(`${shortgoal}`))
                    conn.queryAsync(`SELECT * FROM ${shortgoal};`).then((ret) => {
                        console.log(ret);
                        return ret
                    }).then(ret => {
                        console.log(ret)
                        //데이터 삭제하기
                        var pkey = []
                        var rkey = Object.keys(req.body)
                        var rkeys = new Array();
                        for (i in rkey) {
                            rkeys.push(parseInt(rkey[i]))
                        }
                        for (i in Object.keys(ret)) {
                            pkey.push(ret[i].id)
                        }
                        console.log(req.body)
                        console.log('rkeys: ', rkeys);
                        console.log('pkey:', pkey);
                        let difference = pkey.filter(x => !rkeys.includes(x));
                        console.log('difference : ', difference);
                        var deldata = `(${difference})`
                        console.log(deldata)
                        if (deldata.length != 2) {
                            conn.queryAsync(`DELETE FROM ${shortgoal} WHERE id in ${deldata}`)
                                .then(delresult => {

                                });
                            console.log(ret);
                            console.log(req.body);
                        }
                        // 데이터 변한곳
                        console.log(10000);
                        console.log(ret)
                        console.log(req.body);
                        for (i in ret) {
                            if (req.body[ret[i].id][1] != ret[i].do) {
                                var data = new Object()
                                console.log(req.body[ret[i].id][1], ret[i].do)
                                data[ret[i].id] = req.body[ret[i].id]
                                chagedata.push(data)
                            }
                        }
                        console.log('changedat: ', chagedata);
                        function updatelonggoal(todo, callback) {
                            console.log(Object.values(todo));
                            conn.queryAsync(`UPDATE ${shortgoal} SET do = '${Object.values(todo)[0][1]}', date = DATE_FORMAT('${Object.values(todo)[0][0]}',"%Y-%m-%d") where id = ${Object.keys(todo)[0]}`)
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
                        console.log(Object.keys(req.body))
                        console.log(Object.values(req.body))

                        //추가하는 부분
                        let pdifference = rkeys.filter(x => !pkey.includes(x));
                        console.log('pdifference : ', pdifference);
                        var plusdata = ``
                        for (i in pdifference) {
                            console.log(req.body[pdifference[i]])
                            plusdata += `('${req.body[pdifference[i]][0]}','${req.body[pdifference[i]][1]}'),`
                        }
                        console.log('plusdata:', plusdata)
                        console.log(`INSERT INTO ${shortgoal}(date,do) VALUES` + plusdata.slice(0, -1) + `;`)
                        if (plusdata != 0) {
                            conn.queryAsync(`INSERT INTO ${shortgoal}(date,do) VALUES` + plusdata.slice(0, -1) + `;`)
                                .then(ret => {
                                    console.log(ret)
                                }).catch(err => {
                                    console.log(err);
                                });
                        }

                        pool_1.end();
                    }).catch((err) => {
                        console.log(err);
                    })
                })
        })

    },
    habitlistmodify: function (req, res) {
        const pool_1 = new pool();
        var chagedata = new Array();
        Promise.using(pool_1.connect(), conn => {
            conn.queryAsync(`SELECT * FROM habit`).then((ret) => {
                console.log(ret);
                return ret
            }).then(ret => {
                var pkey = []
                var rkey = Object.keys(req.body)
                var rkeys = new Array();
                for (i in rkey) {
                    rkeys.push(parseInt(rkey[i]))
                }
                for (i in Object.keys(ret)) {
                    pkey.push(ret[i].id)
                }
                console.log(req.body)
                console.log('rkeys: ', rkeys);
                console.log('pkey:', pkey);
                let difference = pkey.filter(x => !rkeys.includes(x));
                console.log('difference : ', difference);
                var deldata = `(${difference})`
                console.log(deldata)
                if (deldata.length != 2) {
                    conn.queryAsync(`DELETE FROM habit WHERE id in ${deldata}`)
                        .then(delresult => {

                        });
                    console.log(ret);
                    console.log(req.body);
                }


                for (i in ret) {
                    if (req.body[ret[i].id] != ret[i].habit) {
                        var data = new Object()
                        data[ret[i].id] = req.body[ret[i].id]
                        chagedata.push(data)
                    }
                }
                function updatelonggoal(habitlist, callback) {
                    conn.queryAsync(`UPDATE habit SET habit = '${Object.values(habitlist)[0]}' where id = ${Object.keys(habitlist)[0]}`)
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
                    if (Object.keys(ret).length != 0) {
                        if (Object.keys(req.body)[i] > ret[Object.keys(ret).length - 1].id) {
                            plusdata += ` ('${req.body[Object.keys(req.body)[i]]}'),`
                        }
                    } else {
                        plusdata += ` ('${req.body[Object.keys(req.body)[i]]}'),`
                    }
                }
                console.log('plusdata:', plusdata)
                if (plusdata != 0) {
                    conn.queryAsync(`INSERT INTO habit(habit) VALUES` + plusdata.slice(0, -1) + `;`)
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