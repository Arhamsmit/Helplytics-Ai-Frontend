import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  Shield, 
  MessageSquare, 
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Share2,
  Flag
} from 'lucide-react';

const RequestDetailPage = () => {
    const { id } = useParams();

    // Mock data for a detailed request
    const request = {
        id: id,
        title: "React Auth Debugging needed",
        description: `I'm building a community platform and having issues with JWT cookie persistence in my Vite + Express application. 
        The cookies are being set in the browser but are not being sent back with subsequent requests to the API. 
        I've tried setting credentials to true and configuring CORS, but it's still not working as expected. 
        Looking for someone who has experience with cross-domain cookie handling and MERN stack security.`,
        user: { 
            name: "DevDan", 
            trustScore: 85, 
            contributions: 21,
            badges: ["💻", "🚀"] 
        },
        category: "Technical",
        urgency: "High",
        status: "Open",
        time: "Published 2 hours ago",
        location: "Remote / Online",
        tags: ["React", "JWT", "NodeJS", "Security", "Cookies"],
        aiInsights: {
            summary: "User needs help debugging cross-domain JWT cookie persistence in a Vite/Express stack.",
            autoTags: ["Authentication", "CORS", "Web Security"],
            urgencyDetected: "High (Critical auth issue)"
        },
        responses: [
            { user: "Sarah Connor", message: "I can help with this! I encountered the exact same issue last week with Vite's proxy settings.", time: "1h ago" }
        ]
    };

    return (
        <div className="fade-in" style={{ maxWidth: '900px' }}>
            <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                <ArrowLeft size={16} /> Back to Feed
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <main>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '4px' }}>{request.urgency} URGENCY</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--bg-deep)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>{request.category}</span>
                        </div>
                        <h1 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{request.title}</h1>
                        
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-main)', paddingBottom: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {request.time}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16} /> {request.location}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={16} color="var(--primary)" /> {request.status}</span>
                        </div>

                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-main)', whiteSpace: 'pre-line', marginBottom: '2rem' }}>
                            {request.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                            {request.tags.map(tag => (
                                <span key={tag} style={{ background: 'var(--bg-hover)', padding: '4px 12px', borderRadius: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>#{tag}</span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>I Can Help With This</button>
                            <button className="btn btn-secondary" style={{ padding: '1rem' }}><Share2 size={20} /></button>
                        </div>
                    </div>

                    <section>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Community Responses ({request.responses.length})</h3>
                        {request.responses.map((res, i) => (
                            <div key={i} className="card" style={{ marginBottom: '1rem', background: 'var(--bg-deep)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-hover)' }}></div>
                                        <span style={{ fontWeight: 600 }}>{res.user}</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{res.time}</span>
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{res.message}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                    <button style={{ background: 'none', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Accept Help</button>
                                    <button style={{ background: 'none', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Reply</button>
                                </div>
                            </div>
                        ))}
                    </section>
                </main>

                <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Requester Profile</h4>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-hover)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={40} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{request.user.name}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {request.user.badges.map(b => <span key={b}>{b}</span>)}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-main)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Trust Score</span>
                                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>★ {request.user.trustScore}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Helps Provided</span>
                                <span>{request.user.contributions}</span>
                            </div>
                        </div>
                        <Link to={`/profile`} className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.85rem' }}>View Full Profile</Link>
                    </div>

                    <div className="card" style={{ background: 'var(--bg-deep)', border: '1px dashed var(--border-main)' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={16} color="var(--accent)" /> AI Context
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                            <p><strong>Detected Urgency:</strong> {request.aiInsights.urgencyDetected}</p>
                            <div>
                                <p style={{ marginBottom: '0.4rem' }}><strong>Suggested Tags:</strong></p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {request.aiInsights.autoTags.map(tag => (
                                        <span key={tag} style={{ background: 'var(--bg-hover)', padding: '2px 8px', borderRadius: '4px' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button style={{ background: 'none', color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Flag size={14} /> Report Request
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default RequestDetailPage;
