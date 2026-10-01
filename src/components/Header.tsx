import { useState } from 'react';

const DOCS_URL = 'https://select.foundation/docs#select-token';

export default function Header({ onShare }: { onShare: () => string }) {
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
          <span className="wordmark">SELECT</span>
          <span className="label">Flywheel simulator</span>
        </div>
        <nav className="header-actions">
          <a className="text-btn" href="#how">How it works</a>
          <a className="text-btn" href={DOCS_URL} target="_blank" rel="noopener noreferrer">Docs</a>
          <button className="btn-primary" onClick={handleShare} aria-live="polite">
            {copied ? 'Link copied' : 'Share this state'}
          </button>
        </nav>
      </div>
    </header>
  );
}
