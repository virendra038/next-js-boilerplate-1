import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import '@/styles/global.css'
import Wrapper from '../utils/wrapper';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />,{wrapper:Wrapper})
  })
})
