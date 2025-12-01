import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import EditOutfitPage from './pages/EditOutfitPage';
import SavedOutfitsPage from './pages/SavedOutfitsPage';
import ProfilePage from './pages/ProfilePage';
import UploadClothPage from './pages/UploadClothPage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditOutfitPage />} />
          <Route path="/outfits" element={<SavedOutfitsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadClothPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
