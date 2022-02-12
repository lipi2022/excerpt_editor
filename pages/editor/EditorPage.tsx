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
      <Markdown />
    </>
  );
};

export default EditorPage;
