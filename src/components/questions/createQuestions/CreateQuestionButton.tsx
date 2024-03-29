import { QuestionType } from "@/types/question/QuestionType"
import { Button, Group, Menu, rem } from "@mantine/core"
import { IconRectangle, IconSquareCheck } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"
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
const CreateQuestionButton = () => {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button m={4}>Add new question</Button>
            </Menu.Target>

            <Menu.Dropdown>
                {questionTypes.map((item) => (
                    <Menu.Item
                        component={Link}
                        href={`edit/create?type=${item.type}`}
                        key={item.type}
                        leftSection={item.icon}
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    )
}

export default CreateQuestionButton
