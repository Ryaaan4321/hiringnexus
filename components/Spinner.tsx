import React from "react";

type Props = {
  size?: number; // px
  className?: string;
};

export default function ChatGPTSpinner({ size = 24, className = "" }: Props) {
  const dotSize = Math.max(3, Math.round(size / 4));
  const radius = Math.max(6, Math.round(size / 2.5));
  const styleVars = {
    // styled-jsx will pick these up as inline styles
    "--size": `${size}px`,
    "--dot-size": `${dotSize}px`,
    "--radius": `${radius}px`,
  } as React.CSSProperties;

  return (
    <div className={`chatgpt-spinner ${className}`} style={styleVars} aria-hidden="true">
      <div className="orbit">
        <span className="dot d1"><span className="inner" /></span>
        <span className="dot d2"><span className="inner" /></span>
        <span className="dot d3"><span className="inner" /></span>
      </div>

      <style jsx>{`
        .chatgpt-spinner {
          width: var(--size);
          height: var(--size);
          display: inline-block;
          color: currentColor; /* inherit color from parent */
        }

        .orbit {
          width: 100%;
          height: 100%;
          position: relative;
          animation: spin 1.2s linear infinite;
        }

        .dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--dot-size);
          height: var(--dot-size);
          margin: calc(var(--dot-size) / -2) 0 0 calc(var(--dot-size) / -2);
          border-radius: 50%;
          /* place each dot at a different angle on the circle */
        }

        .d1 { transform: rotate(0deg) translate(0, calc(-1 * var(--radius))); }
        .d2 { transform: rotate(120deg) translate(0, calc(-1 * var(--radius))); }
        .d3 { transform: rotate(240deg) translate(0, calc(-1 * var(--radius))); }

        .inner {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 1.2s ease-in-out infinite;
        }

        .d1 .inner { animation-delay: 0s; }
        .d2 .inner { animation-delay: -0.15s; }
        .d3 .inner { animation-delay: -0.3s; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.5); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
