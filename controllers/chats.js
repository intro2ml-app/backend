import ChatModel from '../models/Chat.js';
import ChatHistoryModel from '../models/ChatHistory.js';

const generatingChatName = async (chat_id, message) => {
  const chatHistories = await ChatHistoryModel.find({ chat_id: chat_id });
  if (chatHistories.length !== 0) return;

  try {
    const query = { _id: chat_id };
    const suggestedName = await fetch('http://192.168.0.41:8000/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.response);

    const update = {
      $set: {
        chat_name: suggestedName,
        updated_at: new Date(),
      }
    };
    await ChatModel.updateOne(query, update);
  } catch (err) {
    console.error('Error generating chat name');
  }
};

export { generatingChatName };