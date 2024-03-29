import { QuizBank } from "@/types/quizBank";
import {
  Avatar,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
interface QuizzesProps {
  quizzes: QuizBank[];
}

const UserQuizzes = ({ quizzes }: QuizzesProps) => {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Stack gap={2}>
          <Paper p="sm" radius="md" shadow="sm" mb="md">
            <Text fw={500}>2 results</Text>
          </Paper>
          {quizzes.map((quiz) => (
            <Card
              p="xl"
              radius="md"
              shadow="sm"
              // mb="md"
              component="a"
              href={`/quiz/${quiz.id}`}
              mt={5}
            >
              {/* <Paper p="sm" radius="md" shadow="sm" mb="md"> */}
              <Card.Section>
                <Group>
                  <Avatar src={quiz.featuredImage} radius={"sm"} />
                  <Stack gap={2}>
                    <Text fw={500} size="lg">
                      {quiz.name}
                    </Text>
                    <Flex justify="space-between">
                      <Text size="sm">Question</Text>
                    </Flex>
                  </Stack>
                </Group>
              </Card.Section>

              {/* </Paper> */}
            </Card>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <Paper p="lg" radius="md" shadow="sm" mb="md"></Paper>
      </Grid.Col>
    </Grid>
  );
};

export default UserQuizzes;
