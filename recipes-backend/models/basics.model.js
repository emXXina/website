const sql = require("./db.js");

exports.findByIdInTable = (id, result, table) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found in ${table}: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found element in table with the id
        result({ kind: "not_found"}, null);
    });
};

exports.getAll = (result, table) => {
    sql.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log(`all entries in ${table}: `, res);
        result(null, res);
    });
}

exports.getAllWhere = (result, table, condition) => {
    sql.query(`SELECT * FROM ${table} WHERE ${condition}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`all entries in ${table} where ${condition}: `, res);
        result(null, res);
    });
}

exports.create = (result, table, newItem) => {
    sql.query(`INSERT INTO ${table} SET ?`, newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created new entry in ${table}: ", {id: res.insertId, ...newItem});
        result(null, {id: res.insertId, ...newItem});
    });
}