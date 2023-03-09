import { screen, render, fireEvent } from "@testing-library/react";
import InputForm from './inputForm';

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

      test('triggers onSubmit function when login button is clicked', () => {
        const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
        const { getByText } = render(<InputForm onSubmit={onSubmit} login={true}/>);
        const loginButton = getByText('Login');
        fireEvent.click(loginButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      test('triggers onSubmit function when continue button is clicked', () => {
        const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
        const { getByText } = render(<InputForm onSubmit={onSubmit} login={false}/>);
        const continueButton = getByText('Continue');
        fireEvent.click(continueButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      it('shows error message when there is an error', () => {
        const errorMessage = 'Invalid credentials';
        render(<InputForm user={user} err={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });


})