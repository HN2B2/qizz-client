import { UserLayout } from "@/components/layouts";
import { getServerErrorNoti, instance } from "@/utils";
import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Highlight,
  Input,
  NativeSelect,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IoInformationCircleOutline } from "react-icons/io5";

const hour: number = new Date().getHours();
const LiveQuiz = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [attempt, setAttempt] = useState<string | null>("Unlimited");
  const [showAnswersDuringAct, setShowAnswersDuringAct] = useState(true);
  const [showAnswersAfterAct, setShowAnswersAfterAct] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [skipQuestion, setSkipQuestion] = useState(false);
  const [powerUp, setPowerUp] = useState(false);
  const [reactions, setReactions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const dataAttempts = ["Unlimited", "1", "2", "3", "4", "5"];

  const form = useForm({
    initialValues: {
      attempt: attempt,
      showAnswersDuringAct: showAnswersDuringAct,
      showAnswersAfterAct: showAnswersAfterAct,
      shuffleQuestions: shuffleQuestions,
      shuffleAnswers: shuffleAnswers,
      skipQuestion: skipQuestion,
      powerUp: powerUp,
      reactions: reactions,
      showLeaderboard: showLeaderboard,
    },
  });
  const handleCreateQuiz = async () => {
    try {
      const { data } = await instance.post(`/quiz/bankId/${router.query.id}`, {
        quizName: "Untitled quiz",
        description: "hehe",
        featuredImage: "hoho",
      });

      const body = {
        metadata: [
          {
            key: "attempt",
            value: form.values.attempt,
          },
          {
            key: "showAnswersDuringAct",
            value: form.values.showAnswersDuringAct,
          },
          {
            key: "showAnswersAfterAct",
            value: form.values.showAnswersAfterAct,
          },
          {
            key: "shuffleQuestions",
            value: form.values.shuffleQuestions,
          },
          {
            key: "shuffleAnswers",
            value: form.values.shuffleAnswers,
          },
          {
            key: "skipQuestion",
            value: form.values.skipQuestion,
          },
          {
            key: "powerUp",
            value: form.values.powerUp,
          },
          {
            key: "reactions",
            value: form.values.reactions,
          },
          {
            key: "showLeaderboard",
            value: form.values.showLeaderboard,
          },
        ],
      };
      const { data: quizData } = await instance.put(
        `quiz/live_quiz/${data.quizId}`,
        body
      );
      notifications.show({
        title: "Success",
        message: "Create live quiz successfully",
        color: "green",
      });
      router.push(`/monitor/${data.code}`);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getServerErrorNoti(error),
        color: "red",
      });
    }
  };

  return (
    <UserLayout>
      <Container size="xs">
        <Paper p="lg" radius="md" shadow="sm">
          <Text style={{ fontWeight: "bold" }}>Set up quizzes</Text>
          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Participant attempts</Text>
            <Select
              value={attempt}
              onChange={(event) => {
                setAttempt(event);
                form.setFieldValue("attempt", event);
              }}
              data={dataAttempts}
            />
          </Flex>
          <Text mt="md" size="sm">
            How many times a student can attempt the activity.
          </Text>
          <Text mt="md" size="sm">
            Participants will be{" "}
            <Highlight
              component="a"
              target="_blank"
              highlight=""
              fw={500}
              c="red"
            >
              required to login
            </Highlight>{" "}
            to limit attempts for quiz
          </Text>
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
              <Switch
                checked={showAnswersDuringAct}
                onClick={() => setShowAnswersDuringAct(!showAnswersDuringAct)}
                onChange={() =>
                  form.setFieldValue(
                    "showAnswersDuringAct",
                    !showAnswersDuringAct
                  )
                }
              />
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
            <Switch
              onClick={() => setShowAnswersAfterAct(!showAnswersAfterAct)}
              onChange={() =>
                form.setFieldValue("showAnswersAfterAct", !showAnswersAfterAct)
              }
            />
          </Flex>

          <Divider my="md" />
          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle questions</Text>
            <Switch
              onClick={() => setShuffleQuestions(!shuffleQuestions)}
              onChange={() =>
                form.setFieldValue("shuffleQuestions", !shuffleQuestions)
              }
            />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle answer options</Text>
            <Switch
              onClick={() => setShuffleAnswers(!shuffleAnswers)}
              onChange={() =>
                form.setFieldValue("shuffleAnswers", !shuffleAnswers)
              }
            />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>
              Skip Questions & Attempt Later
            </Text>
            <Switch
              onClick={() => setSkipQuestion(!skipQuestion)}
              onChange={() => form.setFieldValue("skipQuestion", !skipQuestion)}
            />
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
              <Switch
                onClick={() => setPowerUp(!powerUp)}
                onChange={() => form.setFieldValue("powerUp", !powerUp)}
              />
            </Flex>
          </Stack>

          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Text style={{ fontWeight: "500" }}>Student live reactions</Text>
              <Switch
                onClick={() => setReactions(!reactions)}
                onChange={() => form.setFieldValue("reactions", !reactions)}
              />
            </Flex>
          </Stack>

          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Text style={{ fontWeight: "500" }}>Show leaderboard</Text>
              <Switch
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                onChange={() =>
                  form.setFieldValue("showLeaderboard", !showLeaderboard)
                }
              />
            </Flex>
          </Stack>
        </Paper>

        <Button
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          mt={20}
          fullWidth
          size="md"
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
