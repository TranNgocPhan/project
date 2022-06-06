import React, { useEffect, useLayoutEffect, useState, useRef, Component }from "react";
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setCookie, removeCookie } from '../../cookie/cookieHandler';
import axios from 'axios';
import ChatBox from '../ChatBox/ChatBox';
import BtnRequest from '../Button/BtnRequest';
import AlertRequest from '../Alert/AlertRequest';
import './style.css';

export const AdvisorContext = React.createContext();

function HomeContent() {
    const settings = {dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1};
    const userInfo = getCookie('userAccess').split(',');
    const [advisorList, setAdvisorList] = useState([]);
    const [illness, setIllness] = useState([]);
    const [imageIllness, setImageillness] = useState([]);
    const [type, setType] = useState();
    const chatRef = useRef(), alertRef = useRef();
    const [advisorInfo, setAdvisorInfo] = useState('');
    
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get('http://localhost:3001/getAdvisorList');
        setAdvisorList(data);
      }
      fetchData();
    }, []);
    useLayoutEffect(() => {
      setCookie('numPost', '');
    }, [])
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(`http://localhost:3001/getIllness`);
        setIllness(data);
      }
      fetchData();
    }, []);
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(`http://localhost:3001/Illness/getIllnessImage`);
        setImageillness(data);
      }
      fetchData();
    }, []);
    useEffect(() => {
      async function fetchData() {          
        const { data } = await axios.get(`http://localhost:3001/getAccountType/${parseInt(userInfo[0])}`);
        setType(data[0].tenLoaiTaiKhoan);        
      }
      if(userInfo[0] !== '') fetchData();
      else setType();
    }, []);
    function handleRequest(advisor) {
      if(userInfo[0] !== '') {
        setAdvisorInfo(advisor);   
        chatRef.current.chatappShow();
      }
      else {
        alertRef.current.style.display = 'flex';
      }
    }
    

    return (
        <div className="abc">
          <div className="banner-inner pt-5">
            <div className="container">
              <div className="row"></div>
            </div>
            <div className="container">         
              {illness.length >= 1 && imageIllness.length >= 1 &&                                            
                  <div className="row">
                    <div className="col-lg-5">
                      <Link className="thumb after-left-top" to="/Illness" onClick={() => setCookie('numPost', 1)}>
                        <img src={require(`../../../public/images/dtb/${imageIllness[0].anh}`)} className="img-thumbnail" />
                      </Link>
                      <div className="banner-details mt-4 mt-lg-0">
                        <h3 style={{marginTop: '1.4rem'}}>
                          <Link to="/Illness" onClick={() => setCookie('numPost', 1)}>
                            {illness[0].tieuDeBenh}
                          </Link>
                        </h3>
                        <p>
                          {illness[0].chiTietBenh.slice(0, 180)}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-2">                          
                    </div>
                    <div className="col-lg-5">
                      <div className="media border-bottom py-3">
                        <Link to="/Illness" onClick={() => setCookie('numPost', 5)} >
                          <img
                            className="mr-4"
                            src={require(`../../../public/images/dtb/${imageIllness[4].anh}`)}
                            alt=""
                            height={70}
                          />
                        </Link>
                        <div className="media-body">
                          <h3 className="my-2">
                            <div>
                              <Link to="/Illness" onClick={() => setCookie('numPost', 5)}>
                                {illness[4].tieuDeBenh}
                              </Link>
                            </div>                  
                          </h3>
                          <span className="text-sm text-muted">{illness[4].chiTietBenh.slice(0, 180)}</span>
                        </div>
                      </div>
                      <div className="media border-bottom py-3">
                        <Link to="/Illness" onClick={() => setCookie('numPost', 9)}>
                          <img
                            className="mr-4"
                            src={require(`../../../public/images/dtb/${imageIllness[8].anh}`)}
                            alt=""
                            height={70}
                          />
                        </Link>
                        <div className="media-body">
                          <h3 className="my-2">
                            <Link to="/Illness" onClick={() => setCookie('numPost', 9)}>{illness[8].tieuDeBenh}</Link>
                          </h3>
                          <span className="text-sm text-muted">{illness[8].chiTietBenh.slice(0, 180)}</span>
                        </div>
                      </div>
                    </div>
                  </div>                                                                                  
              }          
            </div>
          </div>
          <section className="section testimonial-2 gray-bg">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="section-title text-center">
                    <h2>Thông Tin Chuyên Gia</h2>
                    <div className="divider mx-auto my-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <Slider {...settings}>
                { advisorList && advisorList.map((obj, index) => {
                    return (
                      <div key={obj.email}>
                        <div className="col-lg-4 col-sm-6 col-md-6" >
                          <div>
                            <div className="contact-block mb-4 mb-lg-0" >
                              <div className="testimonial-block style-2  gray-bg">
                                <i className="icofont-quote-right" />
                                <div className="testimonial-thumb">
                                  <Link to="">
                                    <img src={require(`../../../public/images/dtb/${obj.anh}`)} alt="" className="img-fluid" />                                                     
                                  </Link>                                                                   
                                </div>
                                <div className="client-info">                                
                                  <span style={{display: 'block', fontWeight: 'bold'}}>{obj.ten}</span>
                                  <span>{obj.email}</span>
                                  <p>
                                    
                                  </p>
                                  {(type === 'User' && <BtnRequest handleRequest={handleRequest} obj={obj} />) || (!type && <BtnRequest handleRequest={handleRequest} obj={obj} />)}
                                </div>                  
                              </div>        
                            </div>
                          </div>
                        </div>
                      </div>
                    )                   
                })}          
            </Slider>
          </div>               
          <ChatBox ref={chatRef} maNguoiGui={parseInt(userInfo[0])} maNguoiNhan={advisorInfo.maNguoiDung} />            
          <AlertRequest ref={alertRef} />
        </div>
        
    );
}
export default HomeContent;
