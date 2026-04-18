import React, { useState } from 'react';
import axios from '../axios';

const OnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('');
    const [skills, setSkills] = useState([]);
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Extracted categories from the reference site
    const categories = ['Technical', 'Academic', 'Creative', 'Personal', 'Professional', 'Household'];

    const handleToggleSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const handleFinish = async () => {
        setLoading(true);
        try {
            const storedData = localStorage.getItem('userInfo');
            if (!storedData) {
                throw new Error('User session not found.');
            }

            const userInfo = JSON.parse(storedData);
            if (!userInfo || !userInfo.token) {
                throw new Error('Session token is missing.');
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                '/api/users/profile',
                { role, skills, location, bio, onboardingComplete: true },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Onboarding failed', error);
            alert('Failed to save profile. Please ensure the backend server is running and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section page-hero fade-in" style={{ padding: '60px 0' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="form-card stack" style={{ padding: '40px' }}>
                    
                    {/* Progress Indication */}
                    <div className="row" style={{ justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="avatar dark" style={{ width: '28px', height: '28px', fontSize: '12px', opacity: step >= 1 ? 1 : 0.5 }}>1</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: step >= 1 ? 'var(--text)' : 'var(--muted)' }}>Role</span>
                        </div>
                        <div style={{ width: '40px', height: '2px', background: 'var(--line)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="avatar dark" style={{ width: '28px', height: '28px', fontSize: '12px', opacity: step >= 2 ? 1 : 0.5, background: step >= 2 ? '' : 'var(--muted)' }}>2</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: step >= 2 ? 'var(--text)' : 'var(--muted)' }}>Skills</span>
                        </div>
                        <div style={{ width: '40px', height: '2px', background: 'var(--line)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="avatar dark" style={{ width: '28px', height: '28px', fontSize: '12px', opacity: step >= 3 ? 1 : 0.5, background: step >= 3 ? '' : 'var(--muted)' }}>3</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: step >= 3 ? 'var(--text)' : 'var(--muted)' }}>Details</span>
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="fade-in stack">
                            <h2>How do you want to participate?</h2>
                            <p>You can change this later in your settings.</p>
                            
                            <div className="stack" style={{ marginTop: '20px' }}>
                                {['Need Help', 'Can Help', 'Both'].map(r => (
                                    <div 
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className="feature-card"
                                        style={{ 
                                            cursor: 'pointer', 
                                            padding: '20px',
                                            border: role === r ? '2px solid var(--primary)' : '1px solid var(--line)',
                                            background: role === r ? 'rgba(15, 118, 110, 0.05)' : 'var(--surface)'
                                        }}
                                    >
                                        <h4 style={{ color: role === r ? 'var(--primary)' : 'var(--text)' }}>{r}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                            {r === 'Need Help' && 'I am looking for community support and expert advice.'}
                                            {r === 'Can Help' && 'I have skills to share and want to help others.'}
                                            {r === 'Both' && 'I want to both offer my skills and receive help when needed.'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="fade-in stack">
                            <h2>What are your areas of expertise?</h2>
                            <p>Select categories to ensure AI matches you with the right opportunities.</p>
                            
                            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                                {categories.map(cat => (
                                    <label key={cat} className="feature-card row" style={{ padding: '16px', cursor: 'pointer', border: '1px solid var(--line)' }}>
                                        <input 
                                            type="checkbox" 
                                            checked={skills.includes(cat)}
                                            onChange={() => handleToggleSkill(cat)}
                                            style={{ width: 'auto', marginBottom: 0 }}
                                        />
                                        <span style={{ fontWeight: 600 }}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="fade-in stack">
                            <h2>Almost there!</h2>
                            <p>Add a few more details to help the community know you.</p>
                            
                            <div className="stack" style={{ marginTop: '20px' }}>
                                <div className="field">
                                    <label>Location (City, Country)</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. New York, USA" 
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Short Bio</label>
                                    <textarea 
                                        placeholder="I am a frontend developer helping out..." 
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row" style={{ marginTop: '40px', justifyContent: 'space-between' }}>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => setStep(s => s - 1)}
                            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                        >
                            Back
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={() => step < 3 ? setStep(s => s + 1) : handleFinish()}
                            disabled={(step === 1 && !role) || loading}
                        >
                            {loading ? 'Saving...' : (step === 3 ? 'Finish Setup' : 'Continue')}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OnboardingPage;
