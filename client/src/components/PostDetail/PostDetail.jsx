import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { getCookie } from '../../cookie/cookieHandler';
import axios from 'axios';
import BtnRequest from '../Button/BtnRequest';
import ChatBox from '../ChatBox/ChatBox';
import AlertRequest from '../Alert/AlertRequest';

function PostDetail() {
    const [illnessInfo, setIllnessInfo] = useState();
    const [imageIllness, setImageIllness] = useState();
    const [categoryName, setCategoryName] = useState();
    const userInfo = getCookie('userAccess').split(',');
    const [advisor, setAdvisor] = useState();
    const [type, setType] = useState();
    const chatRef = useRef(), alertRef = useRef();
    const [advisorInfo, setAdvisorInfo] = useState('');
    const idBenh = getCookie('numPost');

    useEffect(() => {
        console.log(idBenh);
    },[idBenh])
    useEffect(() => {
        async function fetchData() {            
            const { data } = await axios.get(`http://localhost:3001/Illness/getIllnessByID/${idBenh}`);
            setIllnessInfo(data[0]);
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3001/Illness/getIllnessImageByID/${idBenh}`);
            setImageIllness(data[0])
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
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3001/Illness/getCategoryNameByID/${idBenh}`);
            setCategoryName(data[0]);  
        }
        fetchData();
    }, []);
    useEffect(() => {   
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3001/Illness/getUserByID/${illnessInfo.maChuyenGia}`);
            setAdvisor(data[0]);
        }
        if(illnessInfo) fetchData();         
    }, [illnessInfo])
    function handleRequest(advisor1) {
        if(userInfo[0] !== '') {
            setAdvisorInfo(advisor1);   
            chatRef.current.chatappShow();
          }
          else {
            alertRef.current.style.display = 'flex';
          }
    }

    return (
        <>
            {illnessInfo && imageIllness && categoryName && advisor &&
                <section>
                    <div class="container">
                        <h1>{categoryName.tenChuyenMuc}</h1>        
                    </div>
                    <div class="container">
                        <div class="row" style={{flexWrap: 'unset'}}>
                            <div class="col-8">
                                <ul class="list-unstyled">
                                    <li class="media">
                                        <div class="media-body">
                                            <img src={require(`../../../public/images/dtb/${imageIllness.anh}`)}  alt="" class="img-thumbnail" />
                                            <h1>{illnessInfo.tieuDeBenh}</h1>
                                            {illnessInfo.chiTietBenh}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: '5rem', marginTop: '6rem'}}>
                                <img src="images/team/test-thumb1.jpg" alt="" class="img-fluid" />
                                <p style={{marginTop: '1.6rem', fontSize: '1.6rem', fontWeight: 'bold'}}>Chuyên gia tư vấn : {advisor.ten}</p>
                                {(type === 'User' && <BtnRequest handleRequest={handleRequest} obj={advisor} />) || (!type && <BtnRequest handleRequest={handleRequest} obj={advisor} />)}
                            </div>
                        </div>
                    </div>
                </section>
            }
            <ChatBox ref={chatRef} maNguoiGui={parseInt(userInfo[0])} maNguoiNhan={advisorInfo.maNguoiDung} />
            <AlertRequest ref={alertRef} />
        </>
    );
}

export default PostDetail;