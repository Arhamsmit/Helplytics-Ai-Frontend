import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Attempt to safely retrieve user from localStorage
    let userInfo = null;
    try {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            userInfo = JSON.parse(stored);
        }
    } catch (e) {
        console.warn("Failed to parse userInfo from localStorage", e);
    }

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    return (
        <header className="topbar fade-in">
            <div className="container nav">
                <Link className='brand' to={userInfo ? '/dashboard' : '/'}>
                    <span className="brand-badge">H</span>
                    <span>HelpHub AI</span>
                </Link>
                
                {userInfo ? (
                    <>
                        <nav className="nav-links">
                            <Link data-nav={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>
                            <Link data-nav={location.pathname === '/explore' ? 'active' : ''} to="/explore">Explore</Link>
                            <Link data-nav={location.pathname === '/messages' ? 'active' : ''} to="/messages">Messages</Link>
                            <Link data-nav={location.pathname === '/leaderboard' ? 'active' : ''} to="/leaderboard">Leaderboard</Link>
                        </nav>
                        <div className="nav-actions">
                            <Link className="pill" to="/notifications">Notifications</Link>
                            <Link className="btn btn-primary" to="/create-request">Create Request</Link>
                            <button onClick={logoutHandler} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <nav className="nav-links">
                            <Link data-nav={location.pathname === '/' ? 'active' : ''} to="/">Home</Link>
                            <Link data-nav={location.pathname === '/explore' ? 'active' : ''} to="/explore">Explore</Link>
                            <Link data-nav={location.pathname === '/leaderboard' ? 'active' : ''} to="/leaderboard">Leaderboard</Link>
                            <Link data-nav={location.pathname === '/ai-center' ? 'active' : ''} to="/ai-center">AI Center</Link>
                        </nav>
                        <div className="nav-actions">
                            <Link className="pill" to="/notifications">Live community signals</Link>
                            <Link className="btn btn-primary" to="/auth">Join the platform</Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
