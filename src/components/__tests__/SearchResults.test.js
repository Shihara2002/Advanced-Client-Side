/**
 * Tests for SearchResults component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import SearchResults from '../SearchResults';
import PropertyCard from '../PropertyCard';

const mockResults = [
  {
    id: 1,
    type: 'house',
    price: 450000,
    bedrooms: 3,
    title: 'Property 1',
    location: 'Location 1',
    description: 'Description 1',
    images: ['image1.jpg'],
    postcode: 'BR1'
  },
  {
    id: 2,
    type: 'flat',
    price: 280000,
    bedrooms: 2,
    title: 'Property 2',
    location: 'Location 2',
    description: 'Description 2',
    images: ['image2.jpg'],
    postcode: 'NW1'
  }
];

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <DndContext>
        {component}
      </DndContext>
    </BrowserRouter>
  );
};

describe('SearchResults', () => {
  test('displays results count', () => {
    renderWithRouter(<SearchResults results={mockResults} />);
    expect(screen.getByText(/found 2 properties/i)).toBeInTheDocument();
  });

  test('displays singular form for one result', () => {
    renderWithRouter(<SearchResults results={[mockResults[0]]} />);
    expect(screen.getByText(/found 1 property/i)).toBeInTheDocument();
  });

  test('displays empty state when no results', () => {
    renderWithRouter(<SearchResults results={[]} />);
    expect(screen.getByText(/no properties found/i)).toBeInTheDocument();
  });

  test('renders all property cards', () => {
    renderWithRouter(<SearchResults results={mockResults} />);
    expect(screen.getByText('Property 1')).toBeInTheDocument();
    expect(screen.getByText('Property 2')).toBeInTheDocument();
  });
});

