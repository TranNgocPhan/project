import React, { useEffect, useRef } from "react";
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, userNavigate } from 'react-router-dom';

function UpdateAccountForm() {

    const initialValues = {
        ten: "", email: "", matKhau: "", soDienThoai: "", diaChi: "", ngaySinh: "", gioiTinh: "", anh: ""
    }
    const validationSchema = Yup.object().shape({
        
    })
    async function handleSubmit(formData, { setSubmitting, resetForm }) {

    }

    return (
    <div className="container mt-3">
        <h2>Update Account Form</h2> 
        <hr />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} className="w-75" >
            <Form className="w-50" >
                <Field type="text" name="tenDangNhap" placeholder="Tên đăng nhập" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="tenDangNhap" component="span" class="errorMessage" />
                <Field type="text" name="matKhau" placeholder="Mật khẩu" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="matKhau" component="span" class="errorMessage" />
                <div style={{marginTop: '1.2rem'}}>
                    <label>Active status:</label>
                    <span style={{marginLeft: '2rem'}}>true</span>
                </div>
                <button type="submit" className="btn btn-info mt-3 col-2" style={{fontSize: '1.2rem'}}>Update</button>                   
            </Form>
        </Formik>
        <hr />          
        <Link to="/Admin" style={{color: 'blue', textDecoration: 'underline', fontSize: '1.8rem'}}>Quay về trang quản lý</Link>      
    </div>
    )
}

export default UpdateAccountForm;