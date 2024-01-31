import { IconPhoto } from "@tabler/icons-react";
import { Editor, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import {
  RichTextEditor,
  Link,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { useState } from "react";
import { Popover, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const ImageControls = () => {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={
        // select image from computer
        () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              const imageUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              });
              editor?.chain().focus().setImage({ src: imageUrl }).run();
            }
          };
        }
      }
    >
      <IconPhoto size="1rem" stroke={1.5} />
    </RichTextEditor.Control>
  );
};

const YoutubeControls = ({
  toggleYoutubeInput,
}: {
  toggleYoutubeInput: () => void;
}) => {
  const { editor } = useRichTextEditorContext();
  const handleToggle = () => {
    toggleYoutubeInput();
  };
  return (
    <RichTextEditor.Control
      onClick={() => handleToggle()}
    ></RichTextEditor.Control>
  );
};

const TextEditor = ({ editor }: { editor: Editor | null }) => {
  const [youtubeInputOpened, { toggle: toggleYoutubeInput }] =
    useDisclosure(false);
  return (
    <RichTextEditor editor={editor} mih={240}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
          <ImageControls />
          {/* <Popover
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <YoutubeControls toggleYoutubeInput={toggleYoutubeInput} />
            </Popover.Target>
            <Popover.Dropdown>
              <TextInput placeholder="john@doe.com" size="xs" mt="xs" />
            </Popover.Dropdown>
          </Popover> */}
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default TextEditor;
