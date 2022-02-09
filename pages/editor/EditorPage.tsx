import {
  Box,
  Container,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import Markdown from "../../components/editor/Markdown";

const EditorPage = () => {
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
            <Markdown></Markdown>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default EditorPage;
