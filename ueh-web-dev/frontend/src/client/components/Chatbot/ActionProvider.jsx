import React from 'react';
import callChatGptApi from '../../utils/callChatGptApi';
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleUserMessage = async (message) => {
    const botResponse = await callChatGptApi(message);
    const botMessage = this.createChatBotMessage(botResponse);
    
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;
