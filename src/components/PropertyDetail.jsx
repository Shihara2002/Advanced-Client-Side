import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/properties.json';
import PropertyGallery from './PropertyGallery';
import { formatPrice, formatDate, escapeHtml } from '../utils/searchUtils';
import './PropertyDetail.css';

/**
 * PropertyDetail Component
 * Displays full property details with gallery, tabs, and map
 */
const PropertyDetail = ({ favourites, addToFavourites, removeFromFavourites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const foundProperty = propertiesData.find(p => p.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="property-detail-page">
        <div className="container">
          <div className="property-not-found">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Search</Link>
          </div>
        </div>
      </div>
    );
  }

  const isFavourite = favourites.some(fav => fav.id === property.id);
  const safeTitle = escapeHtml(property.title);
  const safeDescription = escapeHtml(property.description);
  const safeLongDescription = escapeHtml(property.longDescription || property.description);
  const safeLocation = escapeHtml(property.location);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property);
    }
  };

  // Google Maps embed URL - use location name if coordinates not available
  const mapQuery = property.coordinates 
    ? `${property.coordinates.lat},${property.coordinates.lng}`
    : encodeURIComponent(property.location);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4qgbjQUs8&q=${mapQuery}&zoom=15`;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="property-detail-page">
        <header className="app-header">
          <div className="container">
            <div className="header-content">
              <Link to="/" className="back-link">← Back to Search</Link>
              <h1>Property Details</h1>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            {/* Property Header */}
            <div className="property-header">
              <div className="property-header-content">
                <h2>{safeTitle}</h2>
                <p className="property-location">{safeLocation}</p>
                <div className="property-price">{formatPrice(property.price)}</div>
              </div>
              <button
                className={`favourite-btn-large ${isFavourite ? 'active' : ''}`}
                onClick={handleToggleFavourite}
                aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <span className="heart-icon">{isFavourite ? '❤️' : '🤍'}</span>
                <span>{isFavourite ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Property Gallery */}
            <PropertyGallery images={property.images} title={safeTitle} />

            {/* Quick Info */}
            <div className="property-quick-info">
              <div className="info-item">
                <span className="info-label">Type</span>
                <span className="info-value">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bedrooms</span>
                <span className="info-value">{property.bedrooms}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date Added</span>
                <span className="info-value">{formatDate(property.dateAdded)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Postcode</span>
                <span className="info-value">{property.postcode}</span>
              </div>
            </div>

            {/* Short Description */}
            <div className="property-short-description">
              <p>{safeDescription}</p>
            </div>

            {/* Tabs Section */}
            <div className="property-tabs-section">
              <Tabs>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Floor Plan</Tab>
                  <Tab>Map</Tab>
                </TabList>

                <TabPanel>
                  <div className="tab-content">
                    <h3>Full Description</h3>
                    <p className="long-description">{safeLongDescription}</p>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content">
                    <h3>Floor Plan</h3>
                    {property.floorPlan ? (
                      <div className="floor-plan-container">
                        <img
                          src={property.floorPlan}
                          alt={`Floor plan for ${safeTitle}`}
                          className="floor-plan-image"
                        />
                      </div>
                    ) : (
                      <div className="floor-plan-container">
                        <p style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center', padding: '3rem' }}>
                          Floor plan not available for this property.
                        </p>
                      </div>
                    )}
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content">
                    <h3>Location Map</h3>
                    <div className="map-container">
                      <iframe
                        title={`Map showing location of ${safeTitle}`}
                        width="100%"
                        height="600"
                        style={{ border: 0, borderRadius: '16px' }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapUrl}
                      />
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default PropertyDetail;
