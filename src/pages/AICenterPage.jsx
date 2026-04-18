import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AICenterPage = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await axios.get('http://localhost:5000/api/requests');
        const userRes = await axios.get('http://localhost:5000/api/leaderboard');
        setRequests(reqRes.data);
        setUsers(userRes.data);
      } catch (error) {
        console.error('Fetching AI data failed', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTopCategory = () => {
    if (!requests.length) return "Community";
    const counts = requests.reduce((acc, req) => {
      acc[req.category] = (acc[req.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Community";
  };

  const getUrgencyCount = () => {
    return requests.filter(req => ['High', 'Critical'].includes(req.urgency)).length;
  };

  const getMentorPoolCount = () => {
    return users.filter(u => u.trustScore >= 85).length;
  };

  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="panel">
          <p className="eyebrow">AI Center</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>See what the platform intelligence is noticing.</h1>
          <p>AI algorithms summarize current trends, helper readiness, urgency signals, and request recommendations.</p>
        </div>
      </section>

      <section className="section">
        {loading ? (
          <div className="center muted">Loading latest intelligence...</div>
        ) : (
          <div className="stack" style={{ gap: '24px' }}>
            {/* Top Stat Cards */}
            <div className="card-grid">
              <div className="stat-card fade-in">
                <p className="eyebrow">Trend pulse</p>
                <div className="stat-value">{getTopCategory()}</div>
                <p>Most common support area based on active community requests.</p>
              </div>
              <div className="stat-card fade-in">
                <p className="eyebrow">Urgency watch</p>
                <div className="stat-value">{getUrgencyCount()}</div>
                <p>Requests currently flagged high priority by the urgency detector.</p>
              </div>
              <div className="stat-card fade-in">
                <p className="eyebrow">Mentor pool</p>
                <div className="stat-value">{getMentorPoolCount()}</div>
                <p>Trusted helpers with strong response history and contribution signals.</p>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="panel stack fade-in">
              <div>
                <p className="section-kicker">AI Recommendations</p>
                <h2>Requests needing attention</h2>
              </div>
              <div className="stack" style={{ marginTop: '8px' }}>
                {requests.length === 0 ? (
                  <p className="muted">No requests generating signals at the moment.</p>
                ) : (
                  requests.slice(0, 4).map(req => (
                    <div key={req._id} className="timeline-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <strong style={{ fontSize: '1.05rem', marginBottom: '8px', display: 'block' }}>{req.title}</strong>
                      <p style={{ margin: '0 0 16px 0' }}>
                        {`AI summary: ${req.category} request with ${req.urgency?.toLowerCase() || 'low'} urgency. Best suited for members with ${req.tags && req.tags.length ? req.tags.join(', ') : 'relevant'} expertise.`}
                      </p>
                      <div className="tag-row">
                        <span className="tag">{req.category}</span>
                        <span className={`tag ${['Critical', 'High'].includes(req.urgency) ? 'urgent' : ''}`}>{req.urgency}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
          </div>
        )}
      </section>
    </div>
  );
};

export default AICenterPage;
