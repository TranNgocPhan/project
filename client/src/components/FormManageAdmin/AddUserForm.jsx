import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./style.css";
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, useNavigate } from 'react-router-dom';

function AddUserForm() {
    const ns = useRef();
    const [date, setDate] = useState('');
    const [sex, setSex] = useState('Nam');
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    let image = useRef('chibi.jpg');
    const addSuccess = useRef();
    const initialValues = {
        ten: "", email: "", soDienThoai: "", diaChi: "", ngaySinh: "", gioiTinh: "", anh: ""
    }
    const validationSchema = Yup.object().shape({
        ten: Yup.string()
            .required("Tên không được để trống")
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, "Tên không được chứa ký tự đặc biệt")
            .min(4, 'Tên phải chứa ít nhất 4 ký tự')
            .max(70, 'Tên chỉ chứa tôí đa 70 ký tự'),           
        email: Yup.string()
            .required("Tên email không được để trống")
            .matches(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, "Sai định dạng email"),
        soDienThoai: Yup.string()
            .required("Số điện thoại không được để trống")
            .matches(/^\S+$/, 'Số điện thoại không được có ký tự trắng')
            .matches(/^\d+$/, 'Số điện thoại phải là chữ số')
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(20, 'Số điện thoại chỉ chứa tối đa 20 ký tự'),
        diaChi: Yup.string()
            .required("Địa chỉ không được để trống")
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, "Địa chỉ không được chứa ký tự đặc biệt")        
            .min(6, 'Địa chỉ phải chứa ít nhất 6 ký tự')
            .max(70, 'Địa chỉ không được vượt quá 70 ký tự')
    })
    useEffect(() => {
        ns.current.style.display = 'none';
    }, [date])
    useLayoutEffect(() => {
        if(check) {
            addSuccess.current.style.display ='flex';
        }
    }, [check])
    async function handleSubmit(formData, { setSubmitting, resetForm }) {
        if(date === '') {
            ns.current.style.display = 'block';
            setSubmitting(false);
        }
        else {
            const info = {
                ten: formData.ten.trim(),
                soDienThoai: formData.soDienThoai,
                email: formData.email,               
                diaChi: formData.diaChi.trim(),
                gioiTinh: sex,
                ngaySinh: date,
                anh: image.current
            }
            setSubmitting(true);
            const { data } = await axios.post('http://localhost:3001/Admin/addUser', info);
            if(data === "Email này đã được đăng ký, vui lòng xem lại thông tin") alert('Email này đã được đăng ký, vui lòng xem lại thông tin');
            else setCheck(true);                    
        }
    }
    function handleImage(e) {
        let file = e.target.files[0];
        if(file) {
            let previewImage = document.querySelector('.preview_image');
            image.current = file.name;          
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.setAttribute('src', reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="container mt-3">
            <h2>Add User Form</h2> 
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
                        <label>Chọn giới tính của bạn</label>
                        <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}}>                                       
                        <Field type="radio" name="gioiTinh" onChange={e => setSex(e.target.value)} value="Nam" checked={sex === "Nam" ? true : false} />
                            <label>Nam</label>
                        </div>
                        <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}}>                                       
                        <Field type="radio" name="gioiTinh" onChange={e => setSex(e.target.value)} value="Nữ" checked={sex === "Nữ" ? true : false} />
                            <label>Nữ</label>
                        </div>                                
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '.4rem'}}>
                        <label>Chọn ngày sinh của bạn</label>
                        <Field type="date" id="dateInfo" name="ngaySinh" onChange={e => setDate(e.target.value)} value={date && date}/> 
                        <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} ref={ns}>Ngày sinh không được để trống</span>                             
                    </div>
                    <div style={{marginTop: '.4rem'}}>
                        <label>Chọn ảnh của bạn (dưới đây là ảnh mặc định)</label>
                        <Field style={{marginLeft: '.4rem', flex: 1}} type="file" name="anh" onChange={handleImage} />
                    </div>
                    <div className="preview">
                        <img className="preview_image" src="/images/dtb/chibi.jpg" alt="" style={{display: 'block'}} />                      
                    </div>
                    <button type="submit" className="btn btn-info mt-3 col-2" style={{fontSize: '1.2rem'}}>Add</button>                   
                </Form>
            </Formik>
            <hr />          
            <Link to="/Admin" style={{color: 'blue', textDecoration: 'underline', fontSize: '1.8rem'}}>Quay về trang quản lý</Link>      
            <div className="blur" ref={addSuccess}>
                <div className="blur_overllay"></div>
                <div className="adduser_alert-success">
                    <i className="far fa-smile"></i>
                    <span className="adduser_alert-success-text">Thêm người dùng thành công</span>
                    <button className="adduser_alert-success-btn" 
                        onClick={() => {
                            addSuccess.current.style.display ='none';
                            navigate('/Admin');
                        }}
                    >OK
                    </button>                
                </div>
            </div>
        </div>
        
    );
}

export default AddUserForm;