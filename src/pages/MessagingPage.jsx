import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagingPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    useEffect(() => {
        const fetchConversations = async () => {
            if (!userInfo.token) return;
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/messages/conversations', config);
                setChats(data);
                if (data.length > 0) setSelectedUser(data[0].id);
            } catch (error) {
                console.error("Failed to load conversations", error);
            }
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!selectedUser || !userInfo.token) return;
        const fetchMessages = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/messages/${selectedUser}`, config);
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };
        fetchMessages();
    }, [selectedUser, userInfo.token]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post(
                'http://localhost:5000/api/messages', 
                { receiverId: selectedUser, content: newMessage }, 
                config
            );
            setMessages([...messages, data]);
            setNewMessage('');
            
            // Re-fetch conversations to keep sidebar fresh
            const convRes = await axios.get('http://localhost:5000/api/messages/conversations', config);
            setChats(convRes.data);
            
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <div className="fade-in">
            <section className="page-hero">
                <div className="panel">
                    <p className="eyebrow">Interaction / Messaging</p>
                    <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>Keep support moving through direct communication.</h1>
                    <p>Basic messaging gives helpers and requesters a clear follow-up path once a match happens.</p>
                </div>
            </section>
            
            <section className="detail-grid section">
                
                <div className="panel">
                    <p className="section-kicker">Conversation stream</p>
                    <h2>Recent messages</h2>
                    <div className="message-list fade-in" style={{ marginTop: '16px' }}>
                        {messages.length === 0 ? (
                            <p className="muted">No messages in this conversation yet. Send the first message!</p>
                        ) : messages.map((msg, index) => {
                            const isMe = msg.sender === userInfo._id;
                            const relatedUser = chats.find(c => c.id === (isMe ? msg.receiver : msg.sender))?.name || "User";
                            const senderName = isMe ? userInfo.name : relatedUser;
                            const receiverName = isMe ? relatedUser : userInfo.name;
                            
                            return (
                                <div key={msg._id || index} className="message-item">
                                    <div>
                                        <strong>{senderName} → {receiverName}</strong>
                                        <p>{msg.content}</p>
                                    </div>
                                    <span className="tag">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form className="form-card stack" onSubmit={handleSendMessage}>
                    <p className="section-kicker">Send message</p>
                    <h2>Start a conversation</h2>
                    
                    <div className="field">
                        <label>To</label>
                        <select 
                            name="to" 
                            value={selectedUser} 
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select a user...</option>
                            {chats.map(chat => (
                                <option key={chat.id} value={chat.id}>{chat.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="field">
                        <label>Message</label>
                        <textarea 
                            name="text" 
                            placeholder="Share support details, ask for files, or suggest next steps."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    
                    <button className="btn btn-primary" type="submit">Send</button>
                </form>
                
            </section>
        </div>
    );
};

export default MessagingPage;
