import { UserLayout } from "@/components/layouts";
import Quiz from "@/types/quiz/Quiz";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendar,
  IconEdit,
  IconMail,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
const mockQuiz: Quiz = {
  quizId: 1,
  mode: "Quiz",
  name: "Test 1",
  description: "ring",
  featuredImage: "",
  createdAt: "2022-10-10",
  // modifiedAt: string;
  // publicable: boolean;
  // publicEditable: boolean;
  category: "test",
  subcategory: "Math",
  // quizBank: QuizBank,
  bankId: 1,
  totalQuestions: 10,
  totalJoins: 10,
  createBy: "Quynh",
};
const ReportDetail = () => {
  const [quiz, setQuiz] = useState(mockQuiz);
  return (
    <UserLayout>
      <Stack>
        <Flex justify={"space-between"}>
          <Stack>
            <Group>
              <h2>{quiz.name}</h2>
              {<IconEdit />}
              <Button variant="default" size="sm">
                Completed
              </Button>
            </Group>
            <Group gap={4}>
              {<IconCalendar size={20} />}
              <Text>Started:</Text>
              {quiz.createdAt}
            </Group>
          </Stack>

          <Group>
            <Button variant="light">Live Dashboard</Button>
            <Button variant="light">Assign homework</Button>
          </Group>
        </Flex>
        <Paper p="lg" radius="md" shadow="sm">
          <Text>{quiz.mode}</Text>
          <Divider />
          <Stack>
            <Flex justify={"space-between"} mt={10}>
              <Paper p="sm" radius="md" withBorder>
                <Flex>
                  <Stack>
                    <Text>Accuracy</Text>
                    <Text></Text>
                  </Stack>
                </Flex>
              </Paper>
              <Paper p="sm" radius="md" withBorder>
                <Flex>
                  <Stack gap={10}>
                    <Text>Total Students</Text>
                    <Text>{quiz.totalJoins}</Text>
                  </Stack>
                </Flex>
              </Paper>
              <Paper p="sm" radius="md" withBorder>
                <Flex>
                  <Stack>
                    <Text>Question</Text>
                    <Text>{quiz.totalQuestions}</Text>
                  </Stack>
                </Flex>
              </Paper>
            </Flex>
            <Flex justify={"space-between"}>
              <Group>
                <Button variant="light">View quiz</Button>
              </Group>

              <Group>
                <Button variant="default" p={5}>
                  {<IconTrash />}
                </Button>
                <Divider orientation="vertical" />
                <Button variant="default" p={5} leftSection={<IconMail />}>
                  Email all parents
                </Button>
              </Group>
            </Flex>
          </Stack>
        </Paper>
        <Paper p="lg" radius="md" shadow="sm"></Paper>
      </Stack>
    </UserLayout>
  );
};

export default ReportDetail;
