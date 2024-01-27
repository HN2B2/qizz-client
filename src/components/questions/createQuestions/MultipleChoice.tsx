import React, { useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Paper,
  Popover,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconPlus, IconTrash, IconX } from "@tabler/icons-react";
interface Answer {
  answer: string;
  isCorrect: boolean;
}

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
  return (
    <Container size={"lg"}>
      <Paper p={"xl"} radius={"lg"}>
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
                      radius={"lg"}
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
                  mt={4}
                  onChange={(event) =>
                    handleAnswer(event.currentTarget.value, index)
                  }
                  className="answer"
                  variant="unstyled"
                  p={"xs"}
                  bg={"rgb(0,0,0,0.2)"}
                  value={answer.answer}
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
