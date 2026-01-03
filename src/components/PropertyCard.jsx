import React from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate, escapeHtml } from '../utils/searchUtils';
import './PropertyCard.css';

/**
 * PropertyCard Component
 * Displays a property in the search results
 * Supports drag and drop for favourites
 */
const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  const navigate = useNavigate();
  
  // Drag and drop configuration
  const [{ isDragging }, drag] = useDrag({
    type: 'property',
    item: { id: property.id, property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Format property data safely
  const safeTitle = escapeHtml(property.title);
  const safeDescription = escapeHtml(property.description);
  const safeLocation = escapeHtml(property.location);

  // Handle card click - navigate to detail page
  const handleCardClick = (e) => {
    // Don't navigate if clicking the favourite button
    if (e.target.closest('.favourite-btn')) {
      return;
    }
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      onClick={handleCardClick}
    >
      <div className="property-link">
        <div className="property-image-container">
          <img
            src={property.images[0]}
            alt={safeTitle}
            className="property-image"
            loading="lazy"
          />
          <div className="property-badge">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </div>
        </div>

        <div className="property-content">
          <h3 className="property-title">{safeTitle}</h3>
          <p className="property-location">{safeLocation}</p>
          <p className="property-description">{safeDescription}</p>

          <div className="property-details">
            <div className="property-detail-item">
              <span className="detail-label">Price:</span>
              <span className="detail-value price">{formatPrice(property.price)}</span>
            </div>
            <div className="property-detail-item">
              <span className="detail-label">Bedrooms:</span>
              <span className="detail-value">{property.bedrooms}</span>
            </div>
            <div className="property-detail-item">
              <span className="detail-label">Added:</span>
              <span className="detail-value">{formatDate(property.dateAdded)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`favourite-btn ${isFavourite ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavourite(property);
        }}
        aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <span className="heart-icon">{isFavourite ? '❤️' : '🤍'}</span>
      </button>
    </div>
  );
};

export default PropertyCard;
