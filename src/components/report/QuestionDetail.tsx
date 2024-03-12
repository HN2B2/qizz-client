import {
  Avatar,
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import QuestionReportPaper from "./QuestionReportPaper";
import { ParticipantResponse, QuestionReportResponse } from "@/types/report";

const AnswerDetailPaper = ({
  participant,
}: {
  participant: ParticipantResponse;
}) => {
  const [icon, setIcon] = useState(
    participant.correct ? <IconCheck /> : <IconX />
  );
  const [correctAnswer, setcorrectAnswer] = useState(
    participant.correct ? "Correct" : "Incorrect"
  );
  const [color, setColor] = useState(participant.correct ? "green" : "red");

  return (
    <Paper p="lg" radius="md" withBorder>
      <Stack>
        <Flex justify={"space-between"}>
          <Group>
            <Avatar src="/logo/logo-1-color.png" size={50} p={0} />
            <Stack gap={1} justify="space-between" h={"100%"}>
              <Stack gap={1}>
                <Title order={4}>{participant.displayName}</Title>
              </Stack>
            </Stack>
          </Group>
          <Group>
            <Text c={color}>{correctAnswer}</Text>
            <Text>Time: {participant.answerTime}</Text>
            <Divider />
            <Text>Point: {participant.score}</Text>
          </Group>
        </Flex>
        <Text>Response</Text>

        <Group>
          {JSON.parse(participant.answerMetadata).map((answer: string) => (
            <>
              <>{icon}</>
              <Text c={color}>{answer}</Text>
            </>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
};
const QuestionDetail = ({ question }: { question: QuestionReportResponse }) => {
  return (
    <Stack>
      <ScrollArea h={500}>
        <Stack>
          <QuestionReportPaper question={question} />
          {question.participants.map((participant) => (
            <AnswerDetailPaper participant={participant} />
          ))}
          {/* <AnswerDetailPaper participant={true} /> */}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default QuestionDetail;
