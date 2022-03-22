import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />);
    const loadingSpinner = screen.getByText('Loading');

    expect(loadingSpinner).toBeInTheDocument();
  });
});
