import React from 'react'
import { useState } from "react";
import InputForm from '../../components/textController/inputForm';
import {
    Flex,
    Stack,
    Box,
    Link,
} from "@chakra-ui/react";
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

function SignUp() {
    const router = useRouter();
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const [err,setErr] = useState('')

   const onChangeInput = (e:ChangeEvent<HTMLFormElement>) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
    setErr('')
   }

    
    const onSubmit = (e:ChangeEvent<HTMLFormElement>)=>{
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
            backgroundColor= "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >

                <Box minW={{ base: "90%", md: "468px" }}
                box-shadow= "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px">
                <InputForm onChangeInput={onChangeInput}  err={err} onSubmit={onSubmit} user={user} login={false}/>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="teal.500" onClick={()=>{
                    router.push('/auth/login',undefined
                    ,{shallow:true  })
                }}>
                    Login
                </Link>
            </Box>
        </Flex>
    );

}

export default SignUp