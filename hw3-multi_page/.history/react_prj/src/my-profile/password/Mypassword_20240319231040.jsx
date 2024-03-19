import {React,useState} from "react";

const Mypassword = () => {
    const [value,setValue] = useState('');

    return (
        <>
            <div>
            {/* <h1>Hello</h1> */}
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <input type='submit' value={'Button'}/>
            <p>{setValue}</p>
            </div>
        </>
    )


};
export default Mypassword;