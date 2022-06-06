import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { setCookie } from '../../cookie/cookieHandler';

import './style.css';

function Signin() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const userNameMS = useRef(); const passMS = useRef();
    const initialValues = {
        tenDangNhap: "",
        matKhau: ""
    }
    const validationSchema = Yup.object().shape({
        tenDangNhap: Yup.string().required("Bạn chưa nhập tên đăng nhập"),
        matKhau: Yup.string().required("Bạn chưa nhập mật khẩu")
    })
    useEffect(() => {
        if(userName !== '' || password !== '') {
            userNameMS.current.style.display = 'none';
            passMS.current.style.display = 'none';
        }
    }, [userName, password])
    async function handleOnsubmit(x) {
        const { data } = await axios.get("http://localhost:3001/Signin/getAccount");
        const info = { tenDN: document.querySelector('#formGroup_input1').value, pass: document.querySelector('#formGroup_input2').value};
        const checkInfo = data.some(obj => obj.tenDangNhap === info.tenDN && obj.matKhau === info.pass);
        if(checkInfo) {
            const response = await axios.get(`http://localhost:3001/Signin/getUser/${x.tenDangNhap.trim()}`);
            const y = response.data[0];
            setCookie('userAccess',`${y.maNguoiDung},${y.ten},${y.soDienThoai},${y.email},${y.diaChi},${y.gioiTinh},${y.ngaySinh},${y.anh}`);
            navigate('/');
        }
        else {
            userNameMS.current.style.display = 'block';
            userNameMS.current.textContent = 'Tên email hoặc tên password không đúng, vui lòng nhập lại';
            passMS.current.style.display = 'block';
            passMS.current.textContent = 'Tên email hoặc tên password không đúng, vui lòng nhập lại';
        }
    }
    
    return (
        <div id="modal">          
            <div id="modal_middle"> 
                <Link to="/" id="modal_title1">Healthy Care</Link>                      
                <Formik id="formDN" style={{position: 'relative'}} initialValues={initialValues} onSubmit={handleOnsubmit} validationSchema={validationSchema}>
                    <Form style={{"position":"relative","width":"42rem","height":"70rem", "border": "1px solid #e4e8ec", "boxShadow":"0.2rem 0.2rem 0.4rem rgba(0,0,0,0.05)","borderRadius": "1.6rem", "display" : "flex", "flexDirection": "column", "justifyContent": "center", "backgroundColor": "#fff"}}>
                        <div id="form_title">
                            <h3 id="form_title-text">Đăng nhập</h3>
                        </div>
                        <span id="form_text1">Dùng email hoặc tài khoản mạng xã hội để đăng nhập hoặc đăng ký mới.</span>
                        <div id="formGroup">
                            <Field id="formGroup_input1" name="tenDangNhap" placeholder="Nhập email của bạn" autoComplete="off" onInput={e => {setUserName(e.target.value)}} value={userName.trim()} />
                            <ErrorMessage name="tenDangNhap" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                            <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} ref={userNameMS}></span>
                            <Field id="formGroup_input2" name="matKhau" placeholder="Nhập mật khẩu của bạn" autoComplete="off" onInput={e => {setPassword(e.target.value)}} value={password.trim()} type="password" />
                            <ErrorMessage name="matKhau" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                            <span style={{display: 'none', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} ref={passMS}></span>
                        </div>
                        <span style={{"fontSize":"1.4rem","padding":"1rem","position":"relative","top":"1.4rem","fontStyle":"italic"}}>Nếu bạn chưa có tài khoản, vui lòng 
                            <Link id="register_redirect" style={{color: "var(--color-blue)"}} to="/Signup"> Đăng ký </Link>
                            tại đây
                        </span>
                        <button id="formDN_btn" type="submit">Đăng nhập</button>         
                    </Form>
                </Formik>   
            </div>                         
        </div>
    );
}

export default Signin;