import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [requests, setRequests] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [stats, setStats] = useState({
        trustScore: 0,
        helping: 0,
        openRequests: 0,
        aiInsights: 0
    });
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                
                // Fetch parallel requests for speed
                const [reqRes, leadRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/requests'),
                    axios.get('http://localhost:5000/api/leaderboard')
                ]);

                let notifData = [];
                if (userInfo.token) {
                    try {
                        const notifRes = await axios.get('http://localhost:5000/api/notifications', config);
                        notifData = notifRes.data;
                    } catch (e) { console.warn("Failed to fetch notifications"); }
                }
                
                setRequests(reqRes.data.slice(0, 3));
                setLeaderboard(leadRes.data.slice(0, 3));
                setNotifications(notifData.slice(0, 3));
                
                setStats({
                    trustScore: userInfo.trustScore || 0,
                    helping: reqRes.data.filter(r => r.responders?.some(resp => resp.user === userInfo._id)).length || 0,
                    openRequests: reqRes.data.length,
                    aiInsights: Math.max(1, Math.floor(reqRes.data.length / 2))
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [userInfo.trustScore, userInfo.token, userInfo._id]);

    return (
        <div className="fade-in">
            <section className="page-hero section">
                <div className="panel">
                    <p className="eyebrow">Dashboard</p>
                    <h1 style={{ fontSize: 'clamp(2.3rem, 4vw, 4.2rem)' }}>
                        Welcome back, <span>{userInfo?.name || 'Helper'}</span>.
                    </h1>
                    <p>Your command center for requests, AI insights, helper momentum, and live community activity.</p>
                </div>
            </section>

            <section className="mini-grid section">
                <div className="stat-card">
                    <p className="eyebrow">Trust score</p>
                    <div className="stat-value">{stats.trustScore}%</div>
                    <p>Driven by solved requests and consistent support.</p>
                </div>
                <div className="stat-card">
                    <p className="eyebrow">Helping</p>
                    <div className="stat-value">{stats.helping}</div>
                    <p>Requests where you are currently listed as a helper.</p>
                </div>
                <div className="stat-card">
                    <p className="eyebrow">Open requests</p>
                    <div className="stat-value">{stats.openRequests}</div>
                    <p>Community requests currently active across the feed.</p>
                </div>
                <div className="stat-card">
                    <p className="eyebrow">AI pulse</p>
                    <div className="stat-value">{stats.aiInsights}</div>
                    <p>Trend count detected in the latest request activity.</p>
                </div>
            </section>

            <section className="dashboard-grid section">
                {/* Main Feed Column */}
                <div className="stack">
                    <div className="section-head">
                        <div>
                            <p className="section-kicker">Recent requests</p>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '8px' }}>What the community needs right now</h2>
                        </div>
                        <Link to="/explore" className="btn btn-secondary">Go to feed</Link>
                    </div>
                    
                    <div className="stack">
                        {loading ? (
                            <div className="panel center">Loading requests...</div>
                        ) : requests.length === 0 ? (
                            <div className="panel center">No active community requests.</div>
                        ) : requests.map(req => (
                            <div key={req._id} className="request-card list-item stack" style={{ alignItems: 'flex-start' }}>
                                <div style={{ width: '100%' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => window.location.href=`/requests/${req._id}`}>{req.title}</h4>
                                    <div className="tag-row" style={{ marginTop: '8px' }}>
                                        <span className={`tag ${req.urgency === 'High' ? 'urgent' : ''}`}>
                                            {req.urgency} Urgency
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p style={{ marginTop: '12px' }}>{req.description}</p>
                                </div>
                                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <div className="user-line">
                                        <span className="avatar teal" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                                            {req.user?.name?.charAt(0) || 'U'}
                                        </span>
                                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{req.user?.name || 'Unknown'}</span>
                                    </div>
                                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>&rarr;</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="stack">
                    <div className="panel">
                        <p className="section-kicker">AI insights</p>
                        <h3 style={{ fontSize: '1.3rem', margin: '8px 0 16px' }}>Suggested actions for you</h3>
                        <div className="stack">
                            <div className="glass-card" style={{ padding: '16px' }}>
                                <strong>Match Found</strong>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>We noticed 2 new requests in "Technical". Should we notify you instantly next time?</p>
                            </div>
                            <div className="glass-card" style={{ padding: '16px' }}>
                                <strong>Trust Boost Available</strong>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Solve one more request this week to earn the Early Adopter badge.</p>
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <p className="section-kicker">Top Members</p>
                        <h3 style={{ fontSize: '1.3rem', margin: '8px 0 16px' }}>Contributors Leaders</h3>
                        <div className="stack">
                            {leaderboard.length === 0 ? (
                                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>No top contributors yet.</p>
                            ) : leaderboard.map((user, index) => (
                                <div key={user._id} className="helper-item">
                                    <span className={`avatar ${index === 0 ? '' : index === 1 ? 'dark' : 'teal'}`}>{index + 1}</span>
                                    <div style={{ flex: 1 }}>
                                        <strong>{user.name}</strong>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{user.contributions || 0} helps | {user.trustScore} trust</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="panel">
                        <p className="section-kicker">Notifications</p>
                        <h3 style={{ fontSize: '1.3rem', margin: '8px 0 16px' }}>Latest updates</h3>
                        <div className="notif-list stack">
                            {notifications.length === 0 ? (
                                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>No recent notifications.</p>
                            ) : notifications.map(n => (
                                <div key={n._id} className="notif-item">
                                    <span className="orb" style={{ position: 'static', width: '8px', height: '8px', background: n.read ? 'var(--muted)' : 'var(--primary)' }}></span>
                                    <div style={{ flex: 1, fontSize: '0.9rem' }}>
                                        {n.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
