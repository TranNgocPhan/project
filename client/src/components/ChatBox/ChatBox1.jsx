import React, { forwardRef, useContext, useEffect, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { setCookie, getCookie } from '../../cookie/cookieHandler';
import './style.css';

import ChatRight from './ChatRight';
import ChatLeft from './ChatLeft';
import axios from 'axios';


function ChatBox1({maNguoiGui, maNguoiNhan}, ref) {
    const chatRef = useRef(), closeRef = useRef();
    const dummy = useRef(), sendInput = useRef();
    const userInfo = getCookie('userAccess').split(',');
    const [messageList, setMessageList] = useState([]);
    let today = new Date();

    function handleClose() {       
        chatRef.current.style.display = 'none';
    }
    useImperativeHandle(ref, () => ({
        chatappShow() {
            chatRef.current.style.display = 'block';
        }
    }))
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3001/getMessageById?senderID=${maNguoiGui}&receiverID=${maNguoiNhan}`); 
            setMessageList(data);
        }
        if(maNguoiNhan != undefined && maNguoiGui != '') {
            fetchData();
        }
    }, [maNguoiNhan, maNguoiGui]);
    useEffect(() => {
        sendInput.current.value = '';
    }, [messageList]);
    const sendMessage = async e => {
        let timeSending = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        const info1 = {
            senderID: maNguoiNhan,
            receiverID: maNguoiGui,
            content: sendInput.current.value,
            timeSending: timeSending
        }
        await axios.post(`http://localhost:3001/addMessage`, info1);
        dummy.current.scrollIntoView({ behavior: 'smooth'});
        const { data } = await axios.get(`http://localhost:3001/getMessageById?senderID=${maNguoiGui}&receiverID=${maNguoiNhan}`); 
        setMessageList(data);
    }
    async function handleKey(e) {
        if(e.key === 'Enter') {
            let timeSending = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
            const info = {
                senderID: maNguoiNhan,
                receiverID: maNguoiGui,
                content: e.target.value,
                timeSending: timeSending
            }
            dummy.current.scrollIntoView({ behavior: 'smooth'});
            await axios.post(`http://localhost:3001/addMessage`, info);
            const { data } = await axios.get(`http://localhost:3001/getMessageById?senderID=${maNguoiGui}&receiverID=${maNguoiNhan}`);  
            setMessageList(data);            
        }
    }

    return (
        <div className="App" ref={chatRef} >
            <section>
                <header>
                    <h1 style={{color: 'white'}}>ChatBox HealthyCare</h1>
                    <div className="closeBlock" onClick={handleClose} ref={closeRef} >
                        <i class="fa-solid fa-circle-xmark" style={{fontSize: '4rem', color: '#FF4500'}}></i>
                    </div>
                </header>
                <main>
                    {messageList.length >= 1 && messageList.map((obj,index) => {
                        if(maNguoiGui == obj.maNguoiGui)
                            return <ChatRight key={index} message={obj.noiDung} maNguoiNhan={maNguoiGui} />
                        else
                            return <ChatLeft key={index} message={obj.noiDung} maNguoiGui={maNguoiNhan} thoiGianGui={obj.thoiGianGui} />
                    })}                
                    <span ref={dummy}></span>         
                </main>
                <div className="formCB">
                    <input className="inputCB" placeholder="Type something here..." onKeyDown={handleKey} ref={sendInput} />
                    <button className="btn_chatbox" type="button" onClick={sendMessage} style={{backgroundColor: 'rgb(56, 56, 143)'}}>Send</button>
                </div>
            </section>
        </div>              
    );
}

export default forwardRef(ChatBox1);