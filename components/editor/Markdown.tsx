import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import isHotkey from "is-hotkey";
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
  Code,
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

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <Code>{children}</Code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const ToolbarClick = (format_name: string) => {
  console.log(format_name);
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
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
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [selectValue, setSelectValue] = useState("Paragraph");

  const [editor] = useState(() => withReact(withHistory(createEditor())));
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
        value={selectValue}
        onChange={(e) => isBlockActive(editor, e.target.value)}
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
                borderBottom="1px"
                borderBottomColor="gray.200"
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
                    renderLeaf={renderLeaf}
                    placeholder="Write some markdown..."
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                      for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                          event.preventDefault();
                          const mark = HOTKEYS[hotkey];
                          toggleMark(editor, mark);
                        }
                      }
                    }}
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
