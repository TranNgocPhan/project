const sql = require('mssql');
const { config } = require('../database/config');
const assert = require('assert');

class IllnessController {
    async getIllnessImage(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('EXEC GetIllnessImage');
            res.json(result.recordset);
        }
        catch (err) {
            console.log('getIllnessImage error');
            console.log(err.message);
        }
    }
    async getIllnessByID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetIllnessByID ${req.params.idBenh}`);
            res.json(result.recordset);
        } catch (err) {
            console.log('getIllnessByID error');
            console.log(err.message);
        }
    }
    async getIllnessImageByID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetImageIllnessByID ${parseInt(req.params.id)}`);
            res.json(result.recordset);
        }
        catch (err) {
            console.log('getIllnessImageByID error');
            console.log(err.message);
        }
    }
    async getCategoryNameByID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetCategoryName ${parseInt(req.params.id)}`);
            res.json(result.recordset);
        }
        catch (err) {
            console.log('getCategoryNameByID error');
            console.log(err.message);
        }
    }
    async getUserById(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC FindUserByID ${parseInt(req.params.id)} `);
            res.json(result.recordset);
        } catch(err) {
            console.log('getUserById error');
            console.log(err.message);
        } 
    }
    async getAccountType(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetLoaiTK ${parseInt(req.params.id)}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getAccountType error');
            console.log(err.message);
        }
    }
}

module.exports = new IllnessController;