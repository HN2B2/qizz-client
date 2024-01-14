import React from "react"
import { Card, Image, Text, Badge, Group } from "@mantine/core"
interface CardProps {
    title?: string
    description?: string
    totalJoins?: number
    totalQuestions?: number
    image?: string
    w?: string | number
    lineClamp?: number
}

const QuizCard = ({
    title,
    description,
    totalJoins,
    totalQuestions,
    image,
    lineClamp,
}: CardProps) => {
    return (
        <>
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src={
                            image ||
                            "https://placehold.co/600x400?text=Placeholder"
                        }
                        height={160}
                        width={200}
                        alt="Norway"
                    />
                </Card.Section>
                <Text fw={500} lineClamp={lineClamp || 2}>
                    {title}
                </Text>
                <Group justify="space-between" mt="md" mb="xs">
                    <Badge color="pink">{totalJoins} plays</Badge>
                    <Badge color="pink">{totalQuestions} qs</Badge>
                </Group>

                <Text size="sm">{description}</Text>
            </Card>
        </>
    )
}

export default QuizCard
