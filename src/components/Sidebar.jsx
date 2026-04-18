import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  MessageSquare, 
  Trophy, 
  Flame,
  User,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/create', icon: <PlusCircle size={20} />, label: 'Ask for Help' },
    { to: '/explore', icon: <Flame size={20} />, label: 'Feed' },
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
    { to: '/ai-center', icon: <BrainIcon size={20} />, label: 'AI Center' },
  ];

  return (
    <aside style={{
      width: '240px',
      position: 'fixed',
      top: '64px',
      bottom: 0,
      left: 0,
      background: 'var(--bg-deep)',
      borderRight: '1px solid var(--border-main)',
      padding: '1.5rem 0.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      zIndex: 900
    }}>
      {links.map((link) => (
        <NavLink 
          key={link.to} 
          to={link.to} 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'var(--transition)'
          }}
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-main)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <NavLink to="/profile" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', color: 'var(--text-muted)' }}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', color: 'var(--text-muted)' }}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>

      <style>{`
        .sidebar-link:hover {
          background: var(--bg-hover);
          color: var(--text-heading) !important;
        }
        .sidebar-link.active {
          background: var(--primary-glow);
          color: var(--primary) !important;
        }
      `}</style>
    </aside>
  );
};

const BrainIcon = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2M12 5v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5"/><path d="M4 11V9a2 2 0 0 1 2-2h2"/><path d="M20 11V9a2 2 0 0 0-2-2h-2"/><path d="M12 11V9a2 2 0 0 1 2-2h2"/><path d="M12 11v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4"/><path d="M16 17v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2" />
  </svg>
);

export default Sidebar;
