import { UserResponse, UserStats } from "@/types/user"
import {
    Avatar,
    Button,
    Flex,
    Group,
    NumberFormatter,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core"
import { IconEdit, IconShare3 } from "@tabler/icons-react"

interface UserProfileProps {
    user: UserResponse
    stats: UserStats
}

const UserProfile = ({ user, stats }: UserProfileProps) => {
    return (
        <Paper p="lg" radius="md" shadow="sm" mb="md">
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
                                <NumberFormatter value={stats.totalQuizzes} />
                            </Title>
                            <Text tt="uppercase" size="sm">
                                Quiz
                            </Text>
                        </Stack>
                        <Stack align="center" gap={2}>
                            <Title order={3}>
                                <NumberFormatter value={stats.totalFavorites} />
                            </Title>
                            <Text tt="uppercase" size="sm">
                                Favorites
                            </Text>
                        </Stack>
                    </Group>
                </Stack>
            </Flex>
        </Paper>
    )
}

export default UserProfile
