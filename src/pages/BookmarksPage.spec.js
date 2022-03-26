import { render, screen } from '@testing-library/react';
import BookmarksPage from './BookmarksPage';

describe('BookmarksPage', () => {
  it('renders bookmark page with two bookmarked items', () => {
    const currentUserData = [
      {
        _id: 'jane@doe.com',
      },
    ];
    const bookmarkedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        isBookmarked: true,
        author: { fullname: 'John Doe', _id: 'john@doe.com' },
      },
      {
        _id: '2',
        destination: 'Galapagos Island',
        isBookmarked: true,
        author: { fullname: 'John Doe', _id: 'john@doe.com' },
      },
    ];
    render(
      <BookmarksPage
        bookmarkedPosts={bookmarkedPosts}
        currentUserData={currentUserData}
      />
    );

    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Galapagos Island');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('renders a message to the user when there are no bookmarked items', () => {
    const bookmarkedPosts = [];

    render(<BookmarksPage bookmarkedPosts={bookmarkedPosts} />);

    const message = screen.getByText(
      'You currently have nothing bookmarked. Start by marking your favorite posts.'
    );

    expect(message).toBeInTheDocument();
  });
});
