import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const CreateRequestPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [aiInsights, setAiInsights] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSimulateAI = () => {
        if (!title || !description) return;
        setIsProcessing(true);
        
        // Simulating the analysis wait
        setTimeout(() => {
            setAiInsights({
                category: "Technical",
                urgency: "High",
                tags: ["React", "Debugging", "Code"],
                summary: "AI analysis of your request indicates technical debugging support needed quickly."
            });
            setIsProcessing(false);
        }, 1200);
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!title || !description) return;

        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                '/api/requests',
                { title, description, location },
                config
            );

            navigate(`/dashboard`);
        } catch (error) {
            console.error('Request creation failed', error);
            alert('Failed to publish request. Please ensure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section page-hero fade-in" style={{ padding: '60px 0' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="section-head">
                    <div>
                        <p className="section-kicker">New Request</p>
                        <h1 style={{ fontSize: '2.5rem' }}>Ask for Help</h1>
                        <p>Tell the community what you need help with. Our AI will help categorize it.</p>
                    </div>
                </div>

                <div className="admin-grid">
                    <div className="form-card stack">
                        <div className="field">
                            <label>Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Need help with React state management" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea 
                                placeholder="Describe your problem in detail... What have you tried so far?" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Location (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Remote, New York, etc." 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        
                        <div className="row" style={{ marginTop: '16px' }}>
                            <button type="button" onClick={handleSimulateAI} className="btn btn-secondary" disabled={isProcessing}>
                                {isProcessing ? 'Analyzing...' : 'Simulate AI Insights'}
                            </button>
                            <button type="button" onClick={handlePublish} className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                {loading ? 'Publishing...' : 'Publish Request'}
                            </button>
                        </div>
                    </div>

                    <div className="stack">
                        <div className="panel">
                            <p className="section-kicker">AI Engine</p>
                            <h3>AI Insights</h3>
                            {!aiInsights ? (
                                <div className="center" style={{ padding: '30px', color: 'var(--muted)' }}>
                                    <p style={{ fontSize: '0.85rem' }}>Fill in the title and description and click 'Simulate' to preview AI categorization and tagging.</p>
                                </div>
                            ) : (
                                <div className="stack fade-in" style={{ marginTop: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Detected Category</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{aiInsights.category}</div>
                                    </div>
                                    <div className="row" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Urgency</div>
                                        <div className="pill" style={{ color: aiInsights.urgency === 'High' ? 'var(--danger)' : 'var(--text)', border: 'none', background: 'var(--surface-strong)' }}>
                                            {aiInsights.urgency}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Tags</div>
                                        <div className="tag-row" style={{ marginTop: '8px' }}>
                                            {aiInsights.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                                        </div>
                                    </div>
                                    <div className="glass-card" style={{ padding: '16px' }}>
                                        <strong>Summary</strong>
                                        <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>{aiInsights.summary}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="panel">
                            <h4 style={{ marginBottom: '8px' }}>Tips for a good request</h4>
                            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                                <li>Be specific about what you need.</li>
                                <li>Include relevant technologies or skills.</li>
                                <li>Mention if it's okay to do it remotely.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateRequestPage;
