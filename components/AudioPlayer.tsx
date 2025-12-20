import React, { useState, useRef, useEffect } from 'react';
import { AudioTrack } from '../types';

interface AudioPlayerProps {
  tracks: AudioTrack[];
  isPlaying: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isManualPause, setIsManualPause] = useState(false);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (isPlaying && !isManualPause) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, isManualPause, volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsManualPause(false);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsManualPause(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsManualPause(false);
      } else {
        audioRef.current.pause();
        setIsManualPause(true);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Determine volume icon based on level (Chic Filled Style)
  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
           <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63m2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      );
    } else if (volume < 50) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M7 9v6h4l5 5V4l-5 5H7z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      );
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 backdrop-blur-sm flex flex-col gap-3">
      
      {/* Top Row: Icon/Cover and Info */}
      <div className="flex items-center gap-4">
        {/* Audio Icon / Cover */}
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
            {currentTrack.cover ? (
                <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
            ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="m12.75 12.508l8.5-3.4v5.653a3.25 3.25 0 1 0 1.5 2.74V7.945c0-1.143 0-2.101-.08-2.865a8 8 0 0 0-.04-.315c-.078-.522-.214-1.008-.479-1.415a2.2 2.2 0 0 0-.62-.63l-.007-.005c-.708-.47-1.503-.437-2.322-.228c-.792.202-1.774.613-2.978 1.117l-2.094.876c-.565.236-1.043.437-1.418.644c-.4.22-.743.48-1.001.868s-.366.805-.415 1.259c-.046.426-.046.945-.046 1.557v7.952a3.25 3.25 0 1 0 1.5 2.74zM7.75 2a.75.75 0 0 0-1.5 0v5.76a3.25 3.25 0 1 0 1.5 2.74V5.005c.699.504 1.53.745 2.25.745a.75.75 0 0 0 0-1.5a2.44 2.44 0 0 1-1.488-.552c-.434-.357-.762-.9-.762-1.698"></path>
             </svg>
            )}
        </div>

        {/* Track Info */}
        <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium text-[17px] truncate">{currentTrack.title}</h3>
            
            {/* Progress Bar & Time */}
             <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-white/70 font-mono w-[35px] text-right">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-white absolute top-0 left-0 transition-all duration-100 ease-linear"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <span className="text-[11px] text-white/70 font-mono w-[35px]">{formatTime(duration)}</span>
             </div>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between mt-1">
        
        {/* Volume Control */}
        <div className="flex items-center gap-2 w-1/4">
             {getVolumeIcon()}
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
             />
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center gap-4">
             <button onClick={handlePrev} className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1m3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07a1 1 0 0 0 0 1.64"></path>
                </svg>
             </button>
             
             <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                {isManualPause || !isPlaying ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"></path>
                     </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"></path>
                    </svg>
                )}
             </button>

             <button onClick={handleNext} className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                     <path fill="currentColor" d="m7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82M16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1"></path>
                </svg>
             </button>
        </div>

        {/* Spacer for centering */}
        <div className="w-1/4"></div>

      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />
    </div>
  );
};

export default AudioPlayer;