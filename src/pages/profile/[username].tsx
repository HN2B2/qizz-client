import { UserLayout } from "@/components/layouts"
import {
    Avatar,
    Button,
    Container,
    Flex,
    Group,
    NumberFormatter,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core"
import { IconEdit, IconShare3 } from "@tabler/icons-react"
import { useState } from "react"

const mockUser = {
    displayName: "QuynhNt",
    username: "quynhNt",
}

const mockStats = {
    totalQuizzes: 0,
    totalFavorites: 0,
}

const UserProfile = () => {
    const [user, setUser] = useState(mockUser)
    const [stats, setStats] = useState(mockStats)

    return (
        <UserLayout>
            <Container size="xl">
                <Paper p="lg" radius="md" shadow="sm">
                    <Flex justify="space-between">
                        <Group gap="xl" align="start">
                            <Avatar src="" size={142} />
                            <Stack gap={1}>
                                <Title order={3}>{user.displayName}</Title>
                                <Text c="blue">@{user.username}</Text>
                            </Stack>
                        </Group>
                        <Stack justify="space-between">
                            <Group gap="sm" justify="flex-end">
                                <Button
                                    variant="gradient"
                                    gradient={{
                                        from: "blue",
                                        to: "cyan",
                                        deg: 90,
                                    }}
                                    leftSection={<IconShare3 size={14} />}
                                >
                                    Share profile
                                </Button>
                                <Button
                                    variant="gradient"
                                    gradient={{
                                        from: "blue",
                                        to: "cyan",
                                        deg: 90,
                                    }}
                                    leftSection={<IconEdit size={14} />}
                                >
                                    Edit profile
                                </Button>
                            </Group>
                            <Group gap="xl" justify="flex-end">
                                <Stack align="center" gap={2}>
                                    <Title order={3}>
                                        <NumberFormatter
                                            value={stats.totalQuizzes}
                                        />
                                    </Title>
                                    <Text tt="uppercase" size="sm">
                                        Quiz
                                    </Text>
                                </Stack>
                                <Stack align="center" gap={2}>
                                    <Title order={3}>
                                        <NumberFormatter
                                            value={stats.totalFavorites}
                                        />
                                    </Title>
                                    <Text tt="uppercase" size="sm">
                                        Favorites
                                    </Text>
                                </Stack>
                            </Group>
                        </Stack>
                    </Flex>
                </Paper>
            </Container>
        </UserLayout>
    )
}

export default UserProfile
