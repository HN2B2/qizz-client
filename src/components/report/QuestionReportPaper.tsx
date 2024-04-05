import { QuestionReportResponse } from "@/types/report"
import { renderHTML } from "@/utils"
import { BarChart } from "@mantine/charts"
import {
    Divider,
    Flex,
    Group,
    RingProgress,
    Skeleton,
    Stack,
    Text,
    TypographyStylesProvider,
    rem,
} from "@mantine/core"
import { IconCheck, IconCheckbox, IconTrophy, IconX } from "@tabler/icons-react"
import React from "react"

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
            size={50}
            sections={[
                {
                    value: Math.round((numberRight / numberQuestion) * 100),
                    color: "blue",
                },
            ]}
            label={
                <Text c="blue" fw={40} ta="center" size="sm">
                    {Math.round((numberRight / numberQuestion) * 100) + "%"}
                </Text>
            }
            thickness={5}
        />
    )
}

const AnswerBarChart = ({
    numberChoosed,
    totalJoiner,
}: {
    numberChoosed: number
    totalJoiner: number
}) => {
    return (
        <BarChart
            p={0}
            h={30}
            w={"100%"}
            data={[
                {
                    choosed: numberChoosed,
                    notchoosed: totalJoiner - numberChoosed,
                },
            ]}
            dataKey="month"
            type="stacked"
            orientation="vertical"
            tickLine="none"
            gridAxis="none"
            withXAxis={false}
            withYAxis={false}
            series={[
                { name: "choosed", color: "red.6" },
                { name: "notchoosed", color: "gray" },
            ]}
        />
    )
}

const AnswerDetail = ({
    numberChoosed,
    totalJoiner,
    content,
    correct,
}: {
    numberChoosed: number
    totalJoiner: number
    content: string
    correct: boolean
}) => {
    return (
        <Flex justify={"space-between"}>
            {correct ? <IconCheck size={20} /> : <IconX size={20} />}
            <Group>
                <Text p={0}> {content}</Text>
                <AnswerBarChart
                    numberChoosed={numberChoosed}
                    totalJoiner={totalJoiner}
                />
            </Group>
        </Flex>
    )
}

const QuestionReportPaper = ({
    question,
}: {
    question: QuestionReportResponse
}) => {
    const answersMetadata: string[] = JSON.parse(question.answersMetadata)
    const correctAnswersMetadata: string[] = JSON.parse(
        question.correctAnswersMetadata
    )
    const numberChoosed = question.participants.filter(
        (participant) => participant.correct
    ).length
    const totalJoiner = question.participants.length
    const iconStyle = { width: rem(12), height: rem(12) }

    return (
        <>
            <Stack>
                <Flex justify={"space-between"}>
                    <Group>
                        <Group gap={5}>
                            <IconCheckbox style={iconStyle}></IconCheckbox>
                            <Text size="sm"> {question.type}</Text>
                        </Group>
                        <Group gap={5}>
                            <IconTrophy style={iconStyle}></IconTrophy>
                            <Text size="sm">{question.point}</Text>
                        </Group>
                    </Group>
                    <Group>
                        <Accuracy
                            numberRight={numberChoosed}
                            numberWrong={totalJoiner - numberChoosed}
                            numberNot={0}
                            numberQuestion={totalJoiner}
                        />
                        <Text>Accuracy</Text>
                    </Group>
                </Flex>

                <Divider />
                <Text size="sm" fw={700} c={"gray"}>
                    Question
                </Text>
                <TypographyStylesProvider>
                    {question.content ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: renderHTML(question.content),
                            }}
                        />
                    ) : (
                        <Skeleton height={60} />
                    )}
                </TypographyStylesProvider>
                <Group mt={10}>
                    <Stack w={"70%"}>
                        <Text size="sm" fw={700} c={"gray"}>
                            Options
                        </Text>
                        {answersMetadata.map((answer) => (
                            <AnswerDetail
                                key={answer}
                                content={answer}
                                numberChoosed={
                                    question.participants.filter(
                                        (participant) =>
                                            JSON.parse(
                                                participant.answerMetadata
                                            ).includes(answer)
                                    ).length
                                }
                                totalJoiner={question.participants.length}
                                correct={
                                    correctAnswersMetadata.includes(answer)
                                        ? true
                                        : false
                                }
                            />
                        ))}
                    </Stack>
                    <Divider orientation="vertical" />
                    <Stack gap={10} w={"25%"}>
                        <Group justify="space-between">
                            <Text>Correct</Text>
                            <Text>Incorrect</Text>
                        </Group>

                        <AnswerBarChart
                            numberChoosed={numberChoosed}
                            totalJoiner={totalJoiner}
                        ></AnswerBarChart>
                    </Stack>
                </Group>
            </Stack>
        </>
    )
}

export default QuestionReportPaper
