import { useState } from "react";
import {
    Flex,
    Stack,
    Box,
    Link,
} from "@chakra-ui/react";
import InputForm from '../../components/textController/inputForm';


function login() {
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
        e.preventDefault()
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
        console.log(user);
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
                   <InputForm onChangeInput={onChangeInput}  err={err} onSubmit={onSubmit} user={user} login={true}/>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link color="teal.500" href='/auth/signup'>
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );

}

export default login