import { render, screen } from '@testing-library/react';
import MyRouter from './Router';

test('renders learn react link', () => {
  render(<MyRouter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
