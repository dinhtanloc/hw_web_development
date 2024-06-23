import React, { useRef, useEffect, useState } from "react";

// import SupportWindow from './SupportWindow'
import Bot from "./Chatbot";

import Avatar from './Avatar'

const ChatPopup = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)
    // const [checkUser, Userchecking] = useState(null);

    // useEffect(()=>{
    //     if(isUser){
    //         console.log(isUser.isUser)
    //         Userchecking(isUser.isUser)
    //     }
    // },[checkUser])

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef}>

        <Bot visible={visible} />


        <Avatar 
        onClick={() => setVisible(!visible)}
        style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100000,
        }}
        />
           
        </div>
    )
}

export default ChatPopup;

