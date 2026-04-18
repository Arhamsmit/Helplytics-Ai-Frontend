import React, { useState, useEffect } from 'react';
import axios from '../axios';

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const { data } = await axios.get('/api/leaderboard');
                setLeaders(data);
            } catch (error) {
                console.error('Fetching leaderboard failed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    // Helper for generating initials
    const getInitials = (name = "U") => {
        return name.split(" ").map(part => part[0]).join("").substring(0, 2).toUpperCase();
    };

    return (
        <div className="fade-in">
            <section className="page-hero">
                <div className="panel">
                    <p className="eyebrow">Leaderboard</p>
                    <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>Recognize the people who keep the community moving.</h1>
                    <p>Trust score, contribution count, and badges create visible momentum for reliable helpers.</p>
                </div>
            </section>
            
            <section className="leader-grid section">
                <div className="panel stack">
                    <div>
                        <p className="section-kicker">Top Helpers</p>
                        <h2>Rankings</h2>
                    </div>
                    <div className="rank-list" style={{ marginTop: '16px' }}>
                        {loading ? (
                            <div className="center muted">Loading rankings...</div>
                        ) : leaders.length === 0 ? (
                            <div className="center muted">No contributors yet.</div>
                        ) : leaders.map((user, index) => (
                            <div key={user._id} className="rank-item fade-in">
                                <div className="user-line">
                                    <div className={`avatar ${index === 0 ? 'teal' : index === 1 ? 'dark' : ''}`}>
                                        {getInitials(user.name)}
                                    </div>
                                    <div>
                                        <strong>#{index + 1} {user.name}</strong>
                                        <p>{user.skills?.slice(0, 3).join(', ') || 'Community Helper'}</p>
                                    </div>
                                </div>
                                <div className="center">
                                    <strong>{user.trustScore}%</strong>
                                    <p>{user.contributions || 0} contributions</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel stack">
                    <div>
                        <p className="section-kicker">Badge System</p>
                        <h2>Trust and achievement</h2>
                    </div>
                    <div className="stack" style={{ marginTop: '16px' }}>
                        {loading ? null : leaders.slice(0, 3).map((user) => (
                            <div key={user._id} className="badge-card fade-in">
                                <h3>{user.name}</h3>
                                <p>{user.badges && user.badges.length > 0 ? user.badges.join(' • ') : "HelpHub Contributor"}</p>
                                <div className="progress" style={{ marginTop: '14px' }}>
                                    <span style={{ width: `${user.trustScore}%` }}></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LeaderboardPage;
