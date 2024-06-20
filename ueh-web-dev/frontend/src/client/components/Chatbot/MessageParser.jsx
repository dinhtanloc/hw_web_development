class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      this.actionProvider.handleUserMessage(message);
    }
  }
  
  export default MessageParser;
  