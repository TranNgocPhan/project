import React from "react";
import "./style.css";
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, userNavigate } from 'react-router-dom';

function AddDiseaseForm() {
  const initialValues = {
    ten: "", email: "", matKhau: "", soDienThoai: "", diaChi: "", ngaySinh: "", gioiTinh: "", anh: ""
  }
  const validationSchema = Yup.object().shape({
      
  })
  async function handleSubmit(formData, { setSubmitting, resetForm }) {

  }

  return (
    <div className="container mt-3">
        <h2>Add Disease Form</h2> 
        <hr />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} className="w-75" >
            <Form className="w-50" >
                <Field type="text" name="tieuDeBenh" placeholder="Tiêu đề bệnh" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="tieuDeBenh" component="span" class="errorMessage" />
                <Field type="text" name="chiTietBenh" placeholder="Chi tiết bệnh" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="chiTietBenh" component="span" class="errorMessage" />
                <Field type="text" name="maChuyenMuc" placeholder="Mã chuyên mục" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="maChuyenMuc" component="span" class="errorMessage" />
                <Field type="text" name="maChuyenGia" placeholder="Mã chuyên gia" className="formGroup_input" autoComplete="off" />
                <ErrorMessage name="maChuyenGia" component="span" class="errorMessage" />               
                <button type="submit" className="btn btn-info mt-3 col-2" style={{fontSize: '1.2rem'}}>Add</button>                   
            </Form>
        </Formik>
        <hr />          
        <Link to="/Admin" style={{color: 'blue', textDecoration: 'underline', fontSize: '1.8rem'}}>Quay về trang quản lý</Link>      
    </div>
  );
}

export default AddDiseaseForm;