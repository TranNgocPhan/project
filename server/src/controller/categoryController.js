const sql = require('mssql');
const { config } = require('../database/config');


class CategoryController {
    async getCategoryByID(req, res) {
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetCategoryByIDCM ${req.params.id}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getCategoryByID error');
            console.log(err.message);
        }
    }
    async getPostByCategoryID(req, res) {
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetIllnessPost ${req.params.id}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getPostByCategoryID error');
            console.log(err.message);
        }
    }
}

module.exports = new CategoryController;