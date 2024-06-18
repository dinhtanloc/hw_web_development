import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('http://localhost:8000/api/chat/', { message: input });
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        }

        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbox;
