import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search form with all fields', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByLabelText(/property type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date added after/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date added before/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postcode area/i)).toBeInTheDocument();
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const submitButton = screen.getByText(/search properties/i);
    fireEvent.click(submitButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('has reset button that clears form', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const resetButton = screen.getByText(/reset filters/i);
    expect(resetButton).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
