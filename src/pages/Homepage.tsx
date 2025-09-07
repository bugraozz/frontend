import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

export default function Homepage() {
  const commonLinkStyles: CSSProperties = {
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.3s ease',
  };

  const containerStyles: CSSProperties = {
    textAlign: 'center',
    marginTop: '2.5rem',
  };

  const titleStyles: CSSProperties = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#2563eb',
  };

  const subtitleStyles: CSSProperties = {
    color: '#4b5563',
    marginBottom: '1.5rem',
  };

  const linkContainerStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Welcome to the Assignment</h1>
      <p style={subtitleStyles}>Choose a section to explore CRUD operations.</p>

      <div style={linkContainerStyles}>
        <Link 
          to="/users" 
          style={{ ...commonLinkStyles, backgroundColor: '#3b82f6' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Go to Users
        </Link>
        <Link 
          to="/posts" 
          style={{ ...commonLinkStyles, backgroundColor: '#22c55e' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#16a34a'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#22c55e'}
        >
          Go to Posts
        </Link>
      </div>
    </div>
  );
}