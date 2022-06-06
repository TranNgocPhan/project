const sql = require('mssql');
const { config } = require('../database/config');
const assert = require('assert');

class LoginController {
    async getAccount(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('Select * from TaiKhoan');
            res.json(result.recordset);
        } catch (err) {
            assert.equal(null, err);
        }
    }
    async getUser(req, res) {
        let email = req.params.slug;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC FindUser '${email}'`);
            res.json(result.recordset);
        } catch (err) {
            assert.equal(null, err);
        }
    }
}

module.exports = new LoginController;