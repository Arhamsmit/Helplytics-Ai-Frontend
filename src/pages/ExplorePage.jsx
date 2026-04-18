import React, { useState, useEffect } from 'react';
import axios from '../axios';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ['Technical', 'Web Development', 'Design', 'Career', 'Academics', 'Content', 'Community'];
  const urgencies = ['Critical', 'High', 'Medium', 'Low'];
  
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const categoryParam = activeTab === 'All' ? '' : `?category=${activeTab}`;
        const { data } = await axios.get(`/api/requests${categoryParam}`);
        setRequests(data);
      } catch (error) {
        console.error('Fetching requests failed', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [activeTab]);

  return (
    <div className="fade-in">
        <section className="page-hero">
            <div className="panel">
                <p className="eyebrow">Explore / Feed</p>
                <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>Browse help requests with filterable community context.</h1>
                <p>Filter by category, urgency, skills, and location to surface the best matches.</p>
            </div>
        </section>
        
        <section className="feed-grid section">
            <form className="panel stack" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <p className="section-kicker">Filters</p>
                    <h2>Refine the feed</h2>
                </div>
                <div className="field">
                    <label>Category</label>
                    <select name="category" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                        <option value="All">All categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="field">
                    <label>Urgency</label>
                    <select name="urgency">
                        <option value="">All urgency levels</option>
                        {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="field">
                    <label>Skills</label>
                    <input name="skill" type="text" placeholder="React, Figma, Git/GitHub" />
                </div>
                <div className="field">
                    <label>Location</label>
                    <input name="location" type="text" placeholder="Karachi, Lahore, Remote" />
                </div>
            </form>

            <div className="stack">
                {loading ? (
                    <div className="panel center">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="panel center">
                        <h3>No requests found</h3>
                        <p>Try broadening the filters to surface more matches.</p>
                    </div>
                ) : requests.map(request => (
                    <article key={request._id} className="request-card fade-in">
                        <div className="card-meta">
                            <span className="tag">{request.category}</span>
                            <span className={`tag ${["Critical", "High"].includes(request.urgency) ? "urgent" : ""}`}>{request.urgency}</span>
                            <span className={`tag ${request.status === "Solved" ? "success" : ""}`}>{request.status}</span>
                        </div>
                        <h3>{request.title}</h3>
                        <p>{request.description}</p>
                        <div className="tag-row">
                            {request.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>
                        <div className="list-item" style={{ paddingBottom: 0, borderBottom: 0 }}>
                            <div>
                                <strong>{request.user?.name || "Unknown user"}</strong>
                                <p>{request.location} • {request.responders?.length || 0} helpers interested</p>
                            </div>
                            <a className="btn btn-secondary" href={`/requests/${request._id}`}>Open details</a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    </div>
  );
};

export default ExplorePage;
