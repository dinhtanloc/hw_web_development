import {React,useState} from "react";

const Mypassword = () => {
    const [value,setValue] = useState('');
    c const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
        setMessage(`Password entered: ${message}`);
    };
    return (
        <>
            <div>
            {/* <h1>Hello</h1> */}

            <input type="text" value={value} onChange={handleChange} />
            <input type='submit' value={'Button'} onChange={handleClick}/>
            <p>{value}</p>
            </div>
        </>
    )


};
export default Mypassword;