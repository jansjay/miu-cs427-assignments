const mysql = require ("mysql");
module.exports = function (mysqlHost, mysqlUsername, mysqlPassword, mysqlDbName ) { 
    var module = {};
    module.conn = mysql.createConnection({
        host: mysqlHost,
        user: mysqlUsername,
        password: mysqlPassword,
        database: mysqlDbName        
    });      
    module.connect = function(callback) {    
        this.conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            callback();            
        });
    }
    module.getWordInfo = function(word, callback) {
        this.conn.query('SELECT * FROM entries where UPPER(word) = UPPER(?)', [word], function (error, results, fields) {
            if (error) throw error;
            var data = [];
            var i = 0;
            results.forEach((row) => {
                dataRow = {};
                fields.forEach((field) => { 
                    dataRow[field.name] = row[field.name];
                });
                data[i++] = dataRow;
            });
            callback(data);
          });
    }
    return module;
};