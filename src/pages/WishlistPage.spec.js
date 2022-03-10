import { render, screen } from '@testing-library/react';
import WishlistPage from './WishlistPage.js';

describe('Wishlist', () => {
  it('renders wishlist with two sections', () => {
    const diveWishes = [
      {
        id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
      },
      {
        id: '2',
        destination: 'Lanzarote',
        notes: 'I want to go there again soon to see my former colleauges.',
      },
    ];
    render(<WishlistPage diveWishes={diveWishes} />);

    const diveWish1 = screen.getByText('Maldives');
    const diveWish2 = screen.getByText('Lanzarote');

    expect(diveWish1).toBeInTheDocument();
    expect(diveWish2).toBeInTheDocument();
  });

  it('renders a message to the user when wishlist is empty', () => {
    const diveWishes = [];
    render(<WishlistPage diveWishes={diveWishes} />);

    const message = screen.getByText(
      /You currently have nothing on your wishlist./i
    );

    expect(message).toBeInTheDocument();
  });
});
