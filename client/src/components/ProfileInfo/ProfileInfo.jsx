import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { getCookie, setCookie } from '../../cookie/cookieHandler';

import './style.css';

function ProfileInfo() {
    const userInfo = getCookie('userAccess').split(',');
    const myAccount = useRef(), accountProfile = useRef(), accountChangePass = useRef(), emailRef = useRef(), addressRef = useRef(), phoneRef = useRef(), sexRef = useRef(), nameRef = useRef(), dateRef = useRef(), btnProfile = useRef(), profileInfo = useRef(), profilePassword = useRef();
    const oldPassMessage = useRef(), newPassMessage = useRef(), confirmNewPassMessage = useRef();
    let image = useRef(userInfo[7]), k = useRef(0), l = useRef(1);
    const [sex, setSex] = useState(userInfo[5] === true ? 'Nam' : 'Nữ');
    const [type, setType] = useState();
    const [date, setDate] = useState('');
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [checkEdit, setCheckEdit] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [verifyNewPass, setVerifyNewPass] = useState('');
    const initialValues = {
        email: '',
        name: '',
        address: '',
        phone: '',
    }
    const initialValues1 = {
        oldPass: '',
        newPass: '',
        confirmNewPass: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Sai định dạng email"),
        name: Yup.string()
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, "Tên không được chứa ký tự đặc biệt")
            .min(4, 'Tên phải chứa ít nhất 4 ký tự')
            .max(70, 'Tên chỉ chứa tôí đa 70 ký tự'),
        address: Yup.string()
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, "Địa chỉ không được chứa ký tự đặc biệt")
            .min(6, 'Địa chỉ phải chứa ít nhất 6 ký tự')
            .max(70, 'Địa chỉ không được vượt quá 70 ký tự'),
        phone: Yup.string()
            .matches(/^\S+$/, 'Số điện thoại không được có ký tự trắng')
            .matches(/^\d+$/, 'Số điện thoại phải là chữ số')
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(20, 'Số điện thoại chỉ chứa tối đa 20 ký tự'),
    })
    const validationSchema1 = Yup.object().shape({
        oldPass: Yup.string()
            .required('Bạn chưa nhập mật khẩu cũ'),
        newPass: Yup.string()
            .required('Bạn chưa nhập mật khẩu mới')
            .matches(/^\S+$/, 'Mật khẩu không được có ký tự trắng')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/, 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt')
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(50, 'Mật khẩu chỉ chứa tối đa 50 ký tự'),
        confirmNewPass: Yup.string()
            .required('Bạn chưa xác nhận mật khẩu mới')
    })

    useEffect(() => {
        async function fetchData() {          
          const { data } = await axios.get(`http://localhost:3001/getAccountType/${parseInt(userInfo[0])}`);
          setType(data[0].tenLoaiTaiKhoan);        
        }
        if(userInfo[0] !== '') fetchData();
        else setType();
      }, []);
    function handleImage(e) {
        let file = e.target.files[0];
        if(file) {
            let imageUser = document.querySelector('.imageUser');
            image.current = file.name;          
            const reader = new FileReader();
            reader.onload = () => {
                imageUser.setAttribute('src', reader.result);
            }
            reader.readAsDataURL(file);
        }
    }
    function handleEdit() {
        const userInfo1 = getCookie('userAccess').split(',');
        userInfo1[5] === 'true' ? setSex('Nam') : setSex('Nữ');
        let infoArray = document.querySelectorAll('.form_group-info');
        let inputArray = document.querySelectorAll('.form_group-input');
        infoArray.forEach(obj => obj.style.display = 'none');
        inputArray.forEach(obj => obj.style.display = 'block');
        btnProfile.current.style.display = 'block';
        document.querySelector('#imageProfileChoosen').style.display = 'block';
        setEmail(userInfo1[3]);
        setName(userInfo1[1]);
        setAddress(userInfo1[4]);
        setPhone(userInfo1[2]);
        setDate(`${userInfo1[6].slice(0,10)}`);
    }
    function handleAccountClick() {
        if(l.current == 1) {
            accountProfile.current.setAttribute('style', 'display: none; animation: fadein ease-out 0.25s; transition: .08s');
            accountChangePass.current.setAttribute('style', 'display: none; animation: fadein ease-out 0.25s; transition: .08s');
            l.current = 0;
        }
        else {
            accountProfile.current.setAttribute('style', 'display: block; animation: fadein ease-in 0.25s; transition: .1s');
            accountChangePass.current.setAttribute('style', 'display: block; animation: fadein ease-in 0.25s; transition: .08s');               
            l.current = 1;         
        }
    }
    function handleProfileClick() {
        profileInfo.current.style.display = 'block';
        profilePassword.current.style.display = 'none';
    }
    function handleChangePassClick() {
        profileInfo.current.style.display = 'none';
        profilePassword.current.style.display = 'block';
    }
    async function handleSubmit() {
        let infoArray = document.querySelectorAll('.form_group-info');
        let inputArray = document.querySelectorAll('.form_group-input');
        const info = {
            ma: userInfo[0],
            ten: name.trim(),
            email: email,
            soDienThoai: phone,
            diaChi: address.trim(),
            gioiTinh: sex,
            ngaySinh: date,
            anh: image.current
        }
        let gt = info.gioiTinh == 'Nam' ? true : false;
        const { data } = await axios.put('http://localhost:3001/Profile/updateInfo', info);
        alert(data);
        if(data == 'Cập nhật thành công!') {
            setCookie('userAccess',`${info.ma},${info.ten},${info.soDienThoai},${info.email},${info.diaChi},${gt},${info.ngaySinh},${info.anh}`);
            console.log(getCookie('userAccess').split(','));
            checkEdit === true ? setCheckEdit(false) : setCheckEdit(true);
        }
        infoArray.forEach(obj => obj.style.display = 'block');
        inputArray.forEach(obj => obj.style.display = 'none');
        btnProfile.current.style.display = 'none';
        document.querySelector('#imageProfileChoosen').style.display = 'none';
    }
    async function handleSubmitChangePass({ setSubmitting }) {
        const { data } = await axios.get(`http://localhost:3001/Profile/getAccountByID/${userInfo[0]}`);
        if(oldPass !== data[0].matKhau) {
            oldPassMessage.current.style.display = 'block';
            setSubmitting(false);
        }
        else if(verifyNewPass !== newPass) {
            confirmNewPassMessage.current.style.display = 'block';
            setSubmitting(false);
        }
        else {
            const info = {
                maNguoiDung: userInfo[0],
                matKhau: newPass
            }
            const response = await axios.put('http://localhost:3001/Profile/updatePassword', info);
            alert(response.data);
            setOldPass('');
            setNewPass('');
            setVerifyNewPass('');
            profileInfo.current.style.display = 'block';
            profilePassword.current.style.display = 'none';
            setSubmitting(true);
        }
    }

    return (
        <>
            {userInfo[0] !== '' && type &&
                <div className="grid">
                    <div className="profile_wrap">
                        <div className="profile_left">
                            <div className="profile_left-header">
                                <img className="profile_left-header-image" src={require(`../../../public/images/dtb/${userInfo[7]}`)} alt="" />
                                <div className="profile_left-header-content">
                                    <span className="profile_left-header-content-text1" />
                                    <div className="profile_left-header-edit">
                                        <i className="fas fa-edit" />
                                        <span className="profile_left-header-content-text2" onClick={handleEdit}>Sửa hồ sơ</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: '2.6rem'}} className="separate" />
                            <div className="profile_left-body">
                                <div className="profile_body-item">
                                    <img className="profile_body-item-image" src="./images/dtb/profile.png" alt="" />
                                    <div className="profile_body-item-list">
                                        <span className="profile_body-item-list-text" ref={myAccount} onClick={handleAccountClick}>Tài khoản của tôi</span>
                                        <span className="profile_body-item-list-text" ref={accountProfile} onClick={handleProfileClick}>Hồ sơ</span>
                                        <span className="profile_body-item-list-text" ref={accountChangePass} onClick={handleChangePassClick}>Đổi mật khẩu</span>
                                    </div>
                                </div>
                                <div className="profile_body-item" style={{display: 'none'}}>
                                    <img className="profile_body-item-image" src="./images/dtb/notify.png" alt="" />
                                    <div className="profile_body-item-list">
                                        <span className="profile_body-item-list-text" id="myNotify">Thông báo</span>
                                        <span style={{display: 'none'}} className="profile_body-item-list-text" id="historyRequest">Lịch sử yêu cầu nhà tư vấn</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile_right">
                            <div className="profile_info" ref={profileInfo}>
                                <div className="profile_info-header">
                                    <span className="profile_info-title">Hồ Sơ Của Tôi</span>
                                    <span className="profile_info-text">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>                      
                                </div>
                                <div style={{marginBottom: '1.2rem'}} className="separate" />
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    <Form id="formProfile">
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Email</label>
                                                <span className="form_group-info" ref={emailRef}>{userInfo[3]}</span>
                                                <Field name="email" className="form_group-input" id="emailInfo" value={email} onInput={e => setEmail(e.target.value)} />
                                                <ErrorMessage name="email" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                        
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Tên</label>
                                                <span className="form_group-info" ref={nameRef}>{userInfo[1]}</span>
                                                <Field name="name" className="form_group-input" id="nameInfo" value={name} onInput={e => setName(e.target.value)} />
                                                <ErrorMessage name="name" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                        
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Địa chỉ</label>
                                                <span className="form_group-info" ref={addressRef}>{userInfo[4]}</span>
                                                <Field name="address" className="form_group-input" id="addressInfo" value={address} onInput={e => setAddress(e.target.value)} />
                                                <ErrorMessage name="address" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                        
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Số điện thoại</label>
                                                <span className="form_group-info" ref={phoneRef}>{userInfo[2]}</span>
                                                <Field name="phone" className="form_group-input" id="phoneInfo" value={phone} onInput={e => setPhone(e.target.value)} />
                                                <ErrorMessage name="phone" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                        
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Ngày sinh</label>
                                                <span className="form_group-info" ref={dateRef}>{`${userInfo[6].slice(8,10)}-${userInfo[6].slice(5,7)}-${userInfo[6].slice(0,4)}`}</span>
                                                <Field type="date" id="dateInfo" name="date" onChange={e => setDate(e.target.value)} value={date}/>
                                                <ErrorMessage name="date" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                        
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.8rem'}}>
                                            <label className="form_group-label">Giới tính</label>
                                            <span className="form_group-info" ref={sexRef}>{userInfo[5] === 'true' ? 'Nam' : 'Nữ'}</span>
                                            <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}} className="sexGroup">                                       
                                                <Field type="radio" name="gioiTinh" onChange={e => setSex(e.target.value)} value="Nam" checked={sex === 'Nam' ? true : false} />
                                                <label>Nam</label>
                                            </div>
                                            <div style={{marginLeft: '1.2rem', marginTop: '0.2rem'}} className="sexGroup">                                       
                                                <Field type="radio" name="gioiTinh" onChange={e => setSex(e.target.value)} value="Nữ" checked={sex === 'Nữ' ? true : false} />
                                                <label>Nữ</label>
                                            </div>                                
                                        </div>
                                        <div className="form_group">                                
                                            <label className="form_group-label">Hình của bạn</label>
                                            <Field name="image" type="file" id="imageProfileChoosen" onChange={handleImage} />
                                            <img className="imageUser" src={require(`../../../public/images/dtb/${userInfo[7]}`)} alt="" />                                
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label" style={{marginTop: '.4rem'}}>Loại tài khoản</label>   
                                                <span className="form_group-info1">{`${type} (Bạn không được phép sửa đổi thông tin này)`}</span>
                                            </div>     
                                        </div>
                                        <button className="btn_saveInfo" ref={btnProfile} type="submit">Lưu thông tin</button>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="profile_password" ref={profilePassword}>
                                <div className="profile_info-header">
                                    <span className="profile_info-title">Đổi mật khẩu</span>
                                    <span className="profile_info-text">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>                   
                                </div>
                                <div className="separate" />
                                <Formik initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={handleSubmitChangePass}>
                                    <Form id="formChangePass">
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Nhập mật khẩu cũ</label>                                
                                                <Field style={{display: 'block', height: '3rem'}} className="form_group-input" name="oldPass" type="password" value={oldPass} onInput={e => {oldPassMessage.current.style.display = 'none'; setOldPass(e.target.value)}} />
                                                <ErrorMessage name="oldPass" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                                <div className="form_message" ref={oldPassMessage}>Nhập sai mật khẩu, vui lòng nhập lại</div>
                                            </div>                                       
                                        </div>
                                        <div className="form_group">
                                            <div className="form_group-up">
                                                <label className="form_group-label">Nhập mật khẩu mới</label>
                                                <Field style={{display: 'block', height: '3rem'}} name="newPass" className="form_group-input" type="password" value={newPass} onInput={e => setNewPass(e.target.value)} />
                                                <ErrorMessage name="newPass" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                            </div>                                    
                                        </div>
                                        <div className="form_group">                                
                                            <div className="form_group-up">
                                                <label className="form_group-label">Xác nhận mật khẩu mới</label>                               
                                                <Field style={{display: 'block', height: '3rem'}} name="confirmNewPass" className="form_group-input" type="password" value={verifyNewPass} onInput={e => {confirmNewPassMessage.current.style.display = 'none'; setVerifyNewPass(e.target.value)}} />
                                                <ErrorMessage name="confirmNewPass" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginLeft: '2.8rem', marginTop: '.6rem', fontSize: '1.4rem'}} />                               
                                                <div className="form_message" ref={confirmNewPassMessage}>Xác nhận mật khẩu sai,vui lòng nhập lại</div>                                                           
                                            </div>
                                        </div>
                                        <button type="submit" className="btn_saveInfo" style={{display: 'block'}}>Lưu thông tin</button>
                                    </Form>
                                </Formik>              
                            </div>
                        </div>
                    </div> 
                </div>
            }
        </>
    )
}

export default ProfileInfo;