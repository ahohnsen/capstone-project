import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { MemoryRouter } from 'react-router-dom';
import BookmarksPage from './BookmarksPage';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('BookmarksPage', () => {
  it('renders bookmark page with two bookmarked items', () => {
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
      <MemoryRouter>
        <AuthProvider>
          <BookmarksPage bookmarkedPosts={bookmarkedPosts} />
        </AuthProvider>
      </MemoryRouter>
    );

    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Galapagos Island');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('renders a message to the user when there are no bookmarked items', () => {
    const bookmarkedPosts = [];

    render(
      <MemoryRouter>
        <AuthProvider>
          <BookmarksPage bookmarkedPosts={bookmarkedPosts} />
        </AuthProvider>
      </MemoryRouter>
    );

    const message = screen.getByText(
      'You currently have nothing bookmarked. Start by marking your favorite posts.'
    );

    expect(message).toBeInTheDocument();
  });
});
