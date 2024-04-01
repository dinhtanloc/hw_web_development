"use client";
import { useState } from "react";
const PasswordPage = ()=>{
    const [inputValue, setInputValue] = useState("")
    const [displayText, setDisplayText] = useState("")
    const onButtonClick = ()=>{
        console.log("click")
        setDisplayText(inputValue)
    }
    return (
        <div>
            <input type="password" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
            <button onClick={()=>onButtonClick()}>Click</button>
            <div>Bạn vừa nhập: </div>
            <div>{displayText}</div>
        </div>
    )
}
export default PasswordPage