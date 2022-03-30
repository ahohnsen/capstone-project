import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import Searchbar from './Searchbar';

describe('Searchbar', () => {
  it('renders an input field with a search icon and the placeholder text "Search"', () => {
    render(<Searchbar />);

    const searchInput = screen.getByPlaceholderText('Search');
    const searchIcon = screen.getByAltText('magnifying glass');

    expect(searchInput).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('shows the search value in the input field', () => {
    render(<Searchbar searchValue="Maldives" />);

    const searchValue = screen.getByDisplayValue('Maldives');

    expect(searchValue).toBeInTheDocument();
  });

  it('calls the function to save the search value when user is typing into the search input field', () => {
    const onHandleSearchValue = jest.fn();

    render(<Searchbar onHandleSearchValue={onHandleSearchValue} />);

    const searchInput = screen.getByPlaceholderText('Search');
    userEvent.type(searchInput, 'Maldives');

    expect(onHandleSearchValue).toHaveBeenCalled();
  });
});
