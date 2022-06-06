const sql = require('mssql');
const { config } = require('../database/config');
const assert = require('assert');

class ProfileController {
    async updateInfo(req, res) {
        let gt;
        if(req.body.gioiTinh == 'Nam') gt = 1;
        else gt = 0;
        const querySql = `UPDATE NguoiDung SET ten = N'${req.body.ten}', email = '${req.body.email}', soDienThoai = '${req.body.soDienThoai}', diaChi = N'${req.body.diaChi}', gioiTinh = ${gt}, ngaySinh = '${req.body.ngaySinh}', anh = '${req.body.anh}'
                          WHERE maNguoiDung = ${parseInt(req.body.ma)}`;
        try {
            let pool = await sql.connect(config);
            await pool.request().query(querySql);
            res.json("Cập nhật thành công!");          
        } catch (err) {
            res.json("Cập nhật thất bại!");
        }
    }
    async getAccountByID(req, res) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`EXEC GetAccountByID ${parseInt(req.params.id)}`);
            res.json(result.recordset);          
        } catch (err) {
            res.json("Cập nhật thất bại!");
        }
    }
    async updatePassword(req, res) {
        try {
            let pool = await sql.connect(config);
            await pool.request().query(`EXEC UpdatePasswordByID ${req.body.maNguoiDung},'${req.body.matKhau}'`);
            res.json("Cập nhật thành công!");          
        } catch (err) {
            res.json("Cập nhật thất bại!");
        }
    }
}

module.exports = new ProfileController;