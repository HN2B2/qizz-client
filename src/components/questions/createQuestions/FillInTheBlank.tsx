import { TextEditor } from "@/components/common";
import { useMyContext } from "@/pages/bank/[bankId]/edit/create";
import { Question } from "@/types/question";
import {
  Box,
  Container,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

const FillInTheBlank = ({ question }: { question: Question }) => {
  const [answer, setAnswer] = useState<string>("");
  const { dataQuestion, updateDataQuestion } = useMyContext();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["center"],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Youtube.configure({
        inline: false,
        autoplay: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      let newData = dataQuestion;
      newData = {
        ...newData,
        content: editor.getHTML(),
      };
      updateDataQuestion(newData);
    },
  });

  // const answerForm = useForm({
  //   initialValues: {
  //     answer: "",
  //   },
  //   validate: {
  //     // regex validation
  //     answer: (value) =>
  //       /^[0-9a-zA-Z\s]{1,20}$/.test(value) ? null : "Invalid answer",
  //   },
  // });
  // console.log(answerForm.values);
  const handleChange = (value: string) => {
    let newData = dataQuestion;
    newData = {
      ...newData,
      correctAnswersMetadata: `["${value}"]`,
    };
    updateDataQuestion(newData);
  };
  console.log(dataQuestion);

  return (
    <Container size={"lg"}>
      <Paper p={"lg"} radius={"lg"}>
        <Box mb={"md"}>
          <TextEditor editor={editor} />
        </Box>
        <Group justify="center" mb={"md"}>
          <TextInput
            placeholder="Type answer here"
            w={"400px"}
            size="lg"
            // {...answerForm.getInputProps("answer")}
            maxLength={20}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Group>
        <Stack align="center">
          <Title order={5}>Player Preview</Title>
          <PinInput
            // length={answerForm.getInputProps("answer").value.length || 5}
            // value={answerForm.getInputProps("answer").value}
            length={dataQuestion.correctAnswersMetadata?.length - 4 || 5}
            value={dataQuestion.correctAnswersMetadata?.slice(
              2,
              dataQuestion.correctAnswersMetadata.length - 2
            )}
            placeholder=""
            type={/^[0-9a-zA-Z\s]{1,20}$/}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default FillInTheBlank;
