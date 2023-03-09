import { Inter } from '@next/font/google'
import {ChakraProvider } from '@chakra-ui/react'
import Login from './auth/login'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [login,setIsLogin] = useState(true)
  return (
    <>
      <ChakraProvider>
        <Login login={login} setIsLogin={setIsLogin} />
      </ChakraProvider>
    </>
  )
}
