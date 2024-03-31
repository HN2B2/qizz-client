import React, { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Link } from "@mantine/tiptap";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { TextEditor } from "@/components/common";
import classes from "./MultipleChoice.module.css";
import { useLocalStorage } from "@mantine/hooks";
import { useMyContext } from "@/pages/bank/[bankId]/edit/create";
interface Answer {
  answer: string;
  isCorrect: boolean;
}

// interface DataQuestionContext {
//   dataQuestion: Question;
//   setDataQuestion: React.Dispatch<React.SetStateAction<Question>>;
//   // handleIsCorrect: (checked: boolean, index: number) => void;
//   // handleAnswer: (value: string, index: number) => void;
//   // handleDelete: (index: number) => void;
//   handleQuestion: () => Promise<void>;
// }

const AnswerColor: Record<string, string> = {
  index1: "red",
  index2: "blue",
  index3: "yellow",
  index4: "green",
  index5: "orange",
};

const MultipleChoice = () => {
  const [data, setData] = useState<Answer[]>([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  const handleIsCorrect = (checked: boolean, index: number) => {
    const newData = [...data];
    newData[index].isCorrect = checked;
    setData(newData);
  };

  const handleAnswer = (value: string, index: number) => {
    const values = [...data];
    values[index].answer = value;

    setData(values);
  };
  const handleDelete = (index: number) => {
    //delete element at index index from data and setData for new data

    setData(data.filter((item, i) => i !== index));
  };

  // const [textValue, setTextValue] = useState<string>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
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
  // console.log(textValue);
  const { dataQuestion, updateDataQuestion } = useMyContext();
  // console.log(dataQuestion);
  useEffect(() => {
    let newData = dataQuestion;
    newData = {
      ...newData,
      // answersMetadata: `[${data
      //   .filter((answer) => answer.answer !== "")
      //   .map((answer, index) => `"${answer.answer}"`)
      //   .join(", ")}]`,

      // answersMetadata: `[${data
      //     .filter((answer) => answer.answer !== "")
      //     .map((answer, index) => `'${answer.answer}'`)
      //     .join(", ")}]`,

      answersMetadata: JSON.stringify(
        data
          .filter((answer) => answer.answer !== "")
          .map((answer) => answer.answer)
      ),
      // correctAnswersMetadata: `[${data
      //   .filter((answer) => answer.isCorrect)
      //   .map((answer) => `"${answer.answer}"`)
      //   .join(", ")}]`,

      // correctAnswersMetadata: `[${data
      //     .filter((answer) => answer.isCorrect)
      //     .map((answer) => `'${answer.answer}'`)
      //     .join(", ")}]`,
      correctAnswersMetadata: JSON.stringify(
        data.filter((answer) => answer.isCorrect).map((answer) => answer.answer)
      ),
    };
    updateDataQuestion(newData);
  }, [data]);

  return (
    <Container size={"lg"}>
      <Paper p={"lg"} radius={"lg"}>
        <Box mb={"md"}>
          <TextEditor editor={editor} />
        </Box>
        <Group justify={"space-between"} align={"center"} wrap="nowrap">
          <Group gap={16} grow justify="space-between" w={"100%"}>
            {data.map((answer, index) => (
              <Paper
                p={"xs"}
                h={{ base: 100, sm: 200, md: 300 }}
                w={"100%"}
                key={index}
                bg={AnswerColor[`index${index + 1}`]}
                radius={"md"}
              >
                <Group justify="space-between" my={"auto"}>
                  <Tooltip
                    label={
                      answer.answer === ""
                        ? "Answer cannot be empty"
                        : "Mark correct answer"
                    }
                  >
                    <Checkbox
                      color="rgb(0,0,0,0.2)"
                      variant="filled"
                      checked={answer.isCorrect || false}
                      onClick={(event) => {
                        handleIsCorrect(event.currentTarget.checked, index);
                      }}
                      disabled={answer.answer === ""}
                    />
                  </Tooltip>

                  {data.length > 2 && data.length <= 5 && (
                    <Button
                      p={4}
                      m={0}
                      variant="filled"
                      onClick={() => handleDelete(index)}
                      bg={"rgb(0,0,0,0.1)"}
                      h={"100%"}
                    >
                      <IconTrash size={"1rem"} />
                    </Button>
                  )}
                </Group>

                <Textarea
                  autosize
                  mt={8}
                  onChange={(event) =>
                    handleAnswer(event.currentTarget.value, index)
                  }
                  className="answer"
                  variant="unstyled"
                  p={8}
                  value={answer.answer}
                  minRows={5}
                  maxRows={5}
                  color={"white"}
                  placeholder="Type your answer here"
                  classNames={{ input: classes.input }}
                  size="xl"
                >
                  {answer.answer || ""}
                </Textarea>
              </Paper>
            ))}
          </Group>

          {data.length < 5 && (
            <ActionIcon
              variant="default"
              onClick={() =>
                setData([...data, { answer: "", isCorrect: false }])
              }
              w={20}
              h={20}
            >
              <IconPlus size={"1rem"} />
            </ActionIcon>
          )}
        </Group>
      </Paper>
    </Container>
  );
};

export default MultipleChoice;
