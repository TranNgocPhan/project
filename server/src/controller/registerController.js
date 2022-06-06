const sql = require('mssql');
const { config } = require('../database/config');
const assert = require('assert');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();

class RegisterController {
    async verifyEmail(req, res) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        })
        transporter.verify((error, success) => {
            if(error) {
                console.log(error);
                res.json("Error");
            }
            else {
                res.json("Success");
                console.log("Ready for messages");
                console.log(success);
            }
        })
    }
    async addNewUser(req, res) {
        let gt;
        if(req.body.gioiTinh == 'Nam') gt = 1;
        else gt = 0;
        try {
            let pool = await sql.connect(config);
            let i = await pool.request().query(`EXEC CheckUser '${req.body.email}'`);
            if(i.recordset.length >= 1) {
                res.json("Email này đã được đăng ký, vui lòng xem lại thông tin");
            }
            else {
                await pool.request().query(`EXEC AddUser N'${req.body.ten}','${req.body.soDienThoai}','${req.body.email}',N'${req.body.diaChi}',${gt},'${req.body.ngaySinh}','${req.body.anh}'`);
                await pool.request().query(`EXEC AddAccount '${req.body.email}','${req.body.matKhau}'`);
                await pool.request().query(`EXEC AddAccountType '${req.body.email}'`);
                res.json("Đăng ký thành công!");
            }           
        } catch (err) {
            res.json("Đăng ký thất bại!!!");
            assert.equal(null, err);
        }
    }
}

module.exports = new RegisterController;