const connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
}
function objToSql(ob) {
var arr = [];

for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
    if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
    }
    arr.push(key + "=" + value);
    }
}
return arr.toString();
}

let orm = {
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne: function(table, column, value, cb) {
        let queryString = "INSERT INTO " + table;
        
        queryString += " (";
        queryString += column.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(value.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, value, function(err, result) {
            if (err) {
                throw err;
            }
        
            cb(result);
            });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
            throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;