import { UserLayout } from "@/components/layouts";

import { QuizInfo } from "@/components/quiz";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import Question from "@/types/question/QuestionResponse";
import { UserStats } from "@/types/user";

import {
  Button,
  Container,
  Grid,
  Group,
  Menu,
  Paper,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconDeviceDesktopStar,
  IconEdit,
  IconMessageCircle,
  IconSettings,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { QuestionType } from "@/types/question/QuestionType";
import { BankResponse } from "@/types/bank";
import QuestionResponse from "@/types/question/QuestionResponse";
import { GetServerSidePropsContext } from "next";
import { instance } from "@/utils";
import { useRouter } from "next/router";

interface Props {
  bankData: BankResponse;
  questionData: QuestionResponse[];
}

const mockStats: UserStats = {
  totalQuizzes: 0,
  totalFavorites: 0,
};

const StartQuizPage = ({ bankData, questionData }: Props) => {
  
  return (
    <UserLayout>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
        <Grid.Col span={{ base: 12, md: 8, lg: 8, xs: 7 }}>
          <Container size="xl">
            <QuizInfo quiz={bankData} />
            <Paper p="lg" radius="md" shadow="sm">
              <Stack justify="space-between">
                <Group gap="md" justify="center">
                  <Menu shadow="md" width="22%">
                    <Menu.Target>
                      <Button
                        variant="gradient"
                        gradient={{
                          from: "blue",
                          to: "cyan",
                          deg: 90,
                        }}
                        size="xl"
                        style={{ width: "45%" }}
                        p={0}
                      >
                        <Grid>
                          <Grid.Col span={2}>
                            <IconDeviceDesktopStar />
                          </Grid.Col>
                          <Grid.Col span={8}>Start Quiz</Grid.Col>
                          <Grid.Col span={2} style={{ alignItems: "right" }}>
                            <IconTriangleInvertedFilled size={10} />
                          </Grid.Col>
                        </Grid>
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        component="a"
                        href={`/quiz/${bankData.quizBankId}/live_quiz`}
                        leftSection={
                          <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        // onClick={handleLiveQuiz}
                      >
                        Live quiz
                      </Menu.Item>

                      <Menu.Divider />
                      <Menu.Item
                        leftSection={
                          <IconMessageCircle
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Test
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                  <Button
                    variant="gradient"
                    gradient={{
                      from: "blue",
                      to: "cyan",
                      deg: 90,
                    }}
                    size="xl"
                    style={{ width: "45%" }}
                    leftSection={<IconEdit size={25} />}
                    component="a"
                    href={`/bank/${bankData.quizBankId}/edit`}
                  >
                    Continue Edit
                  </Button>
                </Group>
              </Stack>
            </Paper>
            <QuizQuestions questions={questionData} />
          </Container>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 4, xs: 5 }}></Grid.Col>
      </Grid>
    </UserLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;

    const res = await instance.get(`/bank/${query.bankId}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const res1 = await instance.get(`/question/all/bankId/${query.bankId}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const bankData = res.data;
    const questionData = res1.data;
    return {
      props: {
        bankData,
        questionData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default StartQuizPage;
