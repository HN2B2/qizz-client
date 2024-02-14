import { UserLayout } from "@/components/layouts";
import {
  UserFavorites,
  UserHistory,
  UserProfile,
  UserQuizzes,
} from "@/components/profile";
import { BankResponse } from "@/types/bank";
import { UserResponse, UserStats } from "@/types/user";
import { UserRole } from "@/types/user/UserResponse";
import { Container, Paper, Tabs } from "@mantine/core";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { GetServerSidePropsContext } from "next";
import { instance } from "@/utils";

const mockStats: UserStats = {
  totalQuizzes: 0,
  totalFavorites: 0,
};

const mockQuizzes: BankResponse[] = [
  {
    quizBankId: 1,
    name: "Quiz 1",
    description: "Quiz 1 description",
    featuresImage: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    modifiedAt: "2021-08-01T00:00:00.000Z",
    quizPublicity: true,
    publicEditable: true,
    createdBy: {
      id: 1,
      username: "admin",
      email: "admin@qizz",
      role: UserRole.USER,
      displayName: "Admin",
      createdAt: "2021-08-01T00:00:00.000Z",
      modifiedAt: "2021-08-01T00:00:00.000Z",
      metadata: [],
    },
  },
  {
    quizBankId: 2,
    name: "Quiz 1",
    description: "Quiz 1 description",
    featuresImage: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    modifiedAt: "2021-08-01T00:00:00.000Z",
    quizPublicity: true,
    publicEditable: true,
    createdBy: {
      id: 2,
      username: "admin",
      email: "admin@qizz",
      role: UserRole.USER,
      displayName: "Admin",
      createdAt: "2021-08-01T00:00:00.000Z",
      modifiedAt: "2021-08-01T00:00:00.000Z",
      metadata: [],
    },
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
        <Paper p="lg" radius="md" shadow="sm">
          <Tabs radius="md" defaultValue="quizzes">
            <Tabs.List mb="md">
              <Tabs.Tab value="quizzes">Quizzes</Tabs.Tab>
              <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
              <Tabs.Tab value="history">History</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="quizzes">
              <UserQuizzes quizzes={quizzes} />
              <></>
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
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const { username } = context.query;
//     const { data } = await instance.get<UserResponse>(`/user/${username}`);
//     return {
//       props: {
//         user: data,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }

export default UserProfilePage;
