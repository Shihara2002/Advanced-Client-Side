import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyGallery.css';

/**
 * PropertyGallery Component
 * Displays property images with thumbnail navigation
 * Uses react-image-gallery for smooth image viewing
 */
const PropertyGallery = ({ images, title }) => {
  // Convert images array to format required by react-image-gallery
  const galleryImages = images.map((imageUrl, index) => ({
    original: imageUrl,
    thumbnail: imageUrl,
    originalAlt: `${title} - Image ${index + 1}`,
    thumbnailAlt: `${title} - Thumbnail ${index + 1}`
  }));

  return (
    <div className="property-gallery">
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showBullets={true}
        showThumbnails={true}
        thumbnailPosition="bottom"
        lazyLoad={true}
        slideInterval={0}
        autoPlay={false}
      />
    </div>
  );
};

export default PropertyGallery;

