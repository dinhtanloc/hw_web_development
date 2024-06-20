import axios from 'axios';

const callChatGptApi = async (message) => {
  try {
    const response = await axios.post('http://localhost:8000/chatbot/', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return 'Sorry, I am having trouble responding right now. Please try again later.';
  }
};

export default callChatGptApi;
