import { render, screen } from '@testing-library/react';
import BookmarksPage from './BookmarksPage';

describe('BookmarksPage', () => {
  it('renders bookmark page with two bookmarked items', () => {
    const bookmarkedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isBookmarked: true,
      },
      {
        _id: '2',
        destination: 'Galapagos Island',
        notes: 'My dream destination but first I have to win the lottery.',
        isBookmarked: true,
      },
    ];
    render(<BookmarksPage bookmarkedPosts={bookmarkedPosts} />);

    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Galapagos Island');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('renders a message to the user when there are no bookmarked items', () => {
    const bookmarkedPosts = [];

    render(<BookmarksPage bookmarkedPosts={bookmarkedPosts} />);

    const message = screen.getByText(
      'You currently have nothing bookmarked. Start by marking your favorite dive destinations.'
    );

    expect(message).toBeInTheDocument();
  });
});
