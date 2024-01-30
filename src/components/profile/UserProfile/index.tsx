import { UserResponse, UserStats } from "@/types/user";
import { getServerErrorNoti, instance } from "@/utils";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  NumberFormatter,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconShare3 } from "@tabler/icons-react";
import ChangePasswordBtn from "./ChangePasswordBtn";
import EditProfileBtn from "./EditProfileBtn";

interface UserProfileProps {
  user: UserResponse;
  stats: UserStats;
}

const UserProfile = ({ user, stats }: UserProfileProps) => {
  return (
    <Paper p="lg" radius="md" shadow="sm" mb="md">
      <Flex justify="space-between">
        <Group gap="xl" align="start">
          <Dropzone onDrop={(files) => console.log(files)} radius="50%" p={0}>
            <Avatar src="/logo/logo-1-color.png" size={142} p={20} />
          </Dropzone>

          <Stack gap={1} justify="space-between" h={"100%"}>
            <Stack gap={1}>
              <Title order={3}>{user.displayName}</Title>
              <Text c="blue">@{user.username}</Text>
            </Stack>

            <EditProfileBtn user={user} />
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

            <ChangePasswordBtn />
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
  );
};

export default UserProfile;
