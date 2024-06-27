import axios from 'axios';

const gpt = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_BACKEND
});

const callChatGptApi = async (message) => {
  try {
    const response = await gpt.post('/chatbot/', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return 'Sorry, I am having trouble responding right now. Please try again later.';
  }
};

export default callChatGptApi;
