import React, { useState } from 'react';
import { Combobox, NumberPicker, DateTimePicker } from 'react-widgets';
import 'react-widgets/styles.css';
import './SearchForm.css';

/**
 * SearchForm Component
 * Enhanced form using React Widgets for all inputs
 * Handles all search criteria: type, price, bedrooms, date, postcode
 */
const SearchForm = ({ onSearch }) => {
  // Form state
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateAfter: null,
    dateBefore: null,
    postcode: ''
  });

  // Property type options
  const propertyTypes = [
    { value: 'any', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  // Price options (in thousands)
  const priceOptions = Array.from({ length: 60 }, (_, i) => (i + 1) * 10);

  // Bedroom options
  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  /**
   * Handle input changes
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  /**
   * Reset form to default values
   */
  const handleReset = () => {
    const resetData = {
      type: 'any',
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      dateAfter: null,
      dateBefore: null,
      postcode: ''
    };
    setFormData(resetData);
    onSearch(resetData);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} aria-label="Property search form">
      <div className="form-header">
        <h2>Search Properties</h2>
        <p>Find your perfect home using the filters below</p>
      </div>

      <div className="form-grid">
        {/* Property Type - React Widgets Combobox */}
        <div className="form-group">
          <label htmlFor="property-type">Property Type</label>
          <Combobox
            id="property-type"
            data={propertyTypes}
            valueField="value"
            textField="label"
            value={formData.type}
            onChange={(value) => handleChange('type', value?.value || 'any')}
            placeholder="Select property type"
            aria-label="Property type selection"
          />
        </div>

        {/* Min Price - React Widgets NumberPicker */}
        <div className="form-group">
          <label htmlFor="min-price">Minimum Price (LKR)</label>
          <NumberPicker
            id="min-price"
            value={formData.minPrice}
            onChange={(value) => handleChange('minPrice', value)}
            min={0}
            max={100000000}
            step={1000000}
            placeholder="No minimum"
            aria-label="Minimum price"
          />
        </div>

        {/* Max Price - React Widgets NumberPicker */}
        <div className="form-group">
          <label htmlFor="max-price">Maximum Price (LKR)</label>
          <NumberPicker
            id="max-price"
            value={formData.maxPrice}
            onChange={(value) => handleChange('maxPrice', value)}
            min={0}
            max={100000000}
            step={1000000}
            placeholder="No maximum"
            aria-label="Maximum price"
          />
        </div>

        {/* Min Bedrooms - React Widgets NumberPicker */}
        <div className="form-group">
          <label htmlFor="min-bedrooms">Minimum Bedrooms</label>
          <NumberPicker
            id="min-bedrooms"
            value={formData.minBedrooms}
            onChange={(value) => handleChange('minBedrooms', value)}
            min={1}
            max={10}
            placeholder="Any"
            aria-label="Minimum bedrooms"
          />
        </div>

        {/* Max Bedrooms - React Widgets NumberPicker */}
        <div className="form-group">
          <label htmlFor="max-bedrooms">Maximum Bedrooms</label>
          <NumberPicker
            id="max-bedrooms"
            value={formData.maxBedrooms}
            onChange={(value) => handleChange('maxBedrooms', value)}
            min={1}
            max={10}
            placeholder="Any"
            aria-label="Maximum bedrooms"
          />
        </div>

        {/* Date Added After - React Widgets DateTimePicker */}
        <div className="form-group">
          <label htmlFor="date-after">Added After</label>
          <DateTimePicker
            id="date-after"
            value={formData.dateAfter}
            onChange={(value) => handleChange('dateAfter', value)}
            placeholder="Select date"
            time={false}
            aria-label="Date added after"
          />
        </div>

        {/* Date Added Before - React Widgets DateTimePicker */}
        <div className="form-group">
          <label htmlFor="date-before">Added Before</label>
          <DateTimePicker
            id="date-before"
            value={formData.dateBefore}
            onChange={(value) => handleChange('dateBefore', value)}
            placeholder="Select date"
            time={false}
            aria-label="Date added before"
          />
        </div>

        {/* Postcode - React Widgets Combobox with autocomplete */}
        <div className="form-group form-group-full">
          <label htmlFor="postcode">Postcode Area</label>
          <Combobox
            id="postcode"
            data={['COL03', 'COL04', 'COL05', 'COL07', 'KAN01', 'GAL01', 'MTL01']}
            value={formData.postcode}
            onChange={(value) => handleChange('postcode', value || '')}
            placeholder="Enter postcode area (e.g., COL07)"
            filter="contains"
            aria-label="Postcode area"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Search Properties
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
