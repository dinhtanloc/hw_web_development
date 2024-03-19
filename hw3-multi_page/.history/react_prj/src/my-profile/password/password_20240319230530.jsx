import {React,useState} from "react";

const Password = () => {
    const [value,setValue] = useState('');
    return (
        <>
        <div>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <p>{setValue}</p>
        <input type='submit' value={Button}/>
        </div>
        </>
    )


};
export default Password;