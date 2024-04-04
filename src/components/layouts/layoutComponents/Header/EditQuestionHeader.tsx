import { useEditContext } from "@/pages/bank/[bankId]/edit/edit-question/[id]"
import { QuestionResponse } from "@/types/question"
import { QuestionType } from "@/types/question/QuestionType"
import { instance } from "@/utils"
import { AppShell, Button, Group, Menu, Select, rem } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import {
    IconAlarm,
    IconChevronLeft,
    IconDeviceFloppy,
    IconRectangle,
    IconSquareCheck,
    IconTrophy,
} from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const questionTypes = [
    {
        label: "Multiple Choice",
        icon: <IconSquareCheck style={{ width: rem(14), height: rem(14) }} />,
        type: QuestionType.MULTIPLE_CHOICE,
    },
    {
        label: "Fill in the blank",
        icon: <IconRectangle style={{ width: rem(14), height: rem(14) }} />,
        type: QuestionType.FILL_IN_THE_BLANK,
    },
]

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

const questionTypeLabel: Record<QuestionType, string> = {
    [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
    [QuestionType.FILL_IN_THE_BLANK]: "Fill in the blank",
}

const EditQuestionHeader = () => {
    const router = useRouter()
    const { questionId, type, bankId } = router.query
    const {
        dataQuestion,
        updateDataQuestion,
    }: {
        dataQuestion: QuestionResponse
        updateDataQuestion: React.Dispatch<
            React.SetStateAction<QuestionResponse>
        >
    } = useEditContext()
    //   useEffect(() => {
    //     updateDataQuestion({
    //       ...dataQuestion,
    //       duration: 30,
    //       point: 1,
    //     });
    //     console.log(dataQuestion);
    //   }, []);
    const handleTime = (value: string | null) => {
        let newData = dataQuestion
        newData = {
            ...newData,
            duration: Number(value),
        }
        updateDataQuestion(newData)
    }
    const handlePoint = (value: string | null) => {
        let newData = dataQuestion
        newData = {
            ...newData,
            point: Number(value),
        }
        // newData.point = value;
        updateDataQuestion(newData)
    }

    const createQuestionForm = useForm({
        initialValues: {
            content: dataQuestion.content,
            point: dataQuestion.point,
            duration: dataQuestion.duration,
            type: dataQuestion.type,
            answersMetadata: dataQuestion.answersMetadata,
            correctAnswersMetadata: dataQuestion.correctAnswersMetadata,
            questionIndex: -1,
            disabled: false,
        },
        validate: {
            content: (value) => (value ? null : "Content is required"),
            point: (value) =>
                value >= 1 && value <= 4 ? null : "Invalid point",
            duration: (value) =>
                times.some((time) => time.value === value.toString())
                    ? null
                    : "Invalid duration",
            type: (value) =>
                QuestionType[value as keyof typeof QuestionType]
                    ? null
                    : "Invalid type",
            answersMetadata: (value) => {
                switch (dataQuestion.type) {
                    case QuestionType.MULTIPLE_CHOICE:
                        return /^\[\s*("[^"]*"\s*,\s*){1,4}"[^"]*"\s*\]$/.test(
                            value
                        )
                            ? // return /^\['[^'\s].*?'(?:,\s*'[^'\s].*?'){1,4}]$/.test(value)
                              null
                            : "Invalid answers, minimum answer is 2 and maximum answer is 5"
                    // return null;
                    case QuestionType.FILL_IN_THE_BLANK:
                        // return value.length > 0 ? null : "Invalid answers";
                        return null
                }
            },
            correctAnswersMetadata: (value) => {
                switch (dataQuestion.type) {
                    case QuestionType.MULTIPLE_CHOICE:
                        // return /^\['[^'\s].*?'(?:,\s*'[^'\s].*?'){0,4}]$/.test(value)
                        return /^\[\s*("[^"]*"\s*,\s*){0,4}"[^"]*"\s*\]$/.test(
                            value
                        )
                            ? null
                            : "Invalid correct answers, minimum correct answer is 1 and maximum is 5"
                    // return null;
                    case QuestionType.FILL_IN_THE_BLANK:
                        return /^\[".*"\]$/.test(value)
                            ? null
                            : "Invalid correct answers"
                }
            },
            disabled: (value) =>
                typeof value === "boolean" ? null : "Invalid request",
            // quizBankId: (value) =>
            //   typeof value === "number" ? null : "Invalid request",
        },
    })

    const handleQuestion = () => {
        dataQuestion.type = QuestionType[type as keyof typeof QuestionType]
        dataQuestion.questionIndex = -1
        dataQuestion.quizBankId = Number(bankId)
        dataQuestion.disabled = false

        createQuestionForm.setFieldValue("content", dataQuestion.content)
        createQuestionForm.setFieldValue("point", dataQuestion.point)
        createQuestionForm.setFieldValue("duration", dataQuestion.duration)
        createQuestionForm.setFieldValue("type", dataQuestion.type)
        createQuestionForm.setFieldValue(
            "answersMetadata",
            dataQuestion.answersMetadata
        )
        createQuestionForm.setFieldValue(
            "correctAnswersMetadata",
            dataQuestion.correctAnswersMetadata
        )
        createQuestionForm.setFieldValue(
            "questionIndex",
            dataQuestion.questionIndex
        )
        createQuestionForm.setFieldValue("disabled", dataQuestion.disabled)
        createQuestionForm.setFieldValue("quizBankId", dataQuestion.quizBankId)
        // createQuestionForm.setValues(dataQuestion);
        createQuestionForm.validate()
        // console.log(createQuestionForm.values);

        if (!createQuestionForm.isValid()) {
            notifications.show({
                color: "red",
                title: "Error",
                message: Object.values(createQuestionForm.errors)[0],
            })

            return
        }

        handleSubmit()
    }
    const handleSubmit = async () => {
        // console.log(createQuestionForm.values);
        // console.log(dataQuestion);

        try {
            const data = await instance
                .put(`question/${dataQuestion.questionId}`, {
                    json: dataQuestion,
                })
                .json()
            if (data) {
                // console.log(data);
            }
            notifications.show({
                color: "green",
                title: "SUCCESS",
                message: "Create question successfully",
            })
            router.push({
                pathname: `/bank/${bankId}/edit`,
                query: { bankId },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppShell.Header>
            <Group h="100%" justify="space-between" w={"100%"} px={8}>
                <Group p={8}>
                    <Button
                        variant="light"
                        component={Link}
                        href={` /bank/${bankId}/edit `}
                    >
                        <IconChevronLeft />
                    </Button>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button variant="light">
                                {
                                    questionTypeLabel[
                                        type as keyof typeof QuestionType
                                    ]
                                }
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            {questionTypes.map((item) => (
                                <Menu.Item
                                    key={item.type}
                                    leftSection={item.icon}
                                >
                                    <Link
                                        href={` /bank/${bankId}/edit/create?type=${item.type}`}
                                        // href={`/`}
                                    >
                                        {item.label}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group p={8}>
                    <Select
                        w={150}
                        //   label=""
                        leftSection={<IconAlarm size={"1rem"} />}
                        placeholder="Pick value"
                        data={times}
                        // defaultValue={dataQuestion.duration}
                        value={dataQuestion.duration.toString()}
                        allowDeselect={false}
                        title="Test"
                        onChange={(value) => handleTime(value)}
                    />

                    <Select
                        w={150}
                        leftSection={<IconTrophy size={"1rem"} />}
                        placeholder="Pick value"
                        data={points}
                        // defaultValue={dataQuestion.point}
                        value={dataQuestion.point.toString()}
                        allowDeselect={false}
                        onChange={(value) => handlePoint(value)}
                    />

                    <Button
                        variant="filled"
                        leftSection={<IconDeviceFloppy size={"1rem"} />}
                        onClick={handleQuestion}
                    >
                        Save question
                    </Button>
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default EditQuestionHeader
