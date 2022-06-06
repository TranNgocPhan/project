import React, { useState, useEffect, useContext } from 'react';
import { getCookie } from '../../cookie/cookieHandler';
import axios from 'axios';


import './style.css';

function ChatRight( { message, maNguoiNhan } ) {
    const [receiver, setReceiver] = useState();

    useEffect(async () => {
        if(maNguoiNhan) {
            const { data } = await axios.get(`http://localhost:3001/getUserById/${maNguoiNhan}`);
            setReceiver(data[0]);
        }         
    }, [maNguoiNhan])

    return (
        <>
            {receiver && 
                <div className="message">
                    <img className="imageChatBox" src={require(`../../../public/images/dtb/${receiver.anh}`)} alt="" />
                    <div id="message_content" style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <p id="message_content_item" style={{margin: 'auto 0', padding: '1px'}}>
                            {message}
                        </p>
                    </div>
                    <span id="message_status"></span>
                 </div>    
            }
        </>
    );
}

export default ChatRight;