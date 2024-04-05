import {
    AllParticipantQuestionDetailResponse,
    ParticipantQuestionDetailResponse,
    ParticipantQuizResponse,
} from "@/types/report"
import { instance, renderHTML } from "@/utils"
import {
    Avatar,
    Button,
    Flex,
    Group,
    ScrollArea,
    Stack,
    Text,
    Progress,
    Divider,
    Paper,
    RingProgress,
    Grid,
    TypographyStylesProvider,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import {
    IconCheck,
    IconCheckbox,
    IconExclamationMark,
    IconPin,
    IconShieldCheckered,
    IconTrash,
    IconX,
} from "@tabler/icons-react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
const Diagram = ({
    numberRight,
    numberWrong,
    numberNot,
    numberQuestion,
}: {
    numberRight: number
    numberWrong: number
    numberNot: number
    numberQuestion: number
}) => {
    numberQuestion = numberRight + numberWrong + numberNot
    return (
        <Progress.Root size={"lg"} w={"90%"}>
            <Progress.Section
                value={(numberRight / numberQuestion) * 100}
                color="#00c985"
            ></Progress.Section>
            <Progress.Section
                value={(numberWrong / numberQuestion) * 100}
                color="#ef3c69"
            ></Progress.Section>
            <Progress.Section
                value={(numberNot / numberQuestion) * 100}
                color="#f5f5f5"
            ></Progress.Section>
        </Progress.Root>
    )
}
const Accuracy = ({
    numberRight,
    numberWrong,
    numberNot,
    numberQuestion,
}: {
    numberRight: number
    numberWrong: number
    numberNot: number
    numberQuestion: number
}) => {
    numberQuestion = numberRight + numberWrong + numberNot
    return (
        <RingProgress
            size={70}
            sections={[
                {
                    value: Math.round((numberRight / numberQuestion) * 100),
                    color: "blue",
                },
            ]}
            thickness={7}
            label={
                <Text c="blue" fw={500} ta="center" size="md">
                    {Math.round((numberRight / numberQuestion) * 100) + "%"}
                </Text>
            }
        />
    )
}

const AnswerDetailPaper = ({
    question,
}: {
    question: ParticipantQuestionDetailResponse
}) => {
    return (
        <Paper p="lg" radius="md" withBorder>
            <Stack>
                <Flex justify={"space-between"}>
                    <Group>
                        {question.correct ? (
                            <Button
                                leftSection={<IconCheck />}
                                variant="light"
                                color="green"
                            >
                                Correct
                            </Button>
                        ) : (
                            <Button
                                leftSection={<IconX />}
                                variant="light"
                                color="red"
                            >
                                Incorrect
                            </Button>
                        )}

                        <Button
                            leftSection={<IconCheckbox />}
                            variant="light"
                            color="gray"
                        >
                            {question.question.type}
                        </Button>
                    </Group>
                    <Group>
                        <Group gap={2}>
                            <Text fw={500}>{question.question.duration}s</Text>
                            <Text>time</Text>
                        </Group>
                        <Divider orientation="vertical" />
                        <Group gap={2}>
                            <Text fw={500}>{question.question.point}</Text>
                            <Text>point</Text>
                        </Group>
                    </Group>
                </Flex>
                <TypographyStylesProvider>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: renderHTML(question.question.content),
                        }}
                    />
                </TypographyStylesProvider>
                <Grid>
                    <Grid.Col span={5}>
                        <Stack>
                            <Text fw={300}>User answer</Text>
                            <Text>{JSON.parse(question.answerMetadata)}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Stack>
                            <Text fw={300} c={"green"}>
                                Correct Answer
                            </Text>

                            <Text>
                                {JSON.parse(
                                    question.question.correctAnswersMetadata
                                )}
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Paper>
    )
}
const ParticipantDetail = ({
    id,
    participant,
}: {
    id: number
    participant: ParticipantQuizResponse
}) => {
    const { quizId } = useRouter().query
    const [questions, listQuestions] =
        useListState<ParticipantQuestionDetailResponse>([])
    const fetchData = async () => {
        try {
            const res: AllParticipantQuestionDetailResponse = await instance
                .get(`reports/${quizId}/participant/${id}`)
                .json()
            if (res) {
                listQuestions.setState(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Stack>
            <ScrollArea h={500}>
                <Stack>
                    {/* <Flex justify={"space-between"}> */}
                    <Group>
                        <Avatar src="" size={50} radius="xl" />
                        <Text fw={700}>{participant?.displayName}</Text>
                    </Group>
                    {/* <Button leftSection={<IconTrash />} variant="light" p={5}>
              Delete
            </Button> */}
                    {/* </Flex> */}
                    {/* <Flex justify={"flex-start"}>
            <Text>Ngày làm quiz</Text>
          </Flex> */}
                </Stack>
                <Divider mt={30} mb={30} />
                <Flex justify={"center"}>
                    <Diagram
                        numberNot={0}
                        numberRight={participant.point}
                        numberWrong={
                            participant.totalQuestion - participant?.point
                        }
                        numberQuestion={participant.totalQuestion}
                    />
                </Flex>
                <Flex justify={"center"} mt={10} gap={5}>
                    <Button
                        leftSection={<IconCheck />}
                        variant="light"
                        color="green"
                    >
                        {participant.point} Correct
                    </Button>
                    <Button leftSection={<IconX />} variant="light" color="red">
                        {participant.totalQuestion - participant.point}{" "}
                        InCorrect
                    </Button>
                    {/* <Button
            leftSection={<IconExclamationMark />}
            variant="light"
            color="gray"
          >
            {1} Unattempted
          </Button> */}
                </Flex>
                <Flex mt={30} gap={10} justify={"center"} mb={30}>
                    <Paper withBorder p={5} radius="md" w={120} h={120}>
                        <Stack gap={5} justify="center">
                            <Group justify="center" p={0}>
                                <Accuracy
                                    numberNot={0}
                                    numberRight={participant.point}
                                    numberWrong={
                                        participant.totalQuestion -
                                        participant.point
                                    }
                                    numberQuestion={participant.totalQuestion}
                                />
                            </Group>

                            <Text ta={"center"}>Accuracy</Text>
                        </Stack>
                    </Paper>
                    <Paper withBorder p={5} radius="md" w={120} h={120}>
                        <Stack gap={10} justify="center" align="center">
                            <Flex gap={0} align={"center"} justify={"center"}>
                                {/* số câu đúng/tổng số câu hỏi */}
                                <Text size="lg" fw={500}>
                                    {participant.point}
                                </Text>
                                <Text size="sm">
                                    /{participant.totalQuestion}
                                </Text>
                            </Flex>
                            <Text ta={"center"}>Points</Text>
                        </Stack>
                    </Paper>
                    <Paper withBorder p={5} radius="md" w={120} h={120}>
                        <Stack gap={10} justify="center">
                            <Text fw={500} ta={"center"}>
                                {participant.score}
                            </Text>
                            <Text ta={"center"}>Score</Text>
                        </Stack>
                    </Paper>
                </Flex>
                {questions.map((question, index) => (
                    <AnswerDetailPaper key={index} question={question} />
                ))}
                {/* <AnswerDetailPaper question={questions[0]} /> */}
            </ScrollArea>
        </Stack>
    )
}

export default ParticipantDetail
