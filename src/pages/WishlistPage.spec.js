import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import WishlistPage from './WishlistPage.js';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('WishlistPage', () => {
  const sortedPosts = [
    {
      _id: '1',
      destination: 'Maldives',
      notes: 'I want to go there for my next diving holiday',
      isArchived: false,
    },
    {
      _id: '2',
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
      isArchived: false,
    },
  ];

  const onGetPosts = jest.fn();
  const setIsLoading = jest.fn();

  it('renders wishlist with two dive wishes', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={[...sortedPosts]}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Lanzarote');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('renders a heading with the name "Diving Wishlist" and a logout button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={[...sortedPosts]}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /Diving Wishlist/i });
    const buttonLogout = screen.getByRole('button', { name: /logout/i });

    expect(heading).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });

  it('renders a message to the user when wishlist is empty', () => {
    const sortedPosts = [];
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={sortedPosts}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const message = screen.getByText(
      /You currently have nothing on your wishlist./i
    );

    expect(message).toBeInTheDocument();
  });

  it('renders a heading and a button to go the archive when there is at least one archived dive wish', () => {
    const sortedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isArchived: false,
      },
      {
        _id: '2',
        destination: 'Lanzarote',
        notes: 'I want to go there again soon to see my former colleauges.',
        isArchived: true,
      },
    ];
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={sortedPosts}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: 'Archive' });
    const buttonArchive = screen.getByRole('button', { name: /archived/i });

    expect(heading).toBeInTheDocument();
    expect(buttonArchive).toBeInTheDocument();
  });

  it('renders a loading spinner while data is fetched from the database', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={[...sortedPosts]}
            isLoading={true}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const loadingSpinner = screen.getByText('Loading');

    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders an error message if data could not be fetched from the database', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <WishlistPage
            sortedPosts={[...sortedPosts]}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
            hasError={true}
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const message = screen.getByText(/Something went wrong/i);

    expect(message).toBeInTheDocument();
  });
});
