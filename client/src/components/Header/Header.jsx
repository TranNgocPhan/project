import React, { useEffect, useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '../../cookie/cookieHandler.js';
import axios from 'axios';
import { getPostList, getSearchValue } from '../../store/action';
import { store } from '../../store';

import './style.css';
import ChatBox1 from '../ChatBox/ChatBox1';
import { removeVietnameseTones, checkSearch } from '../../handleFunction';

function Header(props, ref) {
  const navigate = useNavigate();
  const userInfo = getCookie('userAccess').split(',');
  const image1 = useRef(), image2 = useRef(), sisoBlock = useRef(), loginSuccess = useRef(), searchRef = useRef(), searchHiddenRef = useRef(), notifyInfo = useRef();
  let l = useRef(1), k = useRef(1);
  const [message, setMessage] = useState([]);
  const [messageReceiver, setMessageReceiver] = useState([]);
  const [senderID, setSenderID] = useState('');
  const [userList, setUserList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState();
  const chatRef = useRef();

  useImperativeHandle(ref, () => ({
    hideSearch() {
      searchRef.current.style.display = 'none';
      searchHiddenRef.current.style.display = 'block';
    }
  }));
  useEffect(() => {
      searchRef.current.style.display = 'flex';
      searchHiddenRef.current.style.display = 'none';
  }, []);
  useEffect(() => {
    let notifyBlock = document.querySelector('.header_notification');
    if(userInfo[0] !== '') {
      sisoBlock.current.style.display = 'none';
      notifyBlock.style.display = 'block';
      loginSuccess.current.style.display = 'block';
      image1.current.setAttribute('src', `images/dtb/${userInfo[7]}`);
      image2.current.setAttribute('src', `images/dtb/${userInfo[7]}`);
    }
    else {
      setFlag(false);
      sisoBlock.current.style.display = 'block';
      notifyBlock.style.display = 'none';
      loginSuccess.current.style.display = 'none';
    }
  }, [userInfo]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/getMessage/${userInfo[0]}`);
      setMessage(data);
    }
    if(userInfo[0] !== '') fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {          
      const { data } = await axios.get(`http://localhost:3001/getAccountType/${parseInt(userInfo[0])}`);
      setType(data[0].tenLoaiTaiKhoan);        
    }
    if(userInfo[0] !== '') fetchData();
    else setType();
  }, []);
  useEffect(() => { 
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/getUser`)
      setUserList(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {     
      const { data } = await axios.get(`http://localhost:3001/getMessageByReceiverID/${userInfo[0]}`);
      setMessageReceiver(data);
    }
    if(userInfo[0] !== '') fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/getCategory`);
      setCategory(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if(messageReceiver.length >= 1) {
      setFlag(messageReceiver.some(obj => !obj.trangThai));
    }
  }, [messageReceiver]);
  function handleLogout() {
    let signinInfo = document.querySelector('.signin_info');
    signinInfo.style.display = 'none';
    setCookie('userAccess', []);
    sisoBlock.current.style.display = 'block';
    loginSuccess.current.style.display = 'none';
    navigate('/');
  }
  function handlePopupInfo() {
    let signinInfo = document.querySelector('.signin_info'); 
    if(k.current == 1) {
      signinInfo.style.display = 'block';
      k.current = 0;
    }
    else {
      signinInfo.style.display = 'none';
      k.current = 1;
    }
  }
  async function handlePopUpNotify() {
    if(l.current == 1) {
      notifyInfo.current.style.display = 'block';
      l.current = 0;
    }
    else {
      notifyInfo.current.style.display = 'none';
      l.current = 1;
    }
    const id = { receiverID: parseInt(userInfo[0])};
    const { data } = await axios.put('http://localhost:3001/updateStatus', id);
    setFlag(data);
  }
  async function handlePopupChatBox(message1) {
    chatRef.current.chatappShow();
    setSenderID(message1.maNguoiGui);
  }
  async function handleSearch(e) {
    if(e.key === 'Enter') {
      if(e.target.value.includes(' ')) {
        const valueArray = e.target.value.split(' ');
        let idCM = 0;
        for(let value of valueArray) {
          if(checkSearch(value) != 0) {
            idCM = checkSearch(value);
            break;
          }
        }
        if(idCM != 0) {
          const { data } = await axios.get(`http://localhost:3001/Post/${idCM}`);
          store.dispatch(getPostList(data, e.target.value));
        }
        else store.dispatch(getPostList('', ''));           
      }
      else {
        let idCM1 = checkSearch(e.target.value);
        const respone = await axios.get(`http://localhost:3001/Post/${idCM1}`);
        if(idCM1 != 0) store.dispatch(getPostList(respone.data, e.target.value));
        else store.dispatch(getPostList('', ''));
      }
      navigate('/Post');
    }
  }

  return (
    <>
      <header>
        <div className="header-top-bar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <ul className="top-bar-info list-inline-item pl-0 mb-0">
                  <li className="list-inline-item">
                    <i className="icofont-location-pin mr-2" />
                    Đà Nẵng - Việt Nam
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="text-lg-right top-right-bar mt-2 mt-lg-0" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <div ref={sisoBlock}>
                      <Link to="/Signin">
                        <span className="h4" style={{fontSize: '1.8rem'}}>Đăng nhập</span>
                      </Link>
                      <span className="h4" style={{color: 'white', fontSize: '1.8rem'}}> / </span>
                      <Link to="/Signup">
                        <span className="h4" style={{fontSize: '1.8rem'}}>Đăng ký</span>
                      </Link>
                    </div>
                        <div className="header_notification" onClick={handlePopUpNotify}>    
                          <i class="fa-solid fa-comment"></i>
                          <div className="notification_info" ref={notifyInfo}>                       
                            {message.length >= 1 && userList.length >= 1 ? message.map((obj, index) => {
                              let user = userList.find(obj1 => obj1.maNguoiDung == obj.maNguoiGui);                                                    
                              return (
                                  <div className="notification_info-item" key={index} onClick={() => handlePopupChatBox(obj)} >
                                    <img className="notification_info-item-image" src={require(`../../../public/images/dtb/${user.anh}`)} alt="" />
                                    <div className="notification_item-right">
                                      <span style={{marginTop: '1.8rem', alignSelf: 'flex-start'}} className="notification_item-right-text">{obj.noiDung}</span>
                                      <span style={{color: 'var(--color-textgray)', marginTop: 'none'}} className="notification_item-right-text">{`${obj.thoiGianGui.slice(8,10)}-${obj.thoiGianGui.slice(5,7)}-${obj.thoiGianGui.slice(0,4)} ${obj.thoiGianGui.slice(11,16)}`}</span>                             
                                    </div>
                                  </div>
                              )
                            }                     
                                                            
                              ) : <div style={{position: 'relative', border: '1px solid black', backgroundColor: 'var(--color-blue)', fontSize: '1.6rem', color: 'var(--color-white)', display: 'flex', height: '3rem', alignItems: 'center', justifyContent: 'center'}}>Bạn không có thông báo nào</div>
                            }                         
                                                                                            
                          </div>                   
                        </div>                                  
                        <div className="login_success" onClick={handlePopupInfo} ref={loginSuccess}>
                          <img className="login_success-image" alt="" src="" ref={image1} />                  
                        </div>                        
                        <div className="signin_info">
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div className="info_header">
                              <img src="" className="info_header-image" alt="" ref={image2} />
                              <div className="info_header-text">
                                <p className="info_header-text1">{userInfo[1]}</p>
                                <p className="info_header-text2">{userInfo[3]}</p>
                              </div>                           
                            </div>
                            <div style={{position: 'relative', marginTop: '0.3rem'}} className="line" />
                            <Link className="info_header-item" to="/Profile">
                              <i style={{fontSize: '1.8rem'}} className="fas fa-user-circle" />
                              <p className="info_header-item-text" id="profileRedirect" style={{marginRight: '2rem'}}>Hồ sơ cá nhân</p>
                            </Link>
                            <div style={{position: 'relative', marginTop: '0.3rem'}} className="line" />
                            {type === 'Admin' && 
                               (
                                 <>
                                  <Link className="info_header-item" to="/Admin">                             
                                    <i style={{fontSize: '1.8rem'}} class="fa-solid fa-gear"></i>
                                    <p className="info_header-item-text" id="profileRedirect" style={{marginRight: '2rem'}}>Quản lý website</p>
                                  </Link>
                                  <div style={{position: 'relative', marginTop: '0.3rem'}} className="line" />
                                 </>
                               )    
                            }                                                                
                            <div className="info_header-item" onClick={handleLogout}>
                              <i className="fas fa-sign-out-alt" />
                              <p className="signout_text" style={{marginRight: '2rem'}}>Đăng xuất</p>
                            </div>
                          </div>
                        </div>
                        {flag && <div className="notify_icon"></div>}                                    
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="navbar navbar-expand-lg navigation bg-light"
          id="navbar"
        >
          <div className="container">
            <Link to="/" className="container_title" style={{color: '#4d8dff', fontWeight: 'bold'}}>
              Healthy Care
            </Link>
            <div className="row row-1">
              <div className="header_search" ref={searchRef}>
                <i className="fas fa-search" />
                <input className="header_search-input" type="text" placeholder="Tìm kiếm" style={{border: 'none', outline: 'none'}} onKeyDown={handleSearch} />                   
              </div>
              <div className="header_search-hidden"ref={searchHiddenRef} ></div>
            </div>
            <div className="collapse navbar-collapse" id="navbarmain">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Trang Chủ
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="dropdown02"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Chuyên Mục
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="dropdown02" style={{border: '1px solid var(--color-grayborder)', borderRadius: '1.6rem', boxShadow: '0.2rem 0.2rem 0.4rem rgba(0,0,0,0.05)'}}>
                    {category.length >= 1 && category.map(obj => 
                      <li key={obj.maChuyenMuc} className="category_item">
                        <Link className="dropdown-item" to="/Category" style={{fontSize: '1.4rem'}} onClick={(() => setCookie('numCategory', obj.maChuyenMuc))} >
                          {obj.tenChuyenMuc}
                        </Link>
                      </li>
                    )}                  
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/HospitalSearch">
                    Tìm Bệnh Viện
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="dropdown02"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Kiểm Tra Sức Khỏe
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="dropdown02" style={{border: '1px solid var(--color-grayborder)', borderRadius: '1.6rem', boxShadow: '0.2rem 0.2rem 0.4rem rgba(0,0,0,0.05)'}}>
                    <li style={{fontSize: '1.4rem'}}>
                      <Link className="dropdown-item" to="/BMI" >
                        Đo chỉ số BMI
                      </Link>
                    </li>
                    <li style={{fontSize: '1.4rem'}}>
                      <Link className="dropdown-item" to="/BMR" >
                        Tính chỉ số calo (BMR)
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <ChatBox1 ref={chatRef} maNguoiGui={senderID} maNguoiNhan={parseInt(userInfo[0])} />
    </>
  );
}

export default forwardRef(Header);
