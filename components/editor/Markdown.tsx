import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import {
  Editor,
  Transforms,
  Range,
  Point,
  createEditor,
  Element as SlateElement,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";
import { BulletedListElement } from "./custom-types";
import {
  Heading,
  Box,
  List,
  HStack,
  VStack,
  UnorderedList,
  OrderedList,
  ListItem,
  Text,
  Select,
  Divider,
} from "@chakra-ui/react";
import {
  BlockquoteLeft,
  ListOl,
  ListUl,
  TypeBold,
  TypeItalic,
  CodeSlash,
  Link45deg,
  CardImage,
} from "@chakra-icons/bootstrap";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

const Markdown = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const [editor] = useState(() =>
    withShortcuts(withReact(withHistory(createEditor())))
  );
  // const editor = useMemo(
  //   () => withShortcuts(withReact(withHistory(createEditor()))),
  //   []
  // );

  return (
    <>
      <Box backgroundColor="white">
        <Box pb={2}>
          <HStack
            backgroundColor="gray.50"
            pl={4}
            pb={2}
            pt={2}
            color="gray.400"
          >
            <Select placeholder="Paragraph" width="110px" variant="unstyled">
              <option value="Paragraph">Paragraph</option>
              <option value="Heading 1">Heading 1</option>
              <option value="Heading 2">Heading 2</option>
              <option value="Heading 3">Heading 3</option>
              <option value="Heading 4">Heading 4</option>
              <option value="Heading 5">Heading 5</option>
            </Select>
            <Divider orientation="vertical"></Divider>
            <TypeBold boxSize="20px" />
            <TypeItalic boxSize="20px" />
            <Divider orientation="vertical"></Divider>
            <BlockquoteLeft boxSize="20px" />
            <Divider orientation="vertical"></Divider>
            <ListOl boxSize="20px" />
            <ListUl boxSize="20px" />
            <Divider orientation="vertical"></Divider>
            <CodeSlash boxSize="20px" />
            <Divider orientation="vertical"></Divider>
            <Link45deg boxSize="20px" />
            <CardImage boxSize="20px" />
          </HStack>
        </Box>
        <Box pl={4}>
          <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <Editable
              renderElement={renderElement}
              placeholder="Write some markdown..."
              spellCheck
              autoFocus
            />
          </Slate>
        </Box>
      </Box>
    </>
  );
};

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          const list: BulletedListElement = {
            type: "bulleted-list",
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      // todo: should define block quote attributes
      return (
        <Text
          backgroundColor="gray.50"
          border="1px"
          borderColor="gray.100"
          p="12px"
          {...attributes}
        >
          {children}
        </Text>
      );
    case "bulleted-list":
      return (
        <UnorderedList {...attributes}>
          <ListItem>{children}</ListItem>
        </UnorderedList>
      );
    case "heading-one":
      return (
        <Heading as="h1" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-three":
      return (
        <Heading as="h3" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-four":
      return (
        <Heading as="h4" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-five":
      return (
        <Heading as="h5" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-six":
      return (
        <Heading as="h6" {...attributes}>
          {children}
        </Heading>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    default:
      return <Text {...attributes}>{children}</Text>;
  }
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export default Markdown;
