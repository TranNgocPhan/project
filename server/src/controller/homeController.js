const sql = require('mssql');
const { config } = require('../database/config.js');
const assert = require('assert');

class HomeController {
    async getAdvisorList(req, res) { 
        try {   
            let pool = await sql.connect(config);     
            let result = await pool.request().query('EXEC FindAdvisor');
            res.json(result.recordset);
        } catch(err) {
            console.log('getAdvisorList error');
            console.log(err.message);
        }
    }
    async getUserById(req, res) {
        if(req.params.id != undefined) {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request().query(`EXEC FindUserByID ${parseInt(req.params.id)} `);
                res.json(result.recordset);
            } catch(err) {
                console.log('getUserById error');
                console.log(err.message);
            }
        } 
    }
    async addMessage(req, res) {
        try {
            let pool = await sql.connect(config);
            await pool.request().query(`EXEC AddMessage ${req.body.senderID},${req.body.receiverID},'${req.body.content}','${req.body.timeSending}'`);  
            res.json('Thêm tin nhắn thành công');               
        } catch(err) {
            console.log('addMessage error');
            console.log(err.message);
        }
    }
    async getMessageById(req, res) {
        console.log(req.query);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetMessageByID ${parseInt(req.query.senderID)},${parseInt(req.query.receiverID)}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getMessageById error');
            console.log(err.message);
        }
    }
    async getMessageByReceiverID(req, res) { 
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC CheckMessage ${parseInt(req.params.id)}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getMessageByReceiverID error');
            console.log(err.message);
        }
    }
    async getUser(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`Select * from NguoiDung`);         
            res.json(result.recordset);
        } catch(err) {
            console.log('getUser error');
            console.log(err.message);
        }
    }
    async updateStatus(req, res) {
        try {
            let pool = await sql.connect(config);
            await pool.request().query(`EXEC UpdateStatus ${parseInt(req.body.receiverID)}`);         
            res.json(false);
        } catch(err) {
            console.log('updateStatus error');
            console.log(err.message);
        }
    }
    async getMessageListByID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetMessageByReceiverID ${parseInt(req.params.id)}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getMessageListByID error');
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
    async getImageByIllness(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetImageByIllness ${parseInt(req.params.idBenh)}`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getImageByIllnesse error');
            console.log(err.message);
        }
    }
    async getCategory(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetCategoryList`);
            res.json(result.recordset);
        } catch(err) {
            console.log('getCategory error');
            console.log(err.message);
        }
    }
}

module.exports = new HomeController;