export const runtime = "experimental-edge"
import { UserLayout } from "@/components/layouts"

import { QuizInfo } from "@/components/quiz"
import QuizQuestions from "@/components/quiz/QuizQuestions"
import Question from "@/types/question/QuestionResponse"
import { UserResponse, UserStats } from "@/types/user"
import {
    Button,
    Container,
    Grid,
    Group,
    Menu,
    Paper,
    Stack,
    rem,
} from "@mantine/core"
import {
    IconDeviceDesktopStar,
    IconEdit,
    IconMessageCircle,
    IconSettings,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react"
import React, { useState } from "react"
import { QuestionType } from "@/types/question/QuestionType"
import { BankResponse } from "@/types/bank"
import QuestionResponse from "@/types/question/QuestionResponse"
import { GetServerSidePropsContext } from "next"
import { instance } from "@/utils"
import { useRouter } from "next/router"
import useUser from "@/hooks/useUser"
import { FavoriteResponse, UpvoteResponse } from "@/types/upvote"
import Link from "next/link"

interface Props {
    bankData: BankResponse
    questionData: QuestionResponse[]
    upvoteData: UpvoteResponse
    favoriteData: FavoriteResponse
}

const mockStats: UserStats = {
    totalQuizzes: 0,
    totalFavorites: 0,
}

export const checkEditable = (
    user: UserResponse | null,
    bank: BankResponse
) => {
    if (bank.createdBy?.id === user?.id) {
        return true
    }
    if (bank.quizPublicity && bank.publicEditable) return true
    if (
        bank.manageBanks?.find(
            (item) => item.user.id === user?.id && item.editable
        )
    ) {
        return true
    }
    return false
}

const StartQuizPage = ({
    bankData,
    questionData,
    upvoteData,
    favoriteData,
}: Props) => {
    const { user, loading } = useUser()
    const [bank, setBank] = useState<BankResponse>(bankData)

    return (
        <UserLayout>
            {/* <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
        <Grid.Col span={{ base: 12, md: 8, lg: 8, xs: 7 }}>
          
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 4, xs: 5 }}></Grid.Col>
      </Grid> */}
            <Container size="md">
                <QuizInfo
                    bank={bank}
                    setBank={setBank}
                    upvote={upvoteData}
                    like={favoriteData}
                />
                <Paper p="lg" radius="md" shadow="sm">
                    <Stack justify="space-between">
                        <Group gap="lg" justify="center">
                            <Menu shadow="md" width="20%">
                                <Menu.Target>
                                    <Button
                                        variant="gradient"
                                        gradient={{
                                            from: "blue",
                                            to: "cyan",
                                            deg: 90,
                                        }}
                                        size="md"
                                        style={{ width: "40%" }}
                                        p={0}
                                        leftSection={
                                            <IconDeviceDesktopStar size={25} />
                                        }
                                        rightSection={
                                            <IconTriangleInvertedFilled
                                                size={"0.7rem"}
                                            />
                                        }
                                    >
                                        Start Quiz
                                    </Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item
                                        component={Link}
                                        href={`/quiz/${bank.quizBankId}/live_quiz`}
                                        leftSection={
                                            <IconSettings
                                                style={{
                                                    width: rem(14),
                                                    height: rem(14),
                                                }}
                                            />
                                        }
                                    >
                                        Live quiz
                                    </Menu.Item>

                                    <Menu.Divider />
                                    <Menu.Item
                                        leftSection={
                                            <IconMessageCircle
                                                style={{
                                                    width: rem(14),
                                                    height: rem(14),
                                                }}
                                            />
                                        }
                                    >
                                        Test
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            {checkEditable(user, bank) && (
                                <Button
                                    variant="gradient"
                                    gradient={{
                                        from: "blue",
                                        to: "cyan",
                                        deg: 90,
                                    }}
                                    size="md"
                                    style={{ width: "40%" }}
                                    leftSection={<IconEdit size={25} />}
                                    component={Link}
                                    href={`/bank/${bankData.quizBankId}/edit`}
                                >
                                    Continue Edit
                                </Button>
                            )}
                        </Group>
                    </Stack>
                </Paper>
                <QuizQuestions questions={questionData} />
            </Container>
        </UserLayout>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const { req, query } = context

        const res = await instance
            .get(`bank/${query.bankId}`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()
        const res1 = await instance
            .get(`question/all/bankId/${query.bankId}`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()
        const res2 = await instance
            .get(`bank/upvote/${query.bankId}`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()
        const res3 = await instance
            .get(`bank/favorite/${query.bankId}`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()
        const bankData = res
        const questionData = res1
        const upvoteData = res2
        const favoriteData = res3
        return {
            props: {
                bankData,
                questionData,
                upvoteData,
                favoriteData,
            },
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default StartQuizPage
