import { QuestionReportResponse } from "@/types/report";
import { BarChart } from "@mantine/charts";
import { Divider, Flex, Group, RingProgress, Stack, Text } from "@mantine/core";
import {
  IconCheck,
  IconCheckbox,
  IconTrophy,
  IconX,
} from "@tabler/icons-react";
import React from "react";

const Accuracy = ({
  numberRight,
  numberWrong,
  numberNot,
  numberQuestion,
}: {
  numberRight: number;
  numberWrong: number;
  numberNot: number;
  numberQuestion: number;
}) => {
  numberQuestion = numberRight + numberWrong + numberNot;
  return (
    <RingProgress
      size={50}
      sections={[{ value: 40, color: "blue" }]}
      label={
        <Text c="blue" fw={40} ta="center" size="sm">
          {Math.round((numberRight / numberQuestion) * 100) + "%"}
        </Text>
      }
      thickness={5}
    />
  );
};

const AnswerBarChart = ({
  numberChoosed,
  totalJoiner,
}: {
  numberChoosed: number;
  totalJoiner: number;
}) => {
  return (
    <BarChart
      p={0}
      h={30}
      data={[
        {
          choosed: numberChoosed,
          notchoosed: totalJoiner - numberChoosed,
        },
      ]}
      dataKey="month"
      type="stacked"
      orientation="vertical"
      tickLine="none"
      gridAxis="none"
      withXAxis={false}
      withYAxis={false}
      series={[
        { name: "choosed", color: "red.6" },
        { name: "notchoosed", color: "grey" },
      ]}
    />
  );
};

const AnswerDetail = ({
  numberChoosed,
  totalJoiner,
  content,
  correct,
}: {
  numberChoosed: number;
  totalJoiner: number;
  content: string;
  correct: boolean;
}) => {
  return (
    <Flex>
      {correct ? <IconCheck size={20} /> : <IconX size={20} />}
      <Text p={0}> {content}</Text>
      <AnswerBarChart numberChoosed={numberChoosed} totalJoiner={totalJoiner} />
    </Flex>
  );
};

const QuestionReportPaper = ({
  question,
}: {
  question: QuestionReportResponse;
}) => {
  const answersMetadata: string[] = JSON.parse(question.answersMetadata);
  const correctAnswersMetadata: string[] = JSON.parse(
    question.correctAnswersMetadata
  );
  const numberChoosed = question.participants.filter(
    (participant) => participant.correct
  ).length;
  const totalJoiner = question.participants.length;
  return (
    <>
      <Stack>
        <Flex justify={"space-between"}>
          <Group>
            <Group>
              <IconCheckbox></IconCheckbox>
              <Text> {question.type}</Text>
            </Group>
            <Group>
              <IconTrophy></IconTrophy>
              <Text>{question.point}</Text>
            </Group>
          </Group>
          <Group>
            <Accuracy
              numberRight={numberChoosed}
              numberWrong={totalJoiner - numberChoosed}
              numberNot={0}
              numberQuestion={totalJoiner}
            />
            <Text>Accuracy</Text>
          </Group>
        </Flex>

        <Divider />
        <Text>Question</Text>
        <Text>{question.content}</Text>
        <Group>
          <Stack w={"70%"}>
            <Text>Options</Text>
            {answersMetadata.map((answer) => (
              <AnswerDetail
                content={answer}
                numberChoosed={
                  question.participants.filter((participant) =>
                    JSON.parse(participant.answerMetadata).includes(answer)
                  ).length
                }
                totalJoiner={question.participants.length}
                correct={correctAnswersMetadata.includes(answer) ? true : false}
              />
            ))}
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={10} w={"25%"}>
            <Group justify="space-between">
              <Text>Correct</Text>
              <Text>Incorrect</Text>
            </Group>

            <AnswerBarChart
              numberChoosed={numberChoosed}
              totalJoiner={totalJoiner}
            ></AnswerBarChart>
          </Stack>
        </Group>
      </Stack>
    </>
  );
};

export default QuestionReportPaper;
