import { UserLayout } from "@/components/layouts";

import { QuizInfo } from "@/components/quiz";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import Quiz from "@/types/quiz/QuizResponse";
import Question from "@/types/question/QuestionResponse";
// import QuizQuestion from "@/types/quiz/QuizQuestionResponse";
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

interface Props {
  bankData: BankResponse;
  questionData: QuestionResponse[];
}

// const mockQuiz: Quiz = {
//   quizId: 1,
//   mode: "Quiz",
//   name: "Test 1",
//   description: "ring",
//   featuredImage: "",
//   createdAt: "2022-10-10",
//   // modifiedAt: string;
//   // publicable: boolean;
//   // publicEditable: boolean;
//   category: "test",
//   subcategory: "Math",
//   // quizBank: QuizBank,
//   bankId: 1,
//   totalQuestions: 10,
//   totalJoins: 10,
//   createBy: "Quynh",
// };

const mockQuestion: Question = {
  questionId: 1,
  content:
    "ringdkfkeruhgfoiuehfowiehfoewjgehgoehgeigoergherihgdsgdsrgrihfgoewihfowiehgoiewhf",
  point: 10,
  duration: 10,
  type: QuestionType.MULTIPLE_CHOICE,
  answersMetadata: "A. dsj",
  correctAnswersMetadata: "A. ajdj",
  explainAnswer: "ring",
  questionIndex: 1,
  createdAt: "2022-10-10",
  modifiedAt: "2022-10-10",
  disabled: false,
  quizBankId: 1,
};

// const mockQuizQuestion: QuizQuestion = {
//   quiz_question_id: 1,
//   point: 10,
//   explain_answer: "ring",
//   createdAt: "2022-10-10",
//   modifiedAt: "2022-10-10",
//   quiz_id: 1,
//   question_id: 1,
// };

const mockStats: UserStats = {
  totalQuizzes: 0,
  totalFavorites: 0,
};

// const router = useRouter();
// const handleLiveQuiz = () => {
//   router.push("/profile");
// };
const StartQuizPage = ({ bankData, questionData }: Props) => {
  // const [quizzes, setQuizzes] = useState(mockQuiz);
  // const [quizQuestion, setQuizQuestion] = useState(mockQuizQuestion);
  const [question, setQuestion] = useState(mockQuestion);

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
                  >
                    Edit profile
                  </Button>
                </Group>
              </Stack>
            </Paper>
            <QuizQuestions
              // quizQuestion={quizQuestion}
              questions={questionData}

              // quiz={quizzes}
            />
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

    const res = await instance.get(`/bank/${query.quiz_id}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const res1 = await instance.get(`/question/all/bankId/${query.quiz_id}`, {
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
