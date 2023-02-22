import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';



describe("Header", () => {
  it('should render title as "Delivery calculator"', () => {
      render(
          <App />
      );
      const h3Element = screen.getByRole('heading');
      expect(h3Element).toBeInTheDocument();
      expect(h3Element).toHaveTextContent(/Delivery Calculator/i);
  });
})
