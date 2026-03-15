import { Component, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';
import { FiStar, FiGitBranch, FiExternalLink, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import SectionWrapper from '../SectionWrapper';

// ── Responsive window width hook ────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle, { passive: true });
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
}

const GITHUB_USERNAME = 'rajhemant076';

class CalendarErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center h-28 rounded-xl text-xs font-mono text-center px-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            color: 'var(--text-secondary)',
            border: '1px dashed rgba(255,255,255,0.08)',
          }}
        >
          // calendar unavailable — check username or GitHub API rate limit
        </div>
      );
    }
    return this.props.children;
  }
}

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', PHP: '#777bb4', 'C++': '#f34b7d', C: '#555555',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Rust: '#dea584',
  Go: '#00ADD8', Ruby: '#701516',
};
const getLangColor = (lang) => LANG_COLORS[lang] || '#4ade80';

function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`rounded-lg animate-pulse ${className}`}
      style={{ background: 'rgba(255,255,255,0.06)', ...style }}
    />
  );
}

function RepoCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 4 }}
      className="glass-card rounded-xl p-5 block group transition-all duration-200 hover:border-white/10"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-bold truncate leading-snug group-hover:text-green-300 transition-colors duration-200" style={{ color: '#4ade80' }}>
          {repo.name}
        </p>
        <div className="flex items-center gap-1 flex-shrink-0 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <FiStar size={11} />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
      <p className="text-xs mb-3 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {repo.description || 'No description provided.'}
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: getLangColor(repo.language) }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{repo.language}</span>
          </div>
        )}
        {repo.forks_count > 0 && (
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <FiGitBranch size={11} />
            <span>{repo.forks_count}</span>
          </div>
        )}
        <div className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity duration-200">
          <FiExternalLink size={11} style={{ color: 'var(--text-secondary)' }} />
        </div>
      </div>
    </motion.a>
  );
}

function LangBar({ repos }) {
  const counts = {};
  repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));

  return (
    <div className="glass-card rounded-2xl p-6 mt-6">
      
      <div className="flex h-2 rounded-full overflow-hidden mb-5 gap-0.5">
        {sorted.map(l => (
          <motion.div
            key={l.name}
            initial={{ width: 0 }}
            animate={{ width: `${l.pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: getLangColor(l.name) }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {sorted.map(l => (
          <div key={l.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: getLangColor(l.name) }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{l.name}</span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{l.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubActivity() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [showAll, setShowAll] = useState(false);
  const width = useWindowWidth();

  // Calendar sizing — shrink blocks on narrow screens
  const calBlockSize   = width < 480 ? 8  : width < 768 ? 10 : 12;
  const calBlockMargin = width < 480 ? 2  : 3;
  const calFontSize    = width < 480 ? 9  : 11;
  // Show fewer repo cards on mobile by default
  const defaultRepoCount = width < 768 ? 3 : 5;

  const fetchGitHub = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = { Accept: 'application/vnd.github+json' };
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, { headers }),
      ]);
      if (!profileRes.ok) throw new Error(`GitHub API ${profileRes.status}: check username or rate limit`);
      const [profileData, reposData] = await Promise.all([profileRes.json(), reposRes.json()]);
      setProfile(profileData);
      setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGitHub(); }, []);

  const displayedRepos = showAll ? repos : repos.slice(0, defaultRepoCount);

  const stats = profile
    ? [
        { label: 'Repos',     value: profile.public_repos },
        { label: 'Followers', value: profile.followers },
        { label: 'Following', value: profile.following },
        { label: 'Stars',     value: repos.reduce((a, r) => a + r.stargazers_count, 0) },
      ]
    : null;

  return (
    <SectionWrapper id="github">
      <div className="section-tag mb-6">Open Source</div>

      <div className="flex flex-wrap items-end gap-3 mb-12 sm:mb-16">
        <h2 className="section-heading mb-0" style={{ color: 'var(--text-primary)' }}>
          GitHub <span className="gradient-text">activity</span>
        </h2>

        {profile && !loading && (
          <motion.a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-1 hover:border-green-500/30 transition-all duration-200"
          >
            <img src={profile.avatar_url} alt="avatar" className="w-5 h-5 rounded-full" />
            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>@{profile.login}</span>
          </motion.a>
        )}

        <motion.button
          onClick={fetchGitHub}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          className="p-2 rounded-lg mb-1 ml-auto transition-colors duration-200 hover:text-green-400"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          title="Refresh"
        >
          <FiRefreshCw size={14} />
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-5 py-4 rounded-xl mb-8 text-sm"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}
          >
            <FiAlertCircle size={16} className="flex-shrink-0" />
            <span className="font-mono text-xs">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Calendar + lang bar */}
        <div className="lg:col-span-2 min-w-0">
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            
            {/* Calendar scrolls horizontally on very small screens */}
            <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
              <CalendarErrorBoundary>
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  colorScheme="dark"
                  blockSize={calBlockSize}
                  blockMargin={calBlockMargin}
                  fontSize={calFontSize}
                  theme={{ dark: ['#161b24', '#1a4731', '#166534', '#16a34a', '#4ade80'] }}
                />
              </CalendarErrorBoundary>
            </div>
          </div>

          {loading && <Skeleton className="mt-4 sm:mt-6 h-36 w-full" />}
          {!loading && repos.length > 0 && <LangBar repos={repos} />}
        </div>

        {/* Repos + stats */}
        <div className="space-y-3 sm:space-y-4">
          

          {loading && Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}

          {/* On mobile show as 2-col mini grid; on lg+ keep single col */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {displayedRepos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}

          {!loading && repos.length > defaultRepoCount && (
            <motion.button
              onClick={() => setShowAll(v => !v)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 rounded-xl text-xs font-medium transition-all duration-200 hover:text-green-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)' }}
            >
              {showAll ? 'Show less ↑' : `Show all ${repos.length} repos ↓`}
            </motion.button>
          )}

          {loading && <Skeleton className="h-36 w-full" />}

          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-xl p-4 sm:p-5"
              style={{ border: '1px solid rgba(74,222,128,0.15)' }}
            >
              
              <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3">
                {stats.map(s => (
                  <div key={s.label} className="text-center py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-base sm:text-lg font-bold gradient-text-green">{s.value}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              {profile.bio && (
                <p
                  className="text-xs mt-4 leading-relaxed"
                  style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}
                >
                  {profile.bio}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
