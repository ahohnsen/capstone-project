import { render, screen } from '@testing-library/react';
import Wishlist from './Wishlist';

describe('Wishlist', () => {
  it('renders wishlist withtwo sections', () => {
    const listItems = [
      { destination: 'Maldives', notes: '' },
      { destination: 'Lanzarote', notes: '' },
    ];
    render(<Wishlist listItems={listItems} />);

    const listItem1 = screen.getByText('Maldives');
    const listItem2 = screen.getByText('Lanzarote');

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
  });

  it('renders a message to the user when wishlist is empty', () => {
    const listItems = [];
    render(<Wishlist listItems={listItems} />);

    const message = screen.getByText(
      /You currently have nothing on your wishlist./i
    );

    expect(message).toBeInTheDocument();
  });
});
