export const chatService = {
  getChats: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { id: 'chat_1', name: 'Albus_Mentor', lastMessage: 'Remember: Courage is not the absence of fear.', unread: 1, avatar: 'mentor', isPremium: true },
      { id: 'chat_2', name: 'Alpha Group', lastMessage: 'Who is up for a early morning run?', unread: 0, avatar: 'group', isPremium: false },
    ];
  },
  getMessages: async (chatId) => {
    return [
      { id: '1', sender: 'Albus_Mentor', text: 'Welcome, brother.', timestamp: '10:00 AM' },
      { id: '2', sender: 'me', text: 'Thanks. Struggling with balance lately.', timestamp: '10:05 AM' },
      { id: '3', sender: 'Albus_Mentor', text: 'Remember: Courage is not the absence of fear.', timestamp: '10:06 AM' },
    ];
  },
  sendMessage: async (chatId, text, isVoice = false) => {
    return { id: Math.random().toString(), sender: 'me', text, isVoice, timestamp: 'Just now' };
  }
};
