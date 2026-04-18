import React, { useState, useEffect } from 'react';
import axios from '../axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) return;

                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('/api/users/profile', config);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="section page-hero center"><p>Loading profile...</p></div>;
    }

    if (!user) {
        return <div className="section page-hero center"><p>User not found. Please log in.</p></div>;
    }

    return (
        <section className="section page-hero fade-in">
            <div className="profile-grid">
                
                {/* Main Profile Area */}
                <div className="stack">
                    <div className="panel">
                        <div className="row" style={{ alignItems: 'flex-end', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--line)' }}>
                            <div className="avatar dark" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{user.name}</h1>
                                <div className="row" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                    <span className="pill">{user.role || 'Member'}</span>
                                    <span>📍 {user.location || 'Unknown Location'}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                {user.bio || "This user hasn't added a bio yet. They are here to participate in the community."}
                            </p>
                        </div>
                    </div>

                    <div className="panel">
                        <h3 style={{ marginBottom: '16px' }}>Skills & Expertise</h3>
                        <div className="tag-row">
                            {user.skills?.length > 0 ? (
                                user.skills.map(skill => <span key={skill} className="tag">{skill}</span>)
                            ) : (
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No skills listed.</p>
                            )}
                        </div>
                    </div>

                    <div className="panel">
                        <h3 style={{ marginBottom: '16px' }}>Badges</h3>
                        <div className="tag-row">
                            {user.badges?.length > 0 ? (
                                user.badges.map((badge, index) => (
                                    <div key={index} className="glass-card center" style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                                        <strong style={{ fontSize: '0.85rem' }}>{badge.name}</strong>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No badges earned yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="stack">
                    <div className="panel center stack">
                        <div>
                            <p className="eyebrow">Trust Score</p>
                            <div className="stat-value" style={{ fontSize: '3.5rem', color: 'var(--primary)' }}>{user.trustScore || 0}%</div>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: 'var(--line)' }}></div>
                        <div>
                            <p className="eyebrow">Helps Provided</p>
                            <div className="stat-value">{user.contributions || 0}</div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="row" style={{ justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3>Recent Contributions</h3>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View History</button>
                        </div>
                        <div className="stack">
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>History feature coming soon.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProfilePage;
