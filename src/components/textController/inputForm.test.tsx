import { screen, render, fireEvent } from "@testing-library/react";
import InputForm from './inputForm';
import userEvent from '@testing-library/user-event';

const user = {
    email: 'email@example.com',
    password: 'password'
}

describe("Render the input form component", () => {
    
    it("Render the form component", () => {
        render(<InputForm user={user} />);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    })

    it('renders the form with email and password inputs', () => {
        render(<InputForm user={user} />);   
        expect(screen.getByPlaceholderText('email address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      });

    it('shows and hides password when show button is clicked', () => {
        render(<InputForm user={user} />);
        const passwordInput = screen.getByPlaceholderText('Password');
        const showButton = screen.getByText('Show');
        expect(passwordInput.type).toBe('password');
        fireEvent.click(showButton);
        expect(passwordInput.type).toBe('text');
        fireEvent.click(showButton);
        expect(passwordInput.type).toBe('password');
      });
      // it('submits the form with user credentials when Login button is clicked', async () => {
      //   const mockOnSubmit = jest.fn();
      //   render(<InputForm user={user} onSubmit={mockOnSubmit} />);
      //   const emailInput = screen.getByPlaceholderText('email address');
      //   const passwordInput = screen.getByPlaceholderText('Password');
      //   const loginButton = screen.getByText('Login');
       
      //   fireEvent.click(loginButton);
      //   expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      //   expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'email@example.com', password: 'password' });
      // });

      it('shows error message when there is an error', () => {
        const errorMessage = 'Invalid credentials';
        render(<InputForm user={user} err={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
})