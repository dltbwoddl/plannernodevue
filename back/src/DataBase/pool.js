const mysql = require('mysql');
const Promise = require('bluebird')

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype)
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const DB_info ={
    host: 'localhost',
    user: 'planneruser',
    password: '123456',
    database: 'plannerdb',
    multipleStatements : true,
    connectionLimit:5,
    waitForConnections:false
}

module.exports=class{
    //new했을 때 실행되는 것
    constructor(dbinfo){
        dbinfo = DB_info;
        this.pool = mysql.createPool(dbinfo);
    }
    connect(){
        //disposer는 커넥션을 다썼을 때 실행된다.(release를 하는 이유는 재사용을 위한 것이다.)
        return this.pool.getConnectionAsync()
        .disposer(conn=>{
            console.log('1end')
            return conn.release();
        });
    }

    end(){
        //메모리에 있는 풀을 해지해주는 코드입니다.
        this.pool.end(function(err){
            console.log('mysql db end');
        })
    }
}