import {
  Avatar,
  Button,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
  Progress,
  Divider,
  Paper,
  RingProgress,
  Grid,
} from "@mantine/core";
import {
  IconCheck,
  IconCheckbox,
  IconExclamationMark,
  IconPin,
  IconShieldCheckered,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import React from "react";
const Diagram = ({
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
    <Progress.Root size={"lg"} w={"90%"}>
      <Progress.Section
        value={(numberRight / numberQuestion) * 100}
        color="#00c985"
      ></Progress.Section>
      <Progress.Section
        value={(numberWrong / numberQuestion) * 100}
        color="#ef3c69"
      ></Progress.Section>
      <Progress.Section
        value={(numberNot / numberQuestion) * 100}
        color="#f5f5f5"
      ></Progress.Section>
    </Progress.Root>
  );
};
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
      size={70}
      sections={[{ value: 40, color: "blue" }]}
      thickness={7}
      label={
        <Text c="blue" fw={500} ta="center" size="md">
          {Math.round((numberRight / numberQuestion) * 100) + "%"}
        </Text>
      }
    />
  );
};

const AnswerDetailPaper = ({ isCorrect }: { isCorrect: boolean }) => {
  return (
    <Paper p="lg" radius="md" withBorder>
      <Stack>
        <Flex justify={"space-between"}>
          <Group>
            {isCorrect ? (
              <Button leftSection={<IconCheck />} variant="light" color="green">
                Correct
              </Button>
            ) : (
              <Button leftSection={<IconX />} variant="light" color="red">
                Incorrect
              </Button>
            )}

            <Button leftSection={<IconCheckbox />} variant="light" color="gray">
              loại câu hỏi
            </Button>
          </Group>
          <Group>
            <Group gap={2}>
              <Text fw={500}>{30}s</Text>
              <Text>time</Text>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={2}>
              <Text fw={500}>10</Text>
              <Text>point</Text>
            </Group>
          </Group>
        </Flex>
        <Text fw={500}>Câu hỏi ở đây</Text>
        <Grid>
          <Grid.Col span={5}>
            <Stack>
              <Text fw={300}>Response</Text>
              <Text>đáp án trả lời ở đây</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
            <Stack>
              {isCorrect ? (
                <Text fw={300} c={"green"}>
                  Correct Answer
                </Text>
              ) : (
                <Text fw={300} c={"green"}>
                  InCorrect Answer
                </Text>
              )}

              <Text>Đáp án đúng ở đây</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};
const ParticipantDetail = () => {
  return (
    <Stack>
      <ScrollArea h={500}>
        <Stack>
          <Flex justify={"space-between"}>
            <Group>
              <Avatar src="" size={50} radius="xl" />
              <Text fw={700}>Display name ở đây</Text>
            </Group>
            <Button leftSection={<IconTrash />} variant="light" p={5}>
              Delete
            </Button>
          </Flex>
          <Flex justify={"flex-start"}>
            <Text>Ngày làm quiz</Text>
          </Flex>
        </Stack>
        <Divider mt={30} mb={30} />
        <Flex justify={"center"}>
          <Diagram
            numberNot={1}
            numberRight={2}
            numberWrong={3}
            numberQuestion={6}
          />
        </Flex>
        <Flex justify={"center"} mt={10} gap={5}>
          <Button leftSection={<IconCheck />} variant="light" color="green">
            {2} Correct
          </Button>
          <Button leftSection={<IconX />} variant="light" color="red">
            {3} InCorrect
          </Button>
          <Button
            leftSection={<IconExclamationMark />}
            variant="light"
            color="gray"
          >
            {1} Unattempted
          </Button>
        </Flex>
        <Flex mt={30} gap={10} justify={"center"} mb={30}>
          <Paper withBorder p={5} radius="md" w={120} h={120}>
            <Stack gap={5} justify="center">
              <Group justify="center" p={0}>
                <Accuracy
                  numberNot={1}
                  numberRight={2}
                  numberWrong={3}
                  numberQuestion={6}
                />
              </Group>

              <Text ta={"center"}>Accuracy</Text>
            </Stack>
          </Paper>
          <Paper withBorder p={5} radius="md" w={120} h={120}>
            <Stack gap={10} justify="center" align="center">
              <Flex gap={0} align={"center"} justify={"center"}>
                {/* số câu đúng/tổng số câu hỏi */}
                <Text size="lg" fw={500}>
                  {2}
                </Text>
                <Text size="sm">/{6}</Text>
              </Flex>
              <Text ta={"center"}>Points</Text>
            </Stack>
          </Paper>
          <Paper withBorder p={5} radius="md" w={120} h={120}>
            <Stack gap={10} justify="center">
              <Text fw={500} ta={"center"}>
                Điểm nè
              </Text>
              <Text ta={"center"}>Score</Text>
            </Stack>
          </Paper>
        </Flex>
        <AnswerDetailPaper isCorrect={true} />
        <AnswerDetailPaper isCorrect={false} />
      </ScrollArea>
    </Stack>
  );
};

export default ParticipantDetail;
