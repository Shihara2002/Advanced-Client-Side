import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import './App.css';

/**
 * Main App Component
 * Manages global state for favourites and routing
 */
function App() {
  // Load favourites from localStorage on mount
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem('propertyFavourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Save favourites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Add a property to favourites (prevents duplicates)
   * @param {Object} property - Property object to add
   */
  const addToFavourites = (property) => {
    setFavourites(prev => {
      // Check if property already exists
      if (prev.some(fav => fav.id === property.id)) {
        return prev; // Return unchanged if duplicate
      }
      return [...prev, property];
    });
  };

  /**
   * Remove a property from favourites
   * @param {number} propertyId - ID of property to remove
   */
  const removeFromFavourites = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clear all favourites
   */
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <SearchPage 
                favourites={favourites}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                clearFavourites={clearFavourites}
              />
            } 
          />
          <Route 
            path="/property/:id" 
            element={
              <PropertyDetail 
                favourites={favourites}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
