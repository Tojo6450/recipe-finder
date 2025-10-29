
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import RecipeDetailPage from './pages/RecipeDetail.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import Header from './components/common/Header.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200">
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;