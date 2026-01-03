import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { formatPrice, escapeHtml } from '../utils/searchUtils';
import './FavouritesList.css';

/**
 * FavouritesList Component
 * Displays saved favourite properties
 * Supports drag and drop to add/remove properties
 */
const FavouritesList = ({ favourites, removeFromFavourites, clearFavourites }) => {
  // Drop zone configuration
  const [{ isOver }, drop] = useDrop({
    accept: 'property',
    drop: (item) => {
      // This is handled by the parent component
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={`favourites-list ${isOver ? 'drag-over' : ''}`}
    >
      <div className="favourites-header">
        <h3>Favourite Properties</h3>
        {favourites.length > 0 && (
          <button
            className="clear-btn"
            onClick={clearFavourites}
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p className="hint">Drag properties here or click the heart icon. Drag out to remove.</p>
        </div>
      ) : (
        <div className="favourites-items">
          {favourites.map((property) => {
            const safeTitle = escapeHtml(property.title);
            return (
              <FavouriteItem
                key={property.id}
                property={property}
                safeTitle={safeTitle}
                removeFromFavourites={removeFromFavourites}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * FavouriteItem Component
 * Individual favourite item that can be dragged out to remove
 */
const FavouriteItem = ({ property, safeTitle, removeFromFavourites }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'property',
    item: { id: property.id, property, isFromFavourites: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging' : ''}`}
    >
      <Link to={`/property/${property.id}`} className="favourite-link">
        <img
          src={property.images[0]}
          alt={safeTitle}
          className="favourite-image"
          loading="lazy"
        />
        <div className="favourite-info">
          <h4 className="favourite-title">{safeTitle}</h4>
          <p className="favourite-price">{formatPrice(property.price)}</p>
        </div>
      </Link>
      <button
        className="remove-btn"
        onClick={() => removeFromFavourites(property.id)}
        aria-label={`Remove ${safeTitle} from favourites`}
        title="Remove from favourites"
      >
        ×
      </button>
    </div>
  );
};

export default FavouritesList;
