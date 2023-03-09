import React from 'react';
import { render, screen } from '@testing-library/react';
import InputForm from '../components/textController/inputForm';
import SignUp from '../pages/auth/signup'

describe('InputForm', () => {

    it('renders Login',()=>{
        render(<SignUp/>)
    })


    it('renders the form with email and password inputs', () => {
        const mockOnChangeInput = jest.fn();
        const mockOnSubmit = jest.fn();

        render(
            <InputForm
                onChangeInput={mockOnChangeInput}
                onSubmit={mockOnSubmit}
                user={{ email: '', password: '' }}
                err=''
            />
        );
        expect(screen.getByPlaceholderText('email address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

 

    it('shows error message when there is an error', async () => {
        const mockOnChangeInput = jest.fn();
        const errorMessage = 'Invalid credentials';
        render(
            <InputForm
                onChangeInput={mockOnChangeInput}
                onSubmit={() => { }}
                user={{ email: '', password: '' }}
                err={errorMessage}
            />
        );
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

});
