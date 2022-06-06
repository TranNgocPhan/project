import React, { useEffect, useState } from 'react';
import { getCookie } from '../../cookie/cookieHandler';

import axios from 'axios';
import './style.css';

function ChatLeft( { message, maNguoiGui, thoiGianGui } ) {
    const [sender, setSender] = useState();

    useEffect(async () => {
        if(maNguoiGui) {
            const { data } = await axios.get(`http://localhost:3001/getUserById/${maNguoiGui}`);
            setSender(data[0]);
        }           
    }, [maNguoiGui])

    return (
        <>
            {sender &&       
                <div className="message" style={{alignItems: 'flex-start'}}>
                    <img className="imageChatBox" src={require(`../../../public/images/dtb/${sender.anh}`)} />
                    <div id="message_content" style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <p id="message_content_item" style={{margin: 'auto 0', padding: '1px'}}>{message}</p>
                    </div>
                    <span id="message_status">{`Sent ${thoiGianGui.slice(8,10)}-${thoiGianGui.slice(5,7)}-${thoiGianGui.slice(0,4)} ${thoiGianGui.slice(11,16)}`}</span>
                </div>           
            }
        </>
    )
}

export default ChatLeft;