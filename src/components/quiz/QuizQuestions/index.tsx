import Quiz from "@/types/quiz/QuizResponse";
import Question from "@/types/question/Question";
import QuizQuestion from "@/types/quiz/QuizQuestionResponse";
import {
  Button,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  Icon123,
  IconCircleCheck,
  IconCircleFilled,
  IconClock,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconListCheck,
  IconPlayerPlayFilled,
  IconShare3,
} from "@tabler/icons-react";
import React, { useState } from "react";

interface QuizQuestionProps {
  quizQuestion: QuizQuestion;
  question: Question;
  quiz: Quiz;
}

const QuizQuestions = ({ quizQuestion, question, quiz }: QuizQuestionProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  return (
    <Stack>
      <Flex justify="space-between" mt={10}>
        <Group gap={"xs"}>
          {<IconListCheck size={20} />}
          <Text>{quiz.totalQuestions} questions</Text>
        </Group>
        <Stack justify="space-between">
          <Group gap="sm" justify="flex-end">
            <Button
              variant="default"
              //   leftSection={<IconEye size={14} />}
              onClick={toggleAnswer}
            >
              {showAnswer ? (
                <IconEye size={20} style={{ paddingRight: "5px" }} />
              ) : (
                <IconEyeOff size={20} style={{ paddingRight: "5px" }} />
              )}
              {showAnswer ? "Show Answer" : " Hide Answer"}
            </Button>
            <Button
              variant="default"
              leftSection={<IconPlayerPlayFilled size={14} />}
            >
              Preview
            </Button>
          </Group>
        </Stack>
      </Flex>
      <Paper p="lg" radius="md" shadow="sm" mb="md">
        <Stack gap={20}>
          <Flex justify="space-between">
            <Text>
              {quizQuestion.quiz_id}. {quizQuestion.explain_answer}
            </Text>
            <Flex justify={"space-between"}>
              <Stack justify="space-between">
                <Group gap="sm" justify="flex-end">
                  <Button
                    variant="default"
                    leftSection={<IconClock size={14} />}
                  >
                    {question.duration} seconds
                  </Button>
                  <Button
                    variant="default"
                    leftSection={<IconCircleCheck size={14} />}
                  >
                    {question.point} points
                  </Button>
                </Group>
              </Stack>
            </Flex>
          </Flex>
        </Stack>

        <Text mt={20}>{question.content}</Text>
        <SimpleGrid cols={2} verticalSpacing="lg" mt={20}>
          <div>
            {<IconCircleFilled size={10} />}
            {question.answersMetadata}
          </div>
          <div>{question.answersMetadata}</div>
          <div>{question.answersMetadata}</div>
          <div>{question.answersMetadata}</div>
        </SimpleGrid>
      </Paper>
    </Stack>
  );
};

export default QuizQuestions;
