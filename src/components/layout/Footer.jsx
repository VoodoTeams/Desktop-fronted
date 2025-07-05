import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-center md:justify-between items-center flex-wrap">
        <div className="flex space-x-8 mb-4 md:mb-0">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Discover</a>
          <a href="#" className="hover:underline">Safety</a>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">News</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
