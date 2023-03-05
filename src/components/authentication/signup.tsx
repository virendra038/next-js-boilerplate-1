import React from 'react'
import { useState } from "react";
import SignInWithGoogle from '../buttons/signInWithGoogle'
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Text,
    Divider,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function signUp({setIsLogin}:any) {
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const handleShowClick = () => setShowPassword(!showPassword);
    const onChangeInput = (e:any) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
        setError('')
       }

    const onSubmit = (e:any) =>{
        e.preventDefault();
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(user.email === ''){
            setError('Enter email address')
        }
        else{
            if(!user.email.match(validRegex)){
                setError('Enter valid email address')
            }
        }
        if(user.password === ''){
            setError('Enter password')
        }
        else{
            if(user.password.length<4){
                setError('Password must be at least 4 characters')
            }
        }
        
    };
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
                mb="4"
                justifyContent="center"
                alignItems="center"
            >

                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <Box mb='10px' h='170px'
                                display='flex'
                                textAlign="center"
                                alignItems="center"
                                flexDirection='column' justifyContent='spaceBetween'
                                gap='15px'
                            >
                                <Heading> Todo App </Heading>
                                <Text>Remember Everything important</Text>
                                <SignInWithGoogle/>
                                <Flex alignItems="center" my={4}>
                                    <Divider flex={1} borderColor="#cbd5e0" />
                                    <Text mx={4} fontWeight="bold" color="gray.500">
                                        or
                                    </Text>
                                    <Divider flex={1} borderColor="#cbd5e0" />
                                </Flex>
                            </Box>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="email" placeholder="email address" onChange={onChangeInput} value={user.email} name='email'/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name='password'
                                        value={user.password}
                                        onChange={onChangeInput}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="green"
                                width="full"
                                onClick={onSubmit}
                            >
                                Continue
                            </Button>
                            <Text
                            color='red'
                            textAlign='center'
                            fontWeight='bold'
                            >{error}</Text>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="teal.500" onClick={()=>setIsLogin(true)}>
                    Login
                </Link>
            </Box>
        </Flex>
    );

}

export default signUp