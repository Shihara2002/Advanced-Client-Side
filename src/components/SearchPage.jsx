import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import SearchForm from './SearchForm';
import PropertyCard from './PropertyCard';
import FavouritesList from './FavouritesList';
import propertiesData from '../data/properties.json';
import { filterProperties } from '../utils/searchUtils';
import './SearchPage.css';

/**
 * SearchPage Component
 * Main page with search form, results, and favourites sidebar
 */
const SearchPage = ({
  favourites,
  addToFavourites,
  removeFromFavourites,
  clearFavourites
}) => {
  const [searchResults, setSearchResults] = useState(propertiesData);
  const [searchCriteria, setSearchCriteria] = useState({});

  /**
   * Handle search form submission
   */
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    const filtered = filterProperties(propertiesData, criteria);
    setSearchResults(filtered);
  };

  /**
   * Handle drop in results area (remove from favourites)
   */
  const ResultsDropZone = ({ children }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'property',
      drop: (item) => {
        // Remove from favourites if dropped in results area (especially if dragged from favourites)
        if (item.isFromFavourites || favourites.some(fav => fav.id === item.id)) {
          removeFromFavourites(item.id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    });

    return (
      <div ref={drop} className={`results-area ${isOver ? 'drag-over' : ''}`}>
        {children}
      </div>
    );
  };

  /**
   * Handle drop in favourites area (add to favourites)
   */
  const FavouritesDropZone = ({ children }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'property',
      drop: (item) => {
        // Add to favourites if not already there
        const property = propertiesData.find(p => p.id === item.id);
        if (property && !favourites.some(fav => fav.id === item.id)) {
          addToFavourites(property);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    });

    return (
      <div ref={drop}>
        {children}
      </div>
    );
  };

  /**
   * Toggle favourite status
   */
  const handleToggleFavourite = (property) => {
    const isFavourite = favourites.some(fav => fav.id === property.id);
    if (isFavourite) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="search-page">
        <header className="app-header">
          <div className="container">
            <h1>Property Search</h1>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            {/* Search Form */}
            <SearchForm onSearch={handleSearch} />

            {/* Main Layout: Results and Favourites */}
            <div className="page-layout">
              {/* Search Results */}
              <div className="results-section">
                <div className="results-header">
                  <h2>
                    {searchResults.length} {searchResults.length === 1 ? 'Property' : 'Properties'} Found
                  </h2>
                </div>

                <ResultsDropZone>
                  {searchResults.length === 0 ? (
                    <div className="no-results">
                      <p>No properties found matching your criteria.</p>
                      <p>Try adjusting your search filters.</p>
                    </div>
                  ) : (
                    <div className="results-grid">
                      {searchResults.map(property => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          isFavourite={favourites.some(fav => fav.id === property.id)}
                          onToggleFavourite={handleToggleFavourite}
                        />
                      ))}
                    </div>
                  )}
                </ResultsDropZone>
              </div>

              {/* Favourites Sidebar */}
              <aside className="favourites-section">
                <FavouritesDropZone>
                  <FavouritesList
                    favourites={favourites}
                    removeFromFavourites={removeFromFavourites}
                    clearFavourites={clearFavourites}
                  />
                </FavouritesDropZone>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default SearchPage;

