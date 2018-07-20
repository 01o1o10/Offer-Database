const mysql = require('mysql')

module.exports = {

    con: mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "ilyas123",
        database: "offer"
    }),

    startconnection: function(){
        this.con.connect(function(err) {
            if (err) throw err
            console.log("Connected!")
        })
    },

    query: function(sql, cb){
        this.con.query(sql, function (err, result) {
            if (err){
                cb(err)
                throw err
            }
            cb(result)
        })
    }
}