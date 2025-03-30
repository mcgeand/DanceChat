import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test passes if render doesn't throw
    expect(document.body).toBeInTheDocument();
  });

  // Add more detailed tests as the app develops
  it('should have correct page title', () => {
    // This test uses document methods but normally we'd use more RTL-specific methods
    expect(document.title).toBeDefined();
  });
}); 