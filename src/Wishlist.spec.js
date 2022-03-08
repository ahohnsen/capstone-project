import { render, screen } from '@testing-library/react';
import Wishlist from './Wishlist';

describe('Wishlist', () => {
  it('renders wishlist with two sections', () => {
    const diveWishes = [
      { destination: 'Maldives', notes: '' },
      { destination: 'Lanzarote', notes: '' },
    ];
    render(<Wishlist diveWishes={diveWishes} />);

    const diveWish1 = screen.getByText('Maldives');
    const diveWish2 = screen.getByText('Lanzarote');

    expect(diveWish1).toBeInTheDocument();
    expect(diveWish2).toBeInTheDocument();
  });

  it('renders a message to the user when wishlist is empty', () => {
    const diveWishes = [];
    render(<Wishlist diveWishes={diveWishes} />);

    const message = screen.getByText(
      /You currently have nothing on your wishlist./i
    );

    expect(message).toBeInTheDocument();
  });
});
