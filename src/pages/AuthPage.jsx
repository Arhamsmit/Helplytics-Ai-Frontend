import React, { useState } from 'react';
import axios from '../axios';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const endpoint = isLogin ? '/api/users/login' : '/api/users';
            const payload = isLogin ? { email, password } : { name, email, password };
            
            const { data } = await axios.post(`${endpoint}`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            
            // Redirect based on onboarding status
            if (!data.onboardingComplete) {
                window.location.href = '/onboarding';
            } else {
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Auth logic failed:', error);
            setErrorMsg(error.response?.data?.message || 'Authentication failed. Make sure your local server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-layout fade-in">
            <div className="auth-wrap">
                
                <div className="auth-side">
                    <span className="orb"></span>
                    <h2 style={{ fontSize: '2.4rem', color: 'white', marginBottom: '20px' }}>Join the community</h2>
                    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="avatar">🚀</span>
                            <span>Get unstuck on complex logic or bugs.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="avatar teal">💡</span>
                            <span>Mentor others and build your community trust score.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="avatar dark">🏆</span>
                            <span>Rise up the leaderboard with meaningful contributions.</span>
                        </li>
                    </ul>
                </div>

                <div className="auth-card">
                    <h2 style={{ marginBottom: '8px' }}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
                    <p style={{ marginBottom: '24px' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <span 
                            onClick={() => setIsLogin(!isLogin)} 
                            style={{ color: 'var(--primary-strong)', cursor: 'pointer', fontWeight: 600 }}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </span>
                    </p>

                    {errorMsg && (
                        <div style={{ padding: '12px', background: 'var(--danger)', color: 'white', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="stack">
                        {!isLogin && (
                            <div className="field">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                        )}
                        <div className="field">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="you@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '12px' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;
