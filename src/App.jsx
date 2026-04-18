import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ExplorePage from './pages/ExplorePage';
import CreateRequestPage from './pages/CreateRequestPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import OnboardingPage from './pages/OnboardingPage';
import RequestDetailPage from './pages/RequestDetailPage';
import MessagingPage from './pages/MessagingPage';
import AICenterPage from './pages/AICenterPage';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout user={user} onLogout={handleLogout}>
            <LandingPage />
          </Layout>
        } />
        
        <Route path="/auth" element={
          <Layout user={user} onLogout={handleLogout}>
            <AuthPage />
          </Layout>
        } />

        {/* Protected Routes */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <OnboardingPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/explore" element={
          <Layout user={user} onLogout={handleLogout}>
            <ExplorePage />
          </Layout>
        } />

        <Route path="/create-request" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <CreateRequestPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/requests/:id" element={
          <Layout user={user} onLogout={handleLogout}>
            <RequestDetailPage />
          </Layout>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/leaderboard" element={
          <Layout user={user} onLogout={handleLogout}>
            <LeaderboardPage />
          </Layout>
        } />

        <Route path="/ai-center" element={
          <Layout user={user} onLogout={handleLogout}>
            <AICenterPage />
          </Layout>
        } />

        <Route path="/messages" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <MessagingPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
