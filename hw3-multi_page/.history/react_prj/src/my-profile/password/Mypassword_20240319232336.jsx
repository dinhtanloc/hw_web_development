import {React,useState} from "react";

const Mypassword = () => {
    const [value,setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
        setMessage(message);
    };
    return (
        <>
            <div>
            {/* <h1>Hello</h1> */}
            <input type="text" value={value} onChange={handleChange} />
            <input type='submit' value={'Button'} onClick={handleClick}/>
            <p>{message}</p>
            </div>
        </>
    )


};
export default Mypassword;