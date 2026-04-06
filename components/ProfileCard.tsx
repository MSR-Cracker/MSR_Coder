import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { SocialLink, AudioTrack } from '../types';

interface ProfileCardProps {
  isPlaying: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isPlaying }) => {
  const [viewCount, setViewCount] = useState(9437);

  useEffect(() => {
    // Simulate view count incrementing by 10-20 on entry
    const increment = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    setViewCount(prev => prev + increment);
  }, []);

  const audioTracks: AudioTrack[] = [
      {
          title: "BONO",
          url: "https://r2.guns.lol/a5d4de85-26f7-4df3-888e-8acace659b4f.mp3",
          cover: "https://r2.guns.lol/ee61d00f-a9fa-4960-b50a-a1f7ec403d59.webp"
      },
      {
          title: "GHANIMA",
          url: "https://r2.guns.lol/9dea56c5-368f-4452-9e71-c6c30688f1e8.mp3",
          cover: "https://r2.guns.lol/83e651f8-2e5c-4f7d-833e-05ddeb1e5ea0.webp"
      }
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@Shadow-Dev-2007',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="w-6 h-6 text-white drop-shadow-[1px_0_7px_#ffffff]">
          <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/msr_coderr',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="3 2.98 18.01 18.04" className="w-6 h-6 text-white drop-shadow-[1px_0_7px_#ffffff]">
          <path fill="currentColor" d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216a4.61 4.61 0 0 0-2.633-2.633a6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42a4.607 4.607 0 0 0-2.633 2.633a6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632a6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419a4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187c.043-.962.056-1.267.056-3.71c-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078a1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z"></path>
          <circle cx="11.994" cy="11.979" r="3.003" fill="currentColor"></circle>
        </svg>
      )
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/msr_coder',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="2 3.61 20.02 16.79" className="w-6 h-6 text-white drop-shadow-[1px_0_7px_#ffffff]">
          <path fill="currentColor" d="m20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
        </svg>
      )
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/MSR-Cracker',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="2.05 2 19.95 19.46" className="w-6 h-6 text-white drop-shadow-[1px_0_7px_#ffffff]">
          <path fill="currentColor" fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974c0 4.406 2.857 8.145 6.821 9.465c.499.09.679-.217.679-.481c0-.237-.008-.865-.011-1.696c-2.775.602-3.361-1.338-3.361-1.338c-.452-1.152-1.107-1.459-1.107-1.459c-.905-.619.069-.605.069-.605c1.002.07 1.527 1.028 1.527 1.028c.89 1.524 2.336 1.084 2.902.829c.091-.645.351-1.085.635-1.334c-2.214-.251-4.542-1.107-4.542-4.93c0-1.087.389-1.979 1.024-2.675c-.101-.253-.446-1.268.099-2.64c0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336a9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021c.545 1.372.203 2.387.099 2.64c.64.696 1.024 1.587 1.024 2.675c0 3.833-2.33 4.675-4.552 4.922c.355.308.675.916.675 1.846c0 1.334-.012 2.41-.012 2.737c0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974C22 6.465 17.535 2 12.026 2z" clipRule="evenodd"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full max-w-[40rem] mx-auto p-[35px_15px]">
      <div className="backdrop-blur-[3px] bg-white/5 border-2 border-white/5 rounded-[20px] p-8 flex flex-col items-center">
        
        {/* Profile Image */}
        <div className="mb-6 relative">
          <img 
            src="https://i.ibb.co/5hyRL0Fg/1869.jpg" 
            alt="Avatar" 
            className="w-32 h-32 rounded-full border-2 border-white/40 object-cover shadow-[0_0_16.5px_#ffffff]"
          />
        </div>

        {/* Username */}
        <h1 className="text-white text-4xl font-bold mb-2 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-wider font-mono">
          𝗠𝗦𝗥_𝗖𝗼𝗱𝗲𝗿
        </h1>

        {/* Description */}
        <h3 className="text-white/70 text-[19px] font-medium mb-4">
          Developer
        </h3>

        {/* Status / Location */}
        <div className="flex items-center gap-2 text-white/90 text-[15px] font-normal mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="4 2 16 20">
            <path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"></path>
          </svg>
          <span>Egypt</span>
        </div>

        {/* Fake Discord Status */}
        <div className="w-full bg-[#18191c]/90 border-2 border-white/5 rounded-2xl p-4 mb-6 backdrop-blur-sm text-white shadow-lg">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img 
                        src="https://i.ibb.co/5hyRL0Fg/1869.jpg" 
                        alt="Discord Avatar" 
                        className="w-[60px] h-[60px] rounded-full object-cover" 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-[3px] border-[#18191c]"></div>
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-white/90">𝗠𝗦𝗥_𝗖𝗼𝗱𝗲𝗿</div>
                    <div className="text-xs text-white/70 mt-0.5">Playing <span className="font-bold text-white">Visual Studio Code</span></div>
                </div>
            </div>
        </div>

        {/* Audio Player */}
        <div className="w-full mb-8">
            <AudioPlayer tracks={audioTracks} isPlaying={isPlaying} />
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Views Counter (Static for now) */}
        <div className="absolute bottom-3 left-4 text-white/50 text-sm font-semibold flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{viewCount.toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;