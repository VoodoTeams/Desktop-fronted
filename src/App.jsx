import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import MainLayout from './components/layout/MainLayout';
import './App.css';

const App = () => {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </SocketProvider>
  );
};

export default App;
