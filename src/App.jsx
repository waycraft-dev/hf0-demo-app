import { useMemo, useState } from 'react';
import { launches as initialLaunches } from './data.js';

const ALL = 'All';

const formatVerified = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function App() {
  const [launches, setLaunches] = useState(initialLaunches);
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(initialLaunches.map((launch) => launch.category))], []);
  const shown = launches
    .filter((launch) => category === ALL || launch.category === category)
    .sort((a, b) => b.votes - a.votes);

  const upvote = (id) =>
    setLaunches((current) => current.map((launch) => (launch.id === id ? { ...launch, votes: launch.votes + 1 } : launch)));

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">This week</p>
        <h1>Launch Board</h1>
        <p className="lede">New things people are shipping. Upvote the ones you would use.</p>
      </header>

      <nav className="filters" aria-label="Categories">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            className={name === category ? 'chip chip-on' : 'chip'}
            aria-pressed={name === category}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </nav>

      <ol className="list">
        {shown.map((launch, index) => (
          <li key={launch.id} className="card">
            <span className="rank">{index + 1}</span>
            <div className="body">
              <h2>{launch.name}</h2>
              <p>{launch.tagline}</p>
              <div className="meta">
                <span className="tag">{launch.category}</span>
                <span className="verified">
                  <span aria-hidden="true">✓</span> Last verified <time dateTime={launch.lastVerified}>{formatVerified(launch.lastVerified)}</time>
                </span>
              </div>
            </div>
            <button type="button" className="vote" onClick={() => upvote(launch.id)} aria-label={`Upvote ${launch.name}`}>
              <span aria-hidden="true">▲</span>
              <strong>{launch.votes}</strong>
            </button>
          </li>
        ))}
      </ol>

      <footer className="footer">A small demo app. Ask an agent to change anything here.</footer>
    </main>
  );
}
