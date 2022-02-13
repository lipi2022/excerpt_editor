import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact, useSlate } from "slate-react";
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
  Button,
  Icon,
  Stack,
  Center,
  Container,
  useSlider,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  BlockquoteLeft,
  ListUl,
  TypeBold,
  TypeItalic,
  CodeSlash,
  Link45deg,
  CardImage,
  ListOl,
  ArrowsAngleContract,
  ArrowsAngleExpand,
  CloudUpload,
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

// const BlockButton = ({ format, icon }) => {
//   const editor = useSlate();
//   return (
//     <TypeBold
//       active={isBlockActive(editor, format)}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     ></TypeBold>
//   );
// };

const ToolbarClick = (format_name: string) => {
  console.log(format_name);
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Markdown = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const [expand, setExpand] = useState(false);

  const [editor] = useState(() =>
    withShortcuts(withReact(withHistory(createEditor())))
  );
  // const editor = useMemo(
  //   () => withShortcuts(withReact(withHistory(createEditor()))),
  //   []
  // );

  const SelectDropdown = () => {
    return (
      <Select
        width="110px"
        variant="unstyled"
        color="gray.400"
        _hover={{ color: "gray.800" }}
        onChange={(e) => ToolbarClick(e.target.value)}
      >
        <option value="Paragraph">Paragraph</option>
        <option value="Heading 1">Heading 1</option>
        <option value="Heading 2">Heading 2</option>
        <option value="Heading 3">Heading 3</option>
        <option value="Heading 4">Heading 4</option>
        <option value="Heading 5">Heading 5</option>
      </Select>
    );
  };

  const BoldButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "Bold")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "Bold");
        }}
        icon={<TypeBold boxSize="20px"></TypeBold>}
        _active={{ color: "gray.800" }}
        color="gray.400"
      ></IconButton>
    );
  };

  const ItalicButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "Italic")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "Italic");
        }}
        icon={<TypeItalic boxSize="20px"></TypeItalic>}
        _active={{ color: "gray.800" }}
        color="gray.400"
      ></IconButton>
    );
  };

  const BlockquoteLeftButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "block_quote_left")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "block_quote_left");
        }}
        icon={<BlockquoteLeft boxSize="20px"></BlockquoteLeft>}
        _active={{ color: "gray.800" }}
        color="gray.400"
      ></IconButton>
    );
  };

  const ListOlButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "list_ol")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "list_ol");
        }}
        icon={<BlockquoteLeft boxSize="20px"></BlockquoteLeft>}
        color="gray.400"
        _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };
  const ListUlButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "list_ul")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "list_ul");
        }}
        icon={<BlockquoteLeft boxSize="20px"></BlockquoteLeft>}
        color="gray.400"
        _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };
  const CodeSlashButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "code_slash")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "code_slash");
        }}
        icon={<CodeSlash boxSize="20px"></CodeSlash>}
        color="gray.400"
        _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };
  const Link45degButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "link45deg")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "link45deg");
        }}
        icon={
          <Link45deg
            fill="gray.400"
            // _hover={{ fill: "gray.800" }}
            boxSize="20px"
          ></Link45deg>
        }
        color="gray.400"
        _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };
  const CardImageButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "card_image")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "card_image");
        }}
        icon={
          <CardImage
            fill="gray.400"
            // _hover={{ fill: "gray.800" }}
            boxSize="20px"
          ></CardImage>
        }
        color="gray.400"
        _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };
  const CloudUploadButton = () => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "cloud_upload")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "cloud_upload");
        }}
        icon={<CloudUpload fill="gray.400" boxSize="18px"></CloudUpload>}
        color="gray.400"
        // _active={{ color: "gray.800" }}
      ></IconButton>
    );
  };

  type AngleProps = {
    expand_state: boolean;
  };

  const AngleContractButton: React.FC<AngleProps> = ({ expand_state }) => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "angle_contract")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "angle_contract");
        }}
        onClick={() => setExpand(expand_state)}
        icon={<ArrowsAngleContract boxSize="18px"></ArrowsAngleContract>}
        color="gray.400"
      ></IconButton>
    );
  };

  const AngleExpandButton: React.FC<AngleProps> = ({ expand_state }) => {
    return (
      <IconButton
        aria-label="format"
        isActive={isMarkActive(editor, "angle_expand")}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, "angle_expand");
        }}
        onClick={() => setExpand(expand_state)}
        icon={<ArrowsAngleExpand boxSize="18px"></ArrowsAngleExpand>}
        color="gray.400"
      ></IconButton>
    );
  };

  return (
    <>
      <Box minHeight="100vh" backgroundColor="gray.200">
        <Center pt={148}>
          <Box
            backgroundColor="white"
            height={expand ? 600 : 250}
            width={expand ? 800 : 600}
            boxShadow={{ base: "sm", sm: "md" }}
            borderRadius={{ base: "sm", sm: "md" }}
          >
            <VStack pb={2} align="stretch" alignItems="center" height="100%">
              <Box
                backgroundColor="gray.50"
                width="100%"
                height="60px"
                boxShadow={{ base: "sm", sm: "md" }}
              >
                <ButtonGroup
                  // backgroundColor="gray.50"
                  // size="sm"
                  // isAttached
                  pl={4}
                  // pb={1}
                  // pt={1}
                  // pr={4}
                  // minH={2}
                  width={expand ? 800 : 590}
                  variant="ghost"
                  // spacing={2}
                >
                  <Center>
                    <SelectDropdown></SelectDropdown>
                  </Center>

                  <Center>
                    <Divider orientation="vertical"></Divider>
                  </Center>
                  <ButtonGroup variant="ghost" isAttached>
                    <BoldButton></BoldButton>
                    <ItalicButton></ItalicButton>
                  </ButtonGroup>

                  <Center>
                    <Divider orientation="vertical"></Divider>
                  </Center>

                  <ButtonGroup variant="ghost" minH={2} isAttached>
                    <BlockquoteLeftButton />
                    <ListOlButton />
                    <ListUlButton />
                  </ButtonGroup>

                  <Center>
                    <Divider orientation="vertical"></Divider>
                  </Center>

                  <ButtonGroup variant="ghost" isAttached>
                    <CodeSlashButton />
                    <Link45degButton />
                    <CardImageButton />
                  </ButtonGroup>

                  <Center>
                    <Divider orientation="vertical"></Divider>
                  </Center>

                  <ButtonGroup variant="ghost" isAttached>
                    {expand ? (
                      <AngleContractButton expand_state={false} />
                    ) : (
                      <AngleExpandButton expand_state={true} />
                    )}
                    <CloudUploadButton />
                  </ButtonGroup>
                </ButtonGroup>
              </Box>
              <Box pl={4} width="100%" backgroundColor="white" height="100%">
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
            </VStack>
          </Box>
        </Center>
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
