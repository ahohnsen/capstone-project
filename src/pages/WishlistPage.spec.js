import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WishlistPage from './WishlistPage.js';

describe('Wishlist', () => {
  it('renders wishlist with two sections', () => {
    const diveWishes = [
      {
        id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isArchived: false,
      },
      {
        id: '2',
        destination: 'Lanzarote',
        notes: 'I want to go there again soon to see my former colleauges.',
        isArchived: false,
      },
    ];
    render(
      <MemoryRouter>
        <WishlistPage diveWishes={diveWishes} />
      </MemoryRouter>
    );

    const diveWish1 = screen.getByText('Maldives');
    const diveWish2 = screen.getByText('Lanzarote');

    expect(diveWish1).toBeInTheDocument();
    expect(diveWish2).toBeInTheDocument();
  });

  it('renders a message to the user when wishlist is empty', () => {
    const diveWishes = [];
    render(
      <MemoryRouter>
        <WishlistPage diveWishes={diveWishes} />
      </MemoryRouter>
    );

    const message = screen.getByText(
      /You currently have nothing on your wishlist./i
    );

    expect(message).toBeInTheDocument();
  });

  it('renders a heading and a button to go the archive when there is at least one archived dive wish', () => {
    const diveWishes = [
      {
        id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isArchived: false,
      },
      {
        id: '2',
        destination: 'Lanzarote',
        notes: 'I want to go there again soon to see my former colleauges.',
        isArchived: true,
      },
    ];
    render(
      <MemoryRouter>
        <WishlistPage diveWishes={diveWishes} />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: 'Archive' });
    const buttonArchive = screen.getByRole('button', { name: /archived/i });

    expect(heading).toBeInTheDocument();
    expect(buttonArchive).toBeInTheDocument();
  });
});
