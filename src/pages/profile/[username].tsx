import { UserLayout } from "@/components/layouts"
import {
    UserFavorites,
    UserHistory,
    UserProfile,
    UserQuizzes,
} from "@/components/profile"
import { UserResponse, UserStats } from "@/types/user"
import { UserRole } from "@/types/user/UserResponse"
import { Container, Paper, Tabs } from "@mantine/core"
import { useState } from "react"

const mockUser: UserResponse = {
    id: 1,
    displayName: "QuynhNt",
    username: "quynhNt",
    email: "abc@qizz.tech",
    role: UserRole.USER,
    createdAt: "2021-08-01T00:00:00.000Z",
    modifiedAt: "2021-08-01T00:00:00.000Z",
}

const mockStats: UserStats = {
    totalQuizzes: 0,
    totalFavorites: 0,
}

const UserProfilePage = () => {
    const [user, setUser] = useState(mockUser)
    const [stats, setStats] = useState(mockStats)

    return (
        <UserLayout>
            <Container size="xl">
                <UserProfile user={user} stats={stats} />
                <Paper p="lg" radius="md" shadow="sm">
                    <Tabs radius="md" defaultValue="quizzes">
                        <Tabs.List mb="md">
                            <Tabs.Tab value="quizzes">Quizzes</Tabs.Tab>
                            <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
                            <Tabs.Tab value="history">History</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="quizzes">
                            <UserQuizzes />
                        </Tabs.Panel>

                        <Tabs.Panel value="favorites">
                            <UserFavorites />
                        </Tabs.Panel>

                        <Tabs.Panel value="history">
                            <UserHistory />
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
            </Container>
        </UserLayout>
    )
}

export default UserProfilePage
