import ShareButton from "@/components/sharing/ShareButton";
import useUser from "@/hooks/useUser";
import { BankResponse } from "@/types/bank";
import { FavoriteResponse, UpvoteResponse } from "@/types/upvote";
import { instance } from "@/utils";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconEdit,
  IconShare3,
  IconHeartFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
interface QuizInfoProps {
  // quiz: Quiz;
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
  upvote: UpvoteResponse;
  like: FavoriteResponse;
}

const QuizInfo = ({ bank, setBank, upvote, like }: QuizInfoProps) => {
  const { user, loading } = useUser();
  const [upvoted, handleUpvoted] = useDisclosure(upvote.isUpvoted);
  const [liked, handleLiked] = useDisclosure(like.isLiked);

  const handleUpvote = async () => {
    try {
      const { data, status } = await instance.put(
        `/bank/upvote/${bank.quizBankId}`
      );
      handleUpvoted.toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const { data, status } = await instance.put(
        `/bank/favorite/${bank.quizBankId}`
      );
      handleLiked.toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper p="lg" radius="md" shadow="sm" mb="md">
      <Stack gap={20}>
        <Flex justify="space-between">
          <Group gap="xl" align="start">
            <Avatar src="" size={124} radius="sm" />
            <Stack gap={8}>
              <Text c="dimmed" size="sm">
                Quiz Bank
              </Text>
              <Text size="xl" fw={500}>
                {bank.name}
              </Text>
              <Text>{bank.description}</Text>

              <SimpleGrid cols={2} verticalSpacing="xs" spacing={"xs"}>
                {bank.subCategories?.map((item) => (
                  <Badge variant="light" color="blue" size="sm" radius="md">
                    {item.name}
                  </Badge>
                ))}
              </SimpleGrid>
              <Badge
                leftSection={<FaRegHeart />}
                variant="light"
                color="red"
                size="sm"
                radius="md"
              >
                {bank.totalUpVotes} upvotes
              </Badge>
            </Stack>
          </Group>
        </Flex>
        <Flex justify={"space-between"}>
          <Group gap="xs" align="start">
            <Avatar src="" size={40} />
            <Stack gap={5}>
              <Text size="xs"> {bank.createdBy.displayName}</Text>
              <Text size="xs"> {bank.createdAt}</Text>
            </Stack>
          </Group>
          <Stack justify="space-between">
            <Group gap="sm" justify="flex-end">
              <ShareButton bank={bank} setBank={setBank} />
              <Button
                variant="default"
                size="xs"
                leftSection={<IconEdit size={14} />}
              >
                Edit profile
              </Button>

              <ActionIcon
                variant="default"
                c={liked ? "red" : ""}
                onClick={handleLike}
              >
                <IconHeartFilled size={14} />
              </ActionIcon>
              <ActionIcon
                variant="default"
                c={upvoted ? "blue" : ""}
                onClick={handleUpvote}
              >
                <IconThumbUpFilled size={14} />
              </ActionIcon>
            </Group>
          </Stack>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default QuizInfo;
