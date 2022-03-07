import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('button calls callback-function when clicked', () => {
    const callback = jest.fn();
    render(<Button handleClick={callback} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(callback).toHaveBeenCalled();
  });
});
