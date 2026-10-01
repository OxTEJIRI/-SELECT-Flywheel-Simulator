import { useState } from 'react';

const DOCS_URL = 'https://select.foundation/docs#select-token';

interface Props {
  onShare: () => string;
  soundOn: boolean;
  onToggleSound: () => void;
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 6h2.5L8 3v10L4.5 10H2z" />
      {on ? <path d="M10.5 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6.5 6.5 0 0 1 0 9" /> : <path d="M11 6l4 4M15 6l-4 4" />}
    </svg>
  );
}

export default function Header({ onShare, soundOn, onToggleSound }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = onShare();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard unavailable: the URL is already in the address bar.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="brand">
          <img className="logo" src="/wordmark.png" alt="token.select" />
          <span className="label">Flywheel simulator</span>
        </div>
        <nav className="header-actions">
          <a className="text-btn" href="#how">How it works</a>
          <a className="text-btn" href={DOCS_URL} target="_blank" rel="noopener noreferrer">Docs</a>
          <button className="text-btn sound" onClick={onToggleSound} aria-pressed={soundOn} aria-label={soundOn ? 'Mute sound' : 'Turn sound on'}>
            <SpeakerIcon on={soundOn} />
          </button>
          <button className="btn-primary" onClick={handleShare} aria-live="polite">
            {copied ? 'Link copied' : 'Share this state'}
          </button>
        </nav>
      </div>
    </header>
  );
}
