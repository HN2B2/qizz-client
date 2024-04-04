export const runtime = "experimental-edge"

import { UserLayout } from "@/components/layouts"
import { Participants } from "@/components/quiz"
import { Questions } from "@/components/report"
import { QuizState } from "@/types/quiz/QuizState"
import ReportDedailResponse from "@/types/report/ReportDedailResponse"
import { formatDate, getServerErrorNoti, instance } from "@/utils"
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
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconQuestionMark, IconTargetArrow } from "@tabler/icons-react"
import {
    IconCalendar,
    IconEdit,
    IconMail,
    IconMessageCircle,
    IconPhoto,
    IconSettings,
    IconTrash,
    IconUsersGroup,
} from "@tabler/icons-react"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import React, { useState } from "react"

interface ReportDetailProps {
    quizReport: ReportDedailResponse
}

const ReportDetail = ({ quizReport }: ReportDetailProps) => {
    const [quiz, setQuiz] = useState()
    const iconStyle = { width: rem(12), height: rem(12) }
    const [opened, { open, close }] = useDisclosure(false)
    const [editing, setEditing] = useState(false)
    const [editedName, setEditedName] = useState(quizReport.quizName)
    const handleIconClick = () => {
        setEditing(true)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value)
    }

    const handleEditName = () => {
        setEditing(false)
    }

    return (
        <UserLayout>
            <Stack>
                <Flex justify={"space-between"}>
                    <Stack>
                        <Group>
                            {editing ? (
                                <input
                                    value={editedName}
                                    onChange={handleNameChange}
                                />
                            ) : (
                                <h2>{quizReport.quizName}</h2>
                            )}
                            <UnstyledButton onClick={handleIconClick}>
                                {<IconEdit />}
                            </UnstyledButton>
                            {editing && (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={handleEditName}
                                >
                                    Save
                                </Button>
                            )}
                        </Group>
                        <Group gap={4}>
                            {<IconCalendar size={20} />}
                            <Text>
                                Started: {formatDate(quizReport.createdAt)}
                            </Text>
                        </Group>
                    </Stack>

                    {(quizReport.state === QuizState.STARTED ||
                        quizReport.state === QuizState.WAITING) && (
                        <Group>
                            <Button
                                component={Link}
                                href={`/monitor/${quizReport.quizCode}`}
                                variant="outline"
                                color="red"
                                pos="relative"
                                w={180}
                            >
                                <Group preventGrowOverflow={false} px={4}>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    Live Dashboard
                                </Group>
                            </Button>
                            {/* <Button color="red">Finish Quiz</Button> */}
                        </Group>
                    )}
                </Flex>
                <Paper p="lg" radius="md" shadow="sm">
                    {/* <Text>{quiz.mode}</Text> */}
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
                                        <Text>
                                            {quizReport.totalParticipant}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="sm" radius="md" withBorder w={"20%"}>
                                <Group>
                                    <IconQuestionMark />
                                    <Stack gap={5}>
                                        <Text>Question</Text>
                                        <Text>
                                            {quizReport.questionReports.length}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
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
                                leftSection={
                                    <IconMessageCircle style={iconStyle} />
                                }
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

                        <Tabs.Panel value="questions">
                            <Questions questions={quizReport.questionReports} />
                        </Tabs.Panel>

                        <Tabs.Panel value="overview">
                            Settings tab content
                        </Tabs.Panel>
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
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query, req } = context
    const { quizId } = query
    try {
        const data: ReportDedailResponse = await instance
            .get(`reports/${quizId}`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()

        return {
            props: {
                quizReport: data,
            },
        }
    } catch (error) {
        console.log(getServerErrorNoti(error))

        return {
            notFound: true,
        }
    }
}

export default ReportDetail
