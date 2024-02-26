import { UserLayout } from "@/components/layouts";
import { instance } from "@/utils";
import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Input,
  Paper,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
const hour: number = new Date().getHours();
const LiveQuiz = () => {
  const router = useRouter();

  const [value, setValue] = useState<Date | null>(null);
  const clickOnSwitch = () => {
    return (
      <DateInput
        valueFormat="YYYY MMM DD"
        // label="Date input"
        placeholder="Date input"
      />
    );
  };
  const [checked, setChecked] = useState(false);

  // const router = useRouter();
  const handleCreateQuiz = async () => {
    try {
      const { data } = await instance.post(`/quiz/bankId/${router.query.id}`, {
        quizName: "Untitled quiz",
        description: "hehe",
        featuredImage: "hoho",
      });

      const { data: quizData } = await instance.put(
        `quiz/live_quiz/${data.quizId}`,
        {
          metadata: [
            {
              key: "setTime",
              value: "2012-04-23",
            },
            {
              key: "attempt",
              value: "10",
            },
            {
              key: "showAnswersDuringAct",
              value: "true",
            },
            {
              key: "showAnswersAfterAct",
              value: "false",
            },
            {
              key: "shuffleQuestions",
              value: "true",
            },
            {
              key: "shuffleAnswers",
              value: "true",
            },
            {
              key: "skipQuestion",
              value: "true",
            },
            {
              key: "powerUp",
              value: "true",
            },
            {
              key: "reactions",
              value: "true",
            },
            {
              key: "showLeaderboard",
              value: "true",
            },
          ],
        }
      );
      router.push(`/play/${data.code}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserLayout>
      <Container size="xs">
        <Paper p="lg" radius="md" shadow="sm">
          <Text style={{ fontWeight: "bold" }}>Set up quizzes</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Text style={{ fontWeight: "500" }}>
                Set a start time for the activity
              </Text>
              <Switch checked={checked} onChange={() => setChecked(!checked)} />
            </Flex>
            <Flex justify={"space-between"}>
              {checked ? clickOnSwitch() : null}
            </Flex>
          </Stack>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Participant attempts</Text>
          </Flex>
        </Paper>

        <Paper p="lg" radius="md" shadow="sm" mt={20}>
          <Text style={{ fontWeight: "bold" }}>Question and Answer</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"} gap={20} align="start">
              <Stack gap={5}>
                <Text style={{ fontWeight: "500" }}>
                  Show answers during activity
                </Text>
                <Text size="sm">
                  Show students the correct answers after each question.
                </Text>
              </Stack>

              <Input
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                pointer
                size="sm"
              >
                <option value="1">On</option>
                <option value="2">Validate only</option>
                <option value="3">Off</option>
              </Input>
            </Flex>
          </Stack>

          <Divider my="md" />

          <Flex justify={"space-between"} gap={20} align="start">
            <Stack gap={5}>
              <Text style={{ fontWeight: "500" }}>
                Show answers after activity
              </Text>
              <Text size="sm">
                Allow students to view answers after the quiz is submitted.
              </Text>
            </Stack>

            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              size="sm"
            >
              <option value="1">On</option>
              <option value="2">Question only</option>
              <option value="3">Off</option>
            </Input>
          </Flex>

          <Divider my="md" />
          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle questions</Text>
            <Switch />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle answer options</Text>
            <Switch />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"} gap={20} align="start">
            <Stack gap={5}>
              <Text style={{ fontWeight: "500" }}>Question Timer</Text>
              <Text size="sm">
                Students see a countdown and get extra points for each question
              </Text>
            </Stack>

            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              size="sm"
            >
              <option value="1">Default timer</option>
              <option value="2">Off</option>
            </Input>
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>
              Skip Questions & Attempt Later
            </Text>
            <Switch />
          </Flex>
        </Paper>

        <Paper p="lg" radius="md" shadow="sm" mt={20}>
          <Text style={{ fontWeight: "bold" }}>Gamification</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Stack gap={5}>
                <Text style={{ fontWeight: "500" }}>Power-ups</Text>
                <Text size="sm">
                  Students get bonus points and other fun abilities.
                </Text>
              </Stack>
              <Switch />
            </Flex>
            <Flex justify={"space-between"}>
              {checked ? clickOnSwitch() : null}
            </Flex>
          </Stack>

          <Divider my="md" />
        </Paper>

        <Button
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          mt={20}
          fullWidth
          size="xl"
          onClick={() => {
            handleCreateQuiz();
          }}
        >
          Continue
        </Button>
      </Container>
    </UserLayout>
  );
};

export default LiveQuiz;
