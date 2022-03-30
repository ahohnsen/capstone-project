import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import SearchPage from './SearchPage.js';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('SearchPage', () => {
  const sortedPosts = [
    {
      _id: '1',
      destination: 'Maldives',
      isArchived: false,
      author: { _id: 'john@doe.com', fullname: 'John Doe' },
    },
    {
      _id: '2',
      destination: 'Lanzarote',
      isArchived: false,
      author: { _id: 'john@doe.com', fullname: 'John Doe' },
    },
  ];

  const onGetPosts = jest.fn().mockImplementation(() => Promise.resolve());
  const setIsLoading = jest.fn();

  it('renders a header with a searchbar and a subheader to switch between searching for destinations or buddies"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SearchPage
            sortedPosts={[...sortedPosts]}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );
    const searchbar = screen.getByLabelText('Search');
    const searchCategoryDestination = screen.getByRole('button', {
      name: /destination/i,
    });
    const searchCategoryBuddies = screen.getByRole('button', {
      name: /buddies/i,
    });

    expect(searchbar).toBeInTheDocument();
    expect(searchCategoryDestination).toBeInTheDocument();
    expect(searchCategoryBuddies).toBeInTheDocument();
  });
  it('renders search page with two posts', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SearchPage
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

  it('renders a message to the user when there are no posts', () => {
    const sortedPosts = [];
    render(
      <MemoryRouter>
        <AuthProvider>
          <SearchPage
            sortedPosts={sortedPosts}
            isLoading={false}
            setIsLoading={setIsLoading}
            onGetPosts={onGetPosts}
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const message = screen.getByText(
      /There is currently nobody looking for a dive buddy./i
    );

    expect(message).toBeInTheDocument();
  });

  it('renders a loading spinner while data is fetched from the database', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SearchPage
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
          <SearchPage
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
