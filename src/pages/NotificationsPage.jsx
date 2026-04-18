import React, { useState, useEffect } from 'react';
import axios from '../axios';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) return;

                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('/api/notifications', config);
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/notifications/${id}`, {}, config);
            
            setNotifications(notifications.map(n => 
                n._id === id ? { ...n, read: true } : n
            ));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    return (
        <section className="section page-hero fade-in" style={{ padding: '60px 0' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="section-head">
                    <div>
                        <p className="section-kicker">Live Signals</p>
                        <h1 style={{ fontSize: '2.5rem' }}>Your Notifications</h1>
                    </div>
                </div>

                <div className="panel stack">
                    {loading ? (
                        <div className="center">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="center">No notifications yet. You're all caught up!</div>
                    ) : notifications.map((notif, i) => (
                        <div key={notif._id} className="notif-item list-item fade-in" style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer', background: notif.read ? 'var(--surface)' : 'rgba(255,255,255,0.85)' }} onClick={() => { markAsRead(notif._id); if(notif.link) window.location.href=notif.link; }}>
                            <div className="row" style={{ flex: 1, gap: '16px' }}>
                                <span className="orb" style={{ position: 'static', width: '10px', height: '10px', background: notif.read ? 'var(--line)' : 'var(--primary)' }}></span>
                                <div>
                                    <div style={{ fontWeight: notif.read ? 600 : 700, fontSize: '1rem', color: 'var(--text)' }}>{notif.content}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            {!notif.read && <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>New</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NotificationsPage;
