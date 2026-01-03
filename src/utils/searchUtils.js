/**
 * Search utility functions for filtering properties
 */

/**
 * Filter properties based on search criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered array of properties
 */
export const filterProperties = (properties, criteria) => {
  if (!criteria || Object.keys(criteria).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    // Filter by property type
    if (criteria.type && criteria.type !== 'any') {
      if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
        return false;
      }
    }

    // Filter by price range
    if (criteria.minPrice !== null && criteria.minPrice !== undefined) {
      if (property.price < criteria.minPrice) {
        return false;
      }
    }
    if (criteria.maxPrice !== null && criteria.maxPrice !== undefined) {
      if (property.price > criteria.maxPrice) {
        return false;
      }
    }

    // Filter by bedroom range
    if (criteria.minBedrooms !== null && criteria.minBedrooms !== undefined) {
      if (property.bedrooms < criteria.minBedrooms) {
        return false;
      }
    }
    if (criteria.maxBedrooms !== null && criteria.maxBedrooms !== undefined) {
      if (property.bedrooms > criteria.maxBedrooms) {
        return false;
      }
    }

    // Filter by date added
    if (criteria.dateAfter) {
      const propertyDate = new Date(property.dateAdded);
      const filterDate = new Date(criteria.dateAfter);
      if (propertyDate < filterDate) {
        return false;
      }
    }
    if (criteria.dateBefore) {
      const propertyDate = new Date(property.dateAdded);
      const filterDate = new Date(criteria.dateBefore);
      if (propertyDate > filterDate) {
        return false;
      }
    }

    // Filter by postcode
    if (criteria.postcode && criteria.postcode.trim() !== '') {
      if (property.postcode.toLowerCase() !== criteria.postcode.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Format price in Sri Lankan Rupees (LKR)
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price) return 'Price on request';
  return `Rs. ${price.toLocaleString('en-LK')}`;
};

/**
 * Format date to readable string
 * @param {string} dateString - Date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML string
 */
export const escapeHtml = (text) => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

