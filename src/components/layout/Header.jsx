import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/src/assets/logo.png" alt="Voodo Logo" className="h-10" />
          <span className="text-xl font-bold">Voodo.</span>
        </div>
        <div className="flex space-x-4">
          <span className="bg-gray-700 px-3 py-1 rounded">15,023+</span>
          <button className="bg-black border border-white px-3 py-1 rounded">Premium</button>
          <button className="bg-black border border-white px-3 py-1 rounded">Download</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
