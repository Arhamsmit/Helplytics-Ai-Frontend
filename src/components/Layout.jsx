import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="site-shell">
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="container">
        {children}
      </main>

      <footer className="footer">
        <div className="container center">
          HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
