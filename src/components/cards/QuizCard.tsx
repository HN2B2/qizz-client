import React from "react"
import { Card, Image, Text, Badge, Group } from "@mantine/core"
import Link from "next/link"
interface CardProps {
    id: number
    title?: string
    description?: string | null
    totalUpvotes?: number
    totalQuestions?: number
    image?: string | null
    w?: string | number
    lineClamp?: number
}

const QuizCard = ({
    id,
    title,
    description,
    totalUpvotes,
    totalQuestions,
    image,
    lineClamp,
}: CardProps) => {
    return (
        <>
            <Card
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                component={Link}
                href={`bank/${id}`}
            >
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
                    <Badge color="pink">{totalUpvotes} upvotes</Badge>
                    <Badge color="pink">{totalQuestions} qs</Badge>
                </Group>

                <Text size="sm">{description}</Text>
            </Card>
        </>
    )
}

export default QuizCard
