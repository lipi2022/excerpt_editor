import {
  Box,
  Container,
  HStack,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import styles from "../../styles/Home.module.css";
import Markdown from "../../components/editor/Markdown";

const EditorPage = () => {
  return (
    <Box minHeight="100vh" backgroundColor="gray.100">
      <Container pt="138px">
        <HStack spacing="8">
          <Box
            padding={{ base: "28px" }}
            backgroundColor="white"
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
            minW="600px"
            minHeight="300px"
          >
            <Markdown></Markdown>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default EditorPage;
