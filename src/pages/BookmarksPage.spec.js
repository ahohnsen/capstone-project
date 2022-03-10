import { render, screen } from '@testing-library/react';
import BookmarksPage from './BookmarksPage';

describe('BookmarksPage', () => {
  it('renders bookmark page with two bookmarked items', () => {
    const bookmarkedWishes = [
      {
        id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isBookmarked: true,
      },
      {
        id: '2',
        destination: 'Galapagos Island',
        notes: 'My dream destination but first I have to win the lottery.',
        isBookmarked: true,
      },
    ];
    render(<BookmarksPage bookmarkedWishes={bookmarkedWishes} />);

    const diveWish1 = screen.getByText('Maldives');
    const diveWish2 = screen.getByText('Galapagos Island');

    expect(diveWish1).toBeInTheDocument();
    expect(diveWish2).toBeInTheDocument();
  });

  describe('BookmarksPage', () => {
    it('renders a message to the user when there are no bookmarked items', () => {
      const bookmarkedWishes = [];

      render(<BookmarksPage bookmarkedWishes={bookmarkedWishes} />);

      const message = screen.getByText(/you/i);

      expect(message).toBeInTheDocument();
    });
  });
});
