import React, { useState } from "react"

import { styles } from "../../assets/data/styles"
import '../../styles/chatbot.css'
import Chatbot from 'react-chatbot-kit';
import config from '../Chatbot/config'
import MessageParser from '../Chatbot/MessageParser'
import ActionProvider from '../Chatbot/ActionProvider'
// import EmailForm from "./EmailForm";
// import ChatEngine from "./ChatEngine";

const Bot = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    // styles.js



// export default styles;


    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' }
            }}
        >
        <div className="Chatbot">

            <Chatbot 
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            />
        </div>

        
            {/* <EmailForm 
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)} 
            />

            <ChatEngine 
                visible={user !== null && chat !== null}
                user={user} 
                chat={chat} 
            /> */}
        </div>
    )
}

export default Bot;
