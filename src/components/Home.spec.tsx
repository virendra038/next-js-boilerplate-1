import { render, screen } from '@testing-library/react';
import Hello from './Home';

it('renders the home component',()=>{
    render(<Hello/>);
    const myElement = screen.getByText('Hello');
    expect(myElement).toBeInTheDocument();
})