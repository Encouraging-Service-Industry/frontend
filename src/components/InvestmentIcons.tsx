import React from 'react';
// React import kept for JSX runtime compatibility in this project setup.

export function IconHealth(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M20.8 8.6c0 4.9-8.8 11.1-8.8 11.1S3.2 13.5 3.2 8.6a4 4 0 0 1 6.4-3.1l.8.7.8-.7a4 4 0 0 1 6.4 3.1z" />
    </svg>
  );
}

export function IconRelationship(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zM2 21c0-2.8 3.6-5 8-5s8 2.2 8 5" />
    </svg>
  );
}

export function IconSelf(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function IconCoin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M10 9h4v6h-4z" />
    </svg>
  );
}
