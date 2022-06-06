import React, { useEffect, useRef } from "react";
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, userNavigate } from 'react-router-dom';

function UpdateUserForm() {
    const date = useRef('2000-05-27');
    const initialValues = {
        ten: "", email: "", matKhau: "", soDienThoai: "", diaChi: "", ngaySinh: "", gioiTinh: "", anh: ""
    }
    const validationSchema = Yup.object().shape({
        
    })
    async function handleSubmit(formData, { setSubmitting, resetForm }) {

    }

    return (
        <div className="container mt-3">
            <h2>Update User Form</h2> 
            <hr />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} className="w-75" >
                <Form className="w-50" >
                    <Field type="text" name="ten" placeholder="Tên" className="formGroup_input" autoComplete="off" />
                    <ErrorMessage name="ten" component="span" class="errorMessage" />
                    <Field type="text" name="soDienThoai" placeholder="Số điện thoại" className="formGroup_input" autoComplete="off" />
                    <ErrorMessage name="soDienThoai" component="span" class="errorMessage" />
                    <Field type="text" name="email" placeholder="Email" className="formGroup_input" autoComplete="off" />
                    <ErrorMessage name="email" component="span" class="errorMessage" />
                    <Field type="text" name="diaChi" placeholder="Địa chỉ" className="formGroup_input" autoComplete="off" />
                    <ErrorMessage name="diaChi" component="span" class="errorMessage" />
                    <div style={{display: 'flex', marginTop: '1.4rem', alignItems: 'center'}}>
                        <label>Giới tính của bạn</label>
                        <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}}>                                       
                            <Field type="radio" name="gioiTinh" />
                            <label>Nam</label>
                        </div>
                        <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}}>                                       
                            <Field type="radio" name="gioiTinh" />
                            <label>Nữ</label>
                        </div>                                
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '.4rem'}}>
                        <label>Ngày sinh của bạn</label>
                        <Field type="date" id="dateInfo" name="ngaySinh" value="2000-05-27" />                               
                    </div>
                    <div style={{marginTop: '.4rem'}}>
                        <label style={{display: 'block'}}>Ảnh của bạn</label>
                        <Field type="file" id="imageProfileChoosen" name="anh" />
                        <img className="imageUser" src="/images/dtb/chibi.jpg" />
                    </div>
                    <button type="submit" className="btn btn-info mt-3 col-2" style={{fontSize: '1.2rem'}}>Update</button>                   
                </Form>
            </Formik>
            <hr />          
            <Link to="/Admin" style={{color: 'blue', textDecoration: 'underline', fontSize: '1.8rem'}}>Quay về trang quản lý</Link>      
        </div>
    );
}

export default UpdateUserForm;