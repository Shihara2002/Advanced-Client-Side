import React from 'react';
import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@testing-library/jest-dom';
import PropertyCard from '../PropertyCard';

const mockProperty = {
  id: 1,
  type: 'house',
  price: 350000,
  bedrooms: 3,
  dateAdded: '2024-01-15',
  postcode: 'BR1',
  title: 'Test Property',
  description: 'Test description',
  location: 'Test Location',
  images: ['https://example.com/image.jpg']
};

describe('PropertyCard', () => {
  const mockToggleFavourite = jest.fn();

  test('renders property information correctly', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <PropertyCard 
          property={mockProperty} 
          isFavourite={false}
          onToggleFavourite={mockToggleFavourite}
        />
      </DndProvider>
    );

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  test('displays favourite button', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <PropertyCard 
          property={mockProperty} 
          isFavourite={false}
          onToggleFavourite={mockToggleFavourite}
        />
      </DndProvider>
    );

    const favouriteButton = screen.getByLabelText(/add to favourites/i);
    expect(favouriteButton).toBeInTheDocument();
  });
});
