import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy fade-in">
            <p className="eyebrow">SMIT Grand Coding Night 2026</p>
            <h1>Find help faster. Become help that matters.</h1>
            <p>HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/dashboard">Open product demo</Link>
              <Link className="btn btn-secondary" to="/create">Post a request</Link>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <p className="eyebrow">Members</p>
                <div className="stat-value">124</div>
                <p>Students, mentors, and helpers in the loop.</p>
              </div>
              <div className="stat-card">
                <p className="eyebrow">Requests</p>
                <div className="stat-value">48</div>
                <p>Support posts shared across learning journeys.</p>
              </div>
              <div className="stat-card">
                <p className="eyebrow">Solved</p>
                <div className="stat-value">29</div>
                <p>Problems resolved through fast community action.</p>
              </div>
            </div>
          </div>
          <div className="hero-panel fade-in">
            <span className="orb"></span>
            <p className="eyebrow">Live product feel</p>
            <h2>More than a form. More like an ecosystem.</h2>
            <p>A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum.</p>
            <div className="stack">
              <div className="feature-card" style={{ color: 'black' }}>
                <h3>AI request intelligence</h3>
                <p style={{ color: 'black' }}>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
              </div>
              <div className="feature-card" style={{ color: 'black' }}>
                <h3>Community trust graph</h3>
                <p style={{ color: 'black' }}>Badges, helper rankings, trust score boosts, and visible contribution history.</p>
              </div>
              <div className="feature-card" style={{ color: 'black' }}>
                <h3>Top Trust Score: 98%</h3>
                <p style={{ color: 'black' }}>Top trust score currently active across the sample mentor network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div>
          <div className="section-head">
            <div>
              <p className="section-kicker">Core flow</p>
              <h2>From struggling alone to solving together</h2>
            </div>
            <Link className="btn btn-secondary" to="/onboarding">Try onboarding AI</Link>
          </div>
          <div className="card-grid">
            <article className="feature-card fade-in">
              <h3>Ask for help clearly</h3>
              <p>Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
            </article>
            <article className="feature-card fade-in">
              <h3>Discover the right people</h3>
              <p>Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
            </article>
            <article className="feature-card fade-in">
              <h3>Track real contribution</h3>
              <p>Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
