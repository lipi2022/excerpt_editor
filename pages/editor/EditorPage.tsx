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
      <Box minHeight="100vh" backgroundColor="gray.100">
        <Container pt={148} maxW="container.sm">
          <Stack spacing="8">
            <Box
              padding={{ base: "28px" }}
              backgroundColor="white"
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
              minHeight={250}
            >
              <Markdown />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EditorPage;
