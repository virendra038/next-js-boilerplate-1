import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Link, ChakraProvider } from '@chakra-ui/react'
import Login from './auth/login'
import SignUp from './auth/signup'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [login,setIsLogin] = useState(true)
  return (
    <>
      <ChakraProvider>
        <Login/>
      </ChakraProvider>
    </>
  )
}
