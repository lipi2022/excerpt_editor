import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import { OAuthButtons } from "../../components/auth/OAuthButtons";
import { PasswordField } from "../../components/auth/PasswordField";
import { app } from "../../lib/auth/googleAuth";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const App = () => {
  const [token, setToken] = useState("");

  const handleAuth = (name) => {
    if (name === "Google") {
      // object.name why?
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(token, user);
          setToken(token);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  };

  // useEffect(() => {
  //   console.log("useeffect");
  // }, []);

  return (
    <Box
      bg={mode(
        useBreakpointValue({ base: "white", sm: "gray.50" }),
        "gray.800"
      )}
    >
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                Log in to your account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text>Don not have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  Sign up
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={mode(
              "white",
              useBreakpointValue({ base: "inherit", sm: "gray.700" })
            )}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultIsChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary">Sign in</Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtons handleAuth={handleAuth} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
