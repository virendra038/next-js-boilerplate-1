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
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



function inputForm({onChangeInput,user,err,onSubmit,login}:any) {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    return (
        <>
             <form role='form' onSubmit={onSubmit} >
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
                                    <Input type="email" placeholder="Email" name='email'  onChange={onChangeInput}/>
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
                                        onChange={onChangeInput}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {(login)?<FormHelperText textAlign="right">
                                    <Link>forgot password?</Link>
                                </FormHelperText>:<Text></Text>}
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="green"
                                width="full"
                            >
                               {login ? 'Login6666' : 'Continue'}
                            </Button>
                            <Text>{err}</Text>
                        </Stack>
                    </form>
        </>
    )
}

export default inputForm