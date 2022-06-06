import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import './style.css';

function Signup() {
    const [date, setDate] = useState('');
    const [sex, setSex] = useState('Nam');
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    let image = useRef('chibi.jpg');
    const resSuccess = useRef(), ns = useRef();
    const initialValues = {
        ten: "", email: "", matKhau: "", soDienThoai: "", diaChi: "", ngaySinh: "", gioiTinh: "", anh: ""
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
        matKhau: Yup.string()
            .required("Mật khẩu không được để trống")
            .matches(/^\S+$/, 'Mật khẩu không được có ký tự trắng')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/, 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt')
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(50, 'Mật khẩu chỉ chứa tối đa 50 ký tự'),
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
            .max(70, 'Địa chỉ không được vượt quá 70 ký tự'),
    })
    useEffect(() => {
        ns.current.style.display = 'none';
    }, [date])
    useLayoutEffect(() => {
        if(check) {
            resSuccess.current.style.display ='flex';
        }
    }, [check])

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
    async function handleSubmit(formData, { setSubmitting, resetForm }) {
        if(date === '') {
            ns.current.style.display = 'block';
            setSubmitting(false);
        }
        else {
            const info = {
                ten: formData.ten.trim(),
                email: formData.email,
                matKhau: formData.matKhau,
                soDienThoai: formData.soDienThoai,
                diaChi: formData.diaChi.trim(),
                gioiTinh: sex,
                ngaySinh: date,
                anh: image.current
            }
            setSubmitting(true);
            const { data } = await axios.post('http://localhost:3001/Signup/addNewUser', info);
            if(data === "Email này đã được đăng ký, vui lòng xem lại thông tin") alert('Email này đã được đăng ký, vui lòng xem lại thông tin');
            else setCheck(true);                    
        }
    }

    return (
        <>
            <div id="modal">          
                <div id="modal_middle"> 
                    <Link to="/" id="modal_title">Healthy Care</Link>                      
                    <Formik id="formDK" style={{position: 'relative'}} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                        <Form style={{"position":"relative","display":"block","width":"46rem","height":"97rem", "border": "1px solid #e4e8ec", "boxShadow":"0.2rem 0.2rem 0.4rem rgba(0,0,0,0.05)","borderRadius": "1.6rem", "backgroundColor": "#fff"}}>
                            <div id="form_title">
                                <h3 id="form_title-text">Đăng ký</h3>
                            </div>
                            <span id="form_text1">Dùng email hoặc tài khoản mạng xã hội để đăng nhập hoặc đăng ký mới.</span>
                            <div id="formGroup">
                                <Field className="formGroup_input" name="ten" placeholder="Nhập họ tên của bạn" autoComplete="off" />
                                <ErrorMessage name="ten" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}}></span>
                                <Field className="formGroup_input" name="email" placeholder="Nhập email của bạn" autoComplete="off" />
                                <ErrorMessage name="email" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}}></span>
                                <Field className="formGroup_input" name="matKhau" placeholder="Nhập mật khẩu của bạn" autoComplete="off" />
                                <ErrorMessage name="matKhau" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}}></span>
                                <Field className="formGroup_input" name="soDienThoai" placeholder="Nhập số điện thoại của bạn" autoComplete="off" />
                                <ErrorMessage name="soDienThoai" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}}></span>
                                <Field className="formGroup_input" name="diaChi" placeholder="Nhập địa chỉ của bạn" autoComplete="off" />
                                <ErrorMessage name="diaChi" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}}></span>                        
                                <div style={{display: 'flex', marginTop: '1.4rem', marginLeft: '2.6rem', alignItems: 'center'}}>
                                    <label>Chọn ngày sinh của bạn</label>
                                    <Field type="date" id="dateInfo" name="ngaySinh" onChange={e => setDate(e.target.value)} value={date && date}/>                               
                                </div>
                                <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} ref={ns}>Ngày sinh không được để trống</span>
                                <div style={{display: 'flex', marginTop: '1.4rem', marginLeft: '2.6rem', alignItems: 'center'}}>
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
                                <div style={{display: 'flex', marginTop: '1.4rem', marginLeft: '1.2rem'}}>
                                    <label style={{flex: 1.1}}>Chọn ảnh của bạn (dưới đây là ảnh mặc định)</label>
                                    <Field style={{marginLeft: '.4rem', flex: 1}} type="file" name="anh" onChange={handleImage} />
                                </div>
                                <div className="preview">
                                    <img className="preview_image" src="./images/dtb/chibi.jpg" alt="" />
                                    <p className="preview_text">Image Preview</p>
                                </div>
                            </div>                     
                            <button id="formDK_btn" type="submit">Đăng ký</button>                             
                        </Form>
                    </Formik>   
                </div>                         
            </div>
            <div className="blur" ref={resSuccess}>
                <div className="blur_overllay"></div>
                <div className="register_alert-success">
                    <i className="far fa-smile"></i>
                    <span className="register_alert-success-text">Đăng ký thành công</span>
                    <button className="register_alert-success-btn" 
                        onClick={() => {
                            resSuccess.current.style.display ='none';
                            navigate('/Signin');
                        }}
                    >OK
                    </button>                
                </div>
            </div>
        </>
        
    )
}

export default Signup