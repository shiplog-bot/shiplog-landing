'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#0a0a0a', color: '#f0f0f0', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px 60px' }}>
        <div style={{ display: 'inline-block', background: '#1a1a2e', border: '1px solid #333', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#7c8cf8', marginBottom: '32px' }}>
          ✦ Early Access — Limited Spots
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
          Your release notes,<br />
          <span style={{ background: 'linear-gradient(135deg, #7c8cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>written by AI.</span>
        </h1>

        <p style={{ fontSize: '20px', color: '#a0a0a0', lineHeight: '1.6', marginBottom: '16px', maxWidth: '580px' }}>
          ShipLog connects to your GitHub repo and turns raw commits &amp; PRs into polished, customer-ready release notes — in seconds.
        </p>

        <p style={{ fontSize: '16px', color: '#666', marginBottom: '48px', fontStyle: 'italic' }}>
          "Writing release notes is a chore that stands between developers and their weekend."
        </p>

        {status === 'success' ? (
          <div style={{ background: '#0d2818', border: '1px solid #1a5c35', borderRadius: '12px', padding: '24px 32px', display: 'inline-block' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎉</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#4ade80' }}>You&apos;re on the list!</div>
            <div style={{ color: '#a0a0a0', marginTop: '8px' }}>We&apos;ll email you when ShipLog launches. You&apos;ll get 3 months free as an early backer.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '520px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ flex: '1', minWidth: '160px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '14px 16px', color: '#f0f0f0', fontSize: '15px', outline: 'none' }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ flex: '2', minWidth: '200px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '14px 16px', color: '#f0f0f0', fontSize: '15px', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ background: 'linear-gradient(135deg, #7c8cf8, #a78bfa)', border: 'none', borderRadius: '8px', padding: '14px 28px', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {status === 'loading' ? 'Joining...' : 'Get Early Access →'}
            </button>
            {status === 'error' && <p style={{ color: '#f87171', fontSize: '14px', width: '100%', margin: '4px 0 0' }}>Something went wrong. Try again.</p>}
          </form>
        )}

        <p style={{ marginTop: '16px', fontSize: '13px', color: '#555' }}>
          No spam. Unsubscribe anytime. Early backers get 3 months free.
        </p>
      </section>

      {/* Pain points */}
      <section style={{ background: '#111', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '60px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center', color: '#e0e0e0' }}>
            Sound familiar?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: '😩', text: '"Context switching from building to documenting is brutal."' },
              { icon: '📭', text: '"Release notes become an afterthought — if they happen at all."' },
              { icon: '⏳', text: '"Too tedious to sustain when shipping daily."' },
              { icon: '🤯', text: '"Translating commits into user-friendly language takes time I don\'t have."' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <p style={{ color: '#a0a0a0', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          How ShipLog works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          {[
            { step: '1', title: 'Connect GitHub', desc: 'One OAuth click. ShipLog reads your commits and merged PRs.' },
            { step: '2', title: 'Pick your tone', desc: 'Developer-facing, user-friendly, or executive summary — you choose.' },
            { step: '3', title: 'Ship it', desc: 'One-click publish to your changelog page, or copy to paste anywhere.' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c8cf8, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#a0a0a0', fontSize: '15px', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor comparison */}
      <section style={{ background: '#111', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '60px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            ShipLog vs. the alternatives
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Other tools make you write manually. ShipLog writes for you.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['', 'ShipLog', 'Beamer', 'Headway', 'AnnounceKit'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', textAlign: i === 0 ? 'left' : 'center', color: i === 1 ? '#7c8cf8' : '#a0a0a0', fontWeight: i === 1 ? '700' : '400' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI auto-generates from commits', '✅', '❌', '❌', '❌'],
                  ['GitHub native', '✅', '❌', '❌', '❌'],
                  ['Multiple tones (dev/user/exec)', '✅', '❌', '❌', '❌'],
                  ['Indie-hacker pricing', '$19/mo', '$29/mo', '$29/mo', '$79/mo'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '14px 16px', textAlign: j === 0 ? 'left' : 'center', color: j === 1 ? '#e0e0e0' : (j === 0 ? '#c0c0c0' : '#666') }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
          Stop skipping release notes.
        </h2>
        <p style={{ fontSize: '18px', color: '#a0a0a0', marginBottom: '40px' }}>
          Join indie hackers and small teams who want to ship faster — and communicate it better.
        </p>
        {status === 'success' ? (
          <div style={{ color: '#4ade80', fontSize: '18px', fontWeight: '600' }}>✅ You&apos;re already on the list!</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '14px 20px', color: '#f0f0f0', fontSize: '16px', width: '280px', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ background: 'linear-gradient(135deg, #7c8cf8, #a78bfa)', border: 'none', borderRadius: '8px', padding: '14px 28px', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}
            >
              {status === 'loading' ? 'Joining...' : 'Get Early Access →'}
            </button>
          </form>
        )}
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#555' }}>
          🔒 No spam. Early backers get 3 months free at launch.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '24px', textAlign: 'center', color: '#444', fontSize: '13px' }}>
        © 2025 ShipLog · Built by an indie hacker, for indie hackers
      </footer>
    </main>
  );
}
