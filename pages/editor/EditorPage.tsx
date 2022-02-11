import {
  Box,
  Container,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import Markdown from "../../components/editor/Markdown";

const EditorPage = () => {
  return (
    <>
      <Box minHeight="100vh" backgroundColor="gray.200">
        <Container pt={148} maxW="container.sm">
          <Box
            // padding={{ base: "28px" }}
            backgroundColor="white"
            // borderColor="gray.700"
            // border="1px"
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "md" }}
            minHeight={250}
          >
            <Markdown />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EditorPage;
