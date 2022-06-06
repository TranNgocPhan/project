const sql = require('mssql');
const { config } = require('../database/config.js');
const assert = require('assert');

class AdminController {
    async addUser(req, res) {
        let gt;
        if(req.body.gioiTinh == 'Nam') gt = 1;
        else gt = 0;
        try {
            let pool = await sql.connect(config);
            let i = await pool.request().query(`EXEC CheckUser '${req.body.email}'`);
            if(i.recordset.length >= 1) {
                res.json("Email trùng");
            }
            else {
                await pool.request().query(`EXEC AddUser N'${req.body.ten}','${req.body.soDienThoai}','${req.body.email}',N'${req.body.diaChi}',${gt},'${req.body.ngaySinh}','${req.body.anh}'`);
                await pool.request().query(`EXEC AddAccount '${req.body.email}','${req.body.matKhau}',0`);
                await pool.request().query(`EXEC AddAccountType '${req.body.email}'`);
                res.json("Thêm thành công!");
            }           
        } catch (err) {
            console.log('addUser error');
            assert.equal(null, err);
        }
    }
    async getUserList(req, res) {   
        try {   
            let pool = await sql.connect(config);     
            let result = await pool.request().query(`Select * from NguoiDung`); 
            res.json(result.recordset);
        } catch(err) {
            console.log('getUserList error');
            console.log(err.message);
        }
    }
    async updateUserByID(req, res) {
        if(req.params.id != undefined) {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request().query(`EXEC UpdateUserByID ${parseInt(req.params.id)} `);
                res.json(result.recordset);
            } catch(err) {
                console.log('updateUserByID error');
                console.log(err.message);
            }
        } 
    }
    async getAccountType(req, res) {   
        try {   
            let pool = await sql.connect(config);     
            let result = await pool.request().query(`Select * from LoaiTaiKhoan`); 
            res.json(result.recordset);
        } catch(err) {
            console.log('getAccountType error');
            console.log(err.message);
        }
    }
    async updateAccountType(req, res) {
        if(req.params.id != undefined) {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request().query(`EXEC UpdateAccountType ${parseInt(req.params.id)} `);
                res.json(result.recordset);
            } catch(err) {
                console.log('UpdateAccountType error');
                console.log(err.message);
            }
        } 
    }
    async addIllness(req, res) {   
        try {   
            let pool = await sql.connect(config);     
            let result = await pool.request().query(`EXEC AddIllness`); 
            res.json(result.recordset);
        } catch(err) {
            console.log('addIllness error');
            assert.equal(null, err);
        }
    }
    async getIllness(req, res) {   
        try {   
            let pool = await sql.connect(config);     
            let result = await pool.request().query(`EXEC GetIllness`); 
            res.json(result.recordset);
        } catch(err) {
            console.log('getIllness error');
            console.log(err.message);
        }
    }
    async updateIllness(req, res) {
        if(req.params.id != undefined) {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request().query(`EXEC UpdateIllness ${parseInt(req.params.id)} `);
                res.json(result.recordset);
            } catch(err) {
                console.log('updateIllness error');
                console.log(err.message);
            }
        } 
    }
    async deleteIllness(req, res) {
        if(req.params.id != undefined) {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request().query(`EXEC DeleteIllness ${parseInt(req.params.id)} `);
                res.json(result.recordset);
            } catch(err) {
                console.log('deleteIllness error');
                console.log(err.message);
            }
        } 
    }
}

module.exports = new AdminController();