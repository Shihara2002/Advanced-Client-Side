import React from 'react';
import PropertyCard from './PropertyCard';
import './SearchResults.css';

/**
 * SearchResults Component
 * 
 * Displays the filtered search results in a grid layout.
 * Shows a message when no results are found.
 */
const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="search-results-empty">
        <h2>No properties found</h2>
        <p>Try adjusting your search criteria to find more properties.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>Found {results.length} {results.length === 1 ? 'property' : 'properties'}</h2>
      </div>
      <div className="search-results-grid">
        {results.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

