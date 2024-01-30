import { UserLayout } from "@/components/layouts";
import {
  UserFavorites,
  UserHistory,
  UserProfile,
  UserQuizzes,
} from "@/components/profile";
import { QuizBank } from "@/types/quizBank";
import { UserResponse, UserStats } from "@/types/user";
import { UserRole } from "@/types/user/UserResponse";
import { Container, Paper, Tabs } from "@mantine/core";
import { useState } from "react";
import useUser from "../hooks/useUser";

// const mockUser: UserResponse = {
//   id: 1,
//   displayName: "QuynhNt",
//   username: "quynhNt",
//   email: "abc@qizz.tech",
//   role: UserRole.USER,
//   createdAt: "2021-08-01T00:00:00.000Z",
//   modifiedAt: "2021-08-01T00:00:00.000Z",
// };

const mockStats: UserStats = {
  totalQuizzes: 0,
  totalFavorites: 0,
};

const mockQuizzes: QuizBank[] = [
  {
    id: 1,
    name: "Quiz 1",
    description: "Quiz 1 description",
    featuredImage: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    modifiedAt: "2021-08-01T00:00:00.000Z",
    publicable: true,
    publicEditable: false,
  },
  {
    id: 2,
    name: "Quiz 1",
    description: "Quiz 1 description",
    featuredImage: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    modifiedAt: "2021-08-01T00:00:00.000Z",
    publicable: true,
    publicEditable: false,
  },
];

const UserProfilePage = () => {
  const { user } = useUser();
  // const [user, setUser] = useState(userData);
  const [stats, setStats] = useState(mockStats);
  const [quizzes, setQuizzes] = useState(mockQuizzes);

  return (
    <UserLayout>
      <Container size="xl">
        <UserProfile user={user} stats={stats} />
        {/* <Paper p="lg" radius="md" shadow="sm"> */}
        <Tabs radius="md" defaultValue="quizzes">
          <Tabs.List mb="md">
            <Tabs.Tab value="quizzes">Quizzes</Tabs.Tab>
            <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
            <Tabs.Tab value="history">History</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="quizzes">
            <UserQuizzes quizzes={quizzes} />
          </Tabs.Panel>

          <Tabs.Panel value="favorites">
            <UserFavorites />
          </Tabs.Panel>

          <Tabs.Panel value="history">
            <UserHistory />
          </Tabs.Panel>
        </Tabs>
        {/* </Paper> */}
      </Container>
    </UserLayout>
  );
};

export default UserProfilePage;
