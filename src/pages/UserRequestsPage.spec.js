import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { MemoryRouter } from 'react-router-dom';
import UserRequestsPage from './UserRequestsPage';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('UserRequestsPage', () => {
  it('renders a page with the heading "Posts"', () => {
    const sortedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        isArchived: true,
        author: { fullname: 'John Doe', _id: 'john@doe.com', userId: '1' },
      },
      {
        _id: '2',
        destination: 'Galapagos Island',
        isArchived: false,
        author: { fullname: 'John Doe', _id: 'john@doe.com', userId: '1' },
      },
    ];

    render(
      <MemoryRouter>
        <AuthProvider>
          <UserRequestsPage sortedPosts={sortedPosts} />
        </AuthProvider>
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
