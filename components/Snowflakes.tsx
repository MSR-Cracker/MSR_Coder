import React from 'react';

const Snowflakes: React.FC = () => {
  // Create an array of snowflakes with random properties
  const flakes = Array.from({ length: 15 }).map((_, i) => {
    const left = Math.random() * 100;
    const animationDuration = 5 + Math.random() * 10;
    const animationDelay = Math.random() * 5;
    const opacity = 0.3 + Math.random() * 0.7;
    const size = 10 + Math.random() * 20;

    return (
      <div
        key={i}
        className="snowflake"
        style={{
          left: `${left}vw`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
          opacity: opacity,
          fontSize: `${size}px`,
        }}
      >
        ❅
      </div>
    );
  });

  return <div aria-hidden="true">{flakes}</div>;
};

export default Snowflakes;