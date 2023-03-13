import React from 'react'
import { useState } from "react";
import SignInWithGoogle from '../../components/buttons/signInWithGoogle'
import InputForm from '../../components/textController/inputForm';
import {
    Flex,
    Heading,
    Stack,
    Box,
    Link,
} from "@chakra-ui/react";

function signUp({login,setIsLogin}:any) {
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const [err,setErr] = useState('')

   const onChangeInput = (e:any) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
    setErr('')
   }

    
    const onSubmit = (e:any)=>{
        e.preventDefault();
        if(user.email ==='' && user.password ===''){
            setErr("Enter email and password");
        }
        else if(user.email === ''){
            setErr("Enter email");
        }
        else if(user.password === ''){
            setErr("Enter password");
        }
        else{
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!user.email.match(validRegex)){
                setErr('Enter a valid email address')
            }
        }
    }
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >

                <Box minW={{ base: "90%", md: "468px" }}>
                <InputForm onChangeInput={onChangeInput}  err={err} onSubmit={onSubmit} user={user} login={false}/>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="teal.500" href='/auth/login'>
                    Login
                </Link>
            </Box>
        </Flex>
    );

}

export default signUp