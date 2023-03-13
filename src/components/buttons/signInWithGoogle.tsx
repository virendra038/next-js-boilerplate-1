import React from 'react'
import {
    Button,
    Icon,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

function signInWithGoogle() {
    return (
        <Button
            bg="#fff"
            color="#000"
            variant="outline"
            size="10lg"
            w='300px'
            p='8px'
            fontWeight="medium"
            border="2px solid #d5d5d5"
            borderRadius="10px"
            _hover={{ bg: "#f5f5f5" }}
            _active={{ bg: "#d5d5d5" }}
            leftIcon={
                <Icon
                    as={FaGoogle}
                    boxSize={6}
                    color="#DB4437"
                    _hover={{ color: "#fff", bg: "#DB4437" }}
                    css={{ borderRadius: "50%" }}
                />
            }
        >
            Continue with Google
        </Button>
    );
}

export default signInWithGoogle;