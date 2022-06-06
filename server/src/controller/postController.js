const sql = require('mssql');
const { config } = require('../database/config');
const assert = require('assert');

class PostController {
    async getPostByCategoryID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetIllnessPost ${req.params.id}`);
            res.json(result.recordset);
        }
        catch (err) {
            console.log('getPostByCategoryID error');
            console.log(err.message);
        }
    }
}

module.exports = new PostController;