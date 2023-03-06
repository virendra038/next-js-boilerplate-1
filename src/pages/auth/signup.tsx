import React from 'react'
import { useState } from "react";
import SignInWithGoogle from '../../components/buttons/signInWithGoogle'
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
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function signUp() {
    const [showPassword, setShowPassword] = useState(false);
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

    const handleShowClick = () => setShowPassword(!showPassword);
    const onSubmit = ()=>{
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
                                    <Input type="email" name='email' onChange={onChangeInput} value={user.email} placeholder="email address" />
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
                                    <Text>{err}</Text>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="green"
                                width="full"
                            >
                                Continue
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="teal.500" href='/auth/login' >
                    Login
                </Link>
            </Box>
        </Flex>
    );

}

export default signUp