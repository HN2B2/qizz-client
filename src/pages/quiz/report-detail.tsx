import { UserLayout } from "@/components/layouts";
import { Participants } from "@/components/quiz";
import Quiz from "@/types/quiz/Quiz";
import {
  Modal,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  rem,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark, IconTargetArrow } from "@tabler/icons-react";
import {
  IconCalendar,
  IconEdit,
  IconMail,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash,
  IconUsersGroup,
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
  const iconStyle = { width: rem(12), height: rem(12) };
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(quiz.name);
  const handleIconClick = () => {
    setEditing(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleSave = async () => {
    try {
      // const updatedName = await saveQuizNameToBackend(editedName);
      setEditing(false); // Turn off editing mode
      setQuiz({ ...quiz, name: editedName }); // Update the quiz name in the state
    } catch (error) {
      // Handle error
    }
  };

  return (
    <UserLayout>
      <Stack>
        <Flex justify={"space-between"}>
          <Stack>
            <Group>
              {editing ? (
                <input value={editedName} onChange={handleNameChange} />
              ) : (
                <h2>{quiz.name}</h2>
              )}
              <UnstyledButton onClick={handleIconClick}>
                {<IconEdit />}
              </UnstyledButton>
              {editing && (
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save
                </Button>
              )}
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
              <Paper p="sm" radius="md" withBorder w={"20%"}>
                <Group>
                  <IconTargetArrow />
                  <Stack gap={5}>
                    <Text>Accuracy</Text>
                    <Text>20%</Text>
                  </Stack>
                </Group>
              </Paper>
              <Paper p="sm" radius="md" withBorder w={"20%"}>
                <Group>
                  <IconUsersGroup />
                  <Stack gap={5}>
                    <Text>Total Students</Text>
                    <Text>{quiz.totalJoins}</Text>
                  </Stack>
                </Group>
              </Paper>
              <Paper p="sm" radius="md" withBorder w={"20%"}>
                <Group>
                  <IconQuestionMark />
                  <Stack gap={5}>
                    <Text>Question</Text>
                    <Text>{quiz.totalQuestions}</Text>
                  </Stack>
                </Group>
              </Paper>
            </Flex>
            <Flex justify={"space-between"}>
              <Group>
                <Button variant="light">View quiz</Button>
              </Group>

              <Group>
                <Button variant="default" p={5} onClick={open}>
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
        <Paper p="lg" radius="md" shadow="sm">
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab
                value="participants"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Participants
              </Tabs.Tab>
              <Tabs.Tab
                value="questions"
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Questions
              </Tabs.Tab>
              <Tabs.Tab
                value="overview"
                leftSection={<IconSettings style={iconStyle} />}
              >
                Overview
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="participants">
              <Participants />
            </Tabs.Panel>

            <Tabs.Panel value="questions">Messages tab content</Tabs.Panel>

            <Tabs.Panel value="overview">Settings tab content</Tabs.Panel>
          </Tabs>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to delete this report?"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex
          mih={50}
          gap="md"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button variant="light">Cancel</Button>
          <Button variant="light" color="red">
            Delete
          </Button>
        </Flex>
      </Modal>
    </UserLayout>
  );
};

export default ReportDetail;
