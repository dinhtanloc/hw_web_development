import {React,useState} from "react";

const Mypassword = () => {
    const [value,setValue] = useState('');
    const handleClick = (event) => {
        setValue(`Password entered: ${event.target.value}`);
    };

    return (
        <>
            <div>
            {/* <h1>Hello</h1> */}

            <input type="text" value={value} onChange={handleClick} />
            <input type='submit' value={'Button'}/>
            <p>{setValue}</p>
            </div>
        </>
    )


};
export default Mypassword;