import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
    ChatContent,
    MessageInput,
    MsgTextField,
    SendMsgBtn,
    MyMessage,
    TheirMessage,
    MessagesList,
} from '../style/components/Chat.style';

interface ChatParams {
    sessionId: string | undefined;
    senderId: string;
}

const Chat: React.FC<ChatParams> = ({ sessionId, senderId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { t } = useTranslation();

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            axios
                .post(
                    `http://localhost:8000/api/sessions/${sessionId}/messages`,
                    { content: newMessage },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                )
                .then((res) => {
                    setMessages((prevMessages) => [...prevMessages, res.data]);
                    setNewMessage('');
                })
                .catch((error) => console.error('Error sending message:', error));
        }
    };

    useEffect(() => {
        // Fetch Messages
        axios
            .get(`http://localhost:8000/api/sessions/${sessionId}/messages`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((res) => setMessages(res.data))
            .catch((error) => console.error('Error fetching messages:', error));
    }, [sessionId]);

    return (
        <ChatContent>
            <h2>
                {t('chat_with')} Session {sessionId}
            </h2>
            <MessagesList>
                {messages.map((msg, index) => {
                    const isMyMessage = msg.sender._id === senderId;
                    return isMyMessage ? (
                        <MyMessage key={index}>
                            <p>
                                <strong>{msg.sender.name}:</strong> {msg.content}
                            </p>
                            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </MyMessage>
                    ) : (
                        <TheirMessage key={index}>
                            <p>
                                <strong>{msg.sender.name}:</strong> {msg.content}
                            </p>
                            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </TheirMessage>
                    );
                })}
            </MessagesList>
            <MessageInput>
                <MsgTextField
                    type="text"
                    placeholder={t('type_message')}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <SendMsgBtn onClick={handleSendMessage}>
                    &#9993;
                </SendMsgBtn>
            </MessageInput>
        </ChatContent>
    );
};

export default Chat;
