import { UserResponse, UserStats } from "@/types/user";
import {
  Avatar,
  Button,
  Flex,
  Group,
  Modal,
  NumberFormatter,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconShare3 } from "@tabler/icons-react";

interface UserProfileProps {
  user: UserResponse;
  stats: UserStats;
}

const UserProfile = ({ user, stats }: UserProfileProps) => {
  const [opened, { open, close }] = useDisclosure(false);
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
              onClick={open}
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
      <Modal opened={opened} onClose={close} title="Edit Profile">
        <Stack>
          <Flex justify={"space-between"}>
            <TextInput
              variant="default"
              label="Display Name"
              defaultValue={user.displayName}
            />
            <TextInput
              variant="default"
              label="User Name"
              defaultValue={user.username}
            />
          </Flex>
          <Flex justify="right" gap={10}>
            <Button variant="light" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              gradient={{
                from: "blue",
                to: "cyan",
                deg: 90,
              }}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </Paper>
  );
};

export default UserProfile;
