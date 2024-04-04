import {
    Button,
    Group,
    Paper,
    Pill,
    Select,
    Tooltip,
    Flex,
} from "@mantine/core"
import {
    IconAlarm,
    IconClock,
    IconCopyPlus,
    IconGripVertical,
    IconTrash,
    IconTrophy,
} from "@tabler/icons-react"
import React from "react"
import MultipleChoice from "./questionsType/MultipleChoice"
import FillInTheBlank from "./questionsType/FillInTheBlank"
import { QuestionType } from "@/types/question/QuestionType"
import { QuestionResponse } from "@/types/question"
import EditQuestionButton from "./editQuestions/EditQuestionButton"
import { instance } from "@/utils"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/router"
import { modals } from "@mantine/modals"

const times = [
    {
        value: "15",
        label: "15 seconds",
    },
    {
        value: "30",
        label: "30 seconds",
    },
    {
        value: "60",
        label: "1 minute",
    },
    {
        value: "120",
        label: "2 minutes",
    },
    {
        value: "300",
        label: "5 minutes",
    },
]

const points = [
    {
        value: "1",
        label: "1 point",
    },
    {
        value: "2",
        label: "2 points",
    },
    {
        value: "3",
        label: "3 points",
    },
    {
        value: "4",
        label: "4 points",
    },
]

interface Props {
    type: string
    data: QuestionResponse
    bankId: number
    setQuestion: React.Dispatch<React.SetStateAction<QuestionResponse[]>>
    index: number
}
const QuestionPaper = ({ type, data, bankId, setQuestion, index }: Props) => {
    const QuestionTypes: Record<QuestionType, React.ReactNode> = {
        [QuestionType.MULTIPLE_CHOICE]: (
            <MultipleChoice data={data} show={true} />
        ),
        [QuestionType.FILL_IN_THE_BLANK]: (
            <FillInTheBlank data={data} show={true} />
        ),
    }
    const questionType: QuestionType =
        QuestionType[type as keyof typeof QuestionType]
    const query = useRouter().query

    const showConfirmDelete = () => {
        //how to prevent navigate link of a tag parent of this function

        modals.openConfirmModal({
            title: "Delete question",
            children: "Are you sure you want to delete this question?",
            labels: {
                confirm: "Delete",
                cancel: "Cancel",
            },
            onCancel: () => {},
            onConfirm: () => handleDelete(),
        })
    }
    const handleDelete = async () => {
        data.disabled = true
        try {
            const question = await instance
                .put(`question/${data.questionId}`, {
                    json: data,
                })
                .json()

            notifications.show({
                title: "Success",
                message: "Question deleted successfully",
                color: "green",
            })
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: "red",
            })
        }

        try {
            const questionData: QuestionResponse[] = await instance
                .get(`question/all/bankId/${bankId}`)
                .json()

            setQuestion(questionData)
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: "red",
            })
        }
    }
    return (
        <Paper shadow="md" withBorder my={"sm"}>
            <Group justify="space-between">
                <Flex align={"center"} pl={20}>
                    <IconGripVertical></IconGripVertical>
                    <Pill variant="transparent">Question {index + 1}</Pill>
                </Flex>
                <Button.Group p={8}>
                    <Tooltip label="Edit this question" position="top">
                        <EditQuestionButton
                            quizBankId={data.quizBankId}
                            questionId={data.questionId}
                            type={type}
                        />
                    </Tooltip>
                    <Tooltip label="Duplicate this question" position="top">
                        <Button variant="default" p={6} mx={4}>
                            <IconCopyPlus size={16}></IconCopyPlus>
                        </Button>
                    </Tooltip>
                    <Tooltip label="Delete this question" position="top">
                        <Button
                            variant="default"
                            p={6}
                            mx={4}
                            onClick={() => {
                                showConfirmDelete()
                            }}
                        >
                            <IconTrash size={16}></IconTrash>
                        </Button>
                    </Tooltip>
                </Button.Group>
            </Group>
            {QuestionTypes[questionType]}

            <Group p={8}>
                <Button
                    size="xs"
                    variant="default"
                    leftSection={<IconAlarm size={14} />}
                >
                    {data.duration} seconds
                </Button>
                <Button
                    size="xs"
                    variant="default"
                    leftSection={<IconTrophy size={14} />}
                >
                    {data.point} points
                </Button>
            </Group>
        </Paper>
    )
}

export default QuestionPaper
