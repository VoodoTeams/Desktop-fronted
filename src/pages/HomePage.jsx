import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [ageConfirmed, setAgeConfirmed] = React.useState(false);
  
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{ 
        backgroundImage: "url('/src/assets/bg-image.jpg')",
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="text-center max-w-3xl mx-auto z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">Voodo Chats</h1>
        <p className="text-xl md:text-2xl mb-10">
          Connect With A Touch of Mystery
          <br />
          Not our Average Chat App
        </p>
        
        <div className="mb-10">
          <h2 className="text-2xl mb-6">Select Your Tags</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/text-chat" className={`
              px-6 py-4 bg-black border border-gray-600 hover:border-white transition
              rounded-md flex items-center gap-2
              ${ageConfirmed ? '' : 'pointer-events-none opacity-50'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Texts chat
            </Link>
            
            <Link to="/video-chat" className={`
              px-6 py-4 bg-black border border-gray-600 hover:border-white transition
              rounded-md flex items-center gap-2
              ${ageConfirmed ? '' : 'pointer-events-none opacity-50'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Chats
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-md max-w-2xl mx-auto">
          <label className="flex items-start cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-3 mt-1"
              checked={ageConfirmed}
              onChange={() => setAgeConfirmed(!ageConfirmed)}
            />
            <span className="text-left text-sm">
              I confirm I have read and agree to the Terms of Service. 
              I confirm that I am at least 13 years old and I have reached the age of majority.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
