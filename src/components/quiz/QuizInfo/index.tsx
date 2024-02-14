import Quiz from "@/types/quiz/QuizResponse";
import { UserResponse, UserStats } from "@/types/user";
import {
  Avatar,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBook, IconEdit, IconShare3 } from "@tabler/icons-react";

interface QuizInfoProps {
  quiz: Quiz;
}

const QuizInfo = ({ quiz }: QuizInfoProps) => {
  return (
    <Paper p="lg" radius="md" shadow="sm" mb="md">
      <Stack gap={20}>
        <Flex justify="space-between">
          <Group gap="xl" align="start">
            <Avatar src="" size={142} radius="sm" />
            <Stack gap={5}>
              <Text>{quiz.mode}</Text>
              <Title order={3}>{quiz.name}</Title>

              <SimpleGrid cols={2} verticalSpacing="xs" spacing={"xs"}>
                <Text size="xs">
                  {<IconBook size={10} />} {quiz.category}
                </Text>
                <Text size="xs">
                  {<IconBook size={10} />} {quiz.subcategory}
                </Text>
                <Text size="xs">
                  {<IconBook size={10} />} {quiz.totalJoins}
                </Text>
              </SimpleGrid>
            </Stack>
          </Group>
        </Flex>
        <Flex justify={"space-between"}>
          <Group gap="xs" align="start">
            <Avatar src="" size={50} />
            <Stack gap={5}>
              <Text size="xs"> {quiz.createBy}</Text>
              <Text size="xs"> {quiz.createdAt}</Text>
            </Stack>
          </Group>
          <Stack justify="space-between">
            <Group gap="sm" justify="flex-end">
              <Button variant="default" leftSection={<IconShare3 size={14} />}>
                Share profile
              </Button>
              <Button variant="default" leftSection={<IconEdit size={14} />}>
                Edit profile
              </Button>
            </Group>
          </Stack>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default QuizInfo;
