import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Eriks Editor/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders button with text "New Document"', () => {
  render(<App />);
  const linkElement = screen.getByText(/New Document/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders drop-down list with text "Choose a document"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Choose a document/i);
  expect(linkElement).toBeInTheDocument();
});
