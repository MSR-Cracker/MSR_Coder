import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from './components/ProfileCard';
import Snowflakes from './components/Snowflakes';

const App: React.FC = () => {
  const [entered, setEntered] = useState(false);
  const [scale, setScale] = useState(1);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setEntered(true);
    // Force play video on enter if it wasn't playing
    if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
    }
  };

  useEffect(() => {
    // Attempt to play video on mount
    if (videoRef.current) {
        videoRef.current.play().catch(() => {
            // If autoplay fails, we wait for user interaction (handleEnter)
        });
    }
  }, []);

  useEffect(() => {
    if (!entered) return;

    const calculateScale = () => {
      if (contentWrapperRef.current && contentWrapperRef.current.firstElementChild) {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const padding = 20; // Safety margin
        const availableHeight = vh - padding;
        const availableWidth = vw - padding;

        const content = contentWrapperRef.current.firstElementChild as HTMLElement;
        const contentHeight = content.scrollHeight;
        const contentWidth = content.scrollWidth;

        if (contentHeight === 0 || contentWidth === 0) return;

        // Calculate scale factors
        const scaleH = availableHeight / contentHeight;
        const scaleW = availableWidth / contentWidth;

        // Determine final scale: fit both width and height, max 1
        const newScale = Math.min(scaleH, scaleW, 1);
        setScale(newScale);
      }
    };

    // Initial calculation and listeners
    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    // Observer for content size changes
    const observer = new ResizeObserver(calculateScale);
    if (contentWrapperRef.current) {
      observer.observe(contentWrapperRef.current);
    }

    return () => {
      window.removeEventListener('resize', calculateScale);
      observer.disconnect();
    };
  }, [entered]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden text-white font-sans bg-black select-none">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="https://i.ibb.co/5hyRL0Fg/1869.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[4px] scale-105 pointer-events-none"
        src="https://r2.guns.lol/e0e79b73-99af-43bd-b244-8604b3a77043.mp4"
      />
      
      {/* Overlay to dim video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0 pointer-events-none"></div>

      {/* Snowflakes Animation */}
      <Snowflakes />

      {/* Entry Screen */}
      {!entered ? (
        <div 
          className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl cursor-pointer transition-opacity duration-500"
          onClick={handleEnter}
        >
          <div className="text-[30px] font-bold animate-pulse">
            Click to Enter...🤫
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden animate-[fadeIn_1s_ease-in-out]">
           <div 
             ref={contentWrapperRef}
             style={{ 
               transform: `scale(${scale})`, 
               transformOrigin: 'center center',
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
             }}
             className="transition-transform duration-300 ease-out"
           >
             <ProfileCard isPlaying={entered} />
           </div>
        </div>
      )}
    </div>
  );
};

export default App;