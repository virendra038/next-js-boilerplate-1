import { Inter } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../components/authentication/login'
import SignUp from '../components/authentication/signup'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [login,setIsLogin] = useState(true)
  return (
    <>
      <ChakraProvider>
        {(login) ? <Login setIsLogin = {setIsLogin}/> : <SignUp setIsLogin = {setIsLogin}/>}
      </ChakraProvider>
    </>
  )
}
