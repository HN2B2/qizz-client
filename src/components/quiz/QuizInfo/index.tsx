import ShareButton from "@/components/sharing/ShareButton";
import useUser from "@/hooks/useUser";
import { BankResponse } from "@/types/bank";
import { FavoriteResponse, UpvoteResponse } from "@/types/upvote";
import { instance } from "@/utils";
import {
  ActionIcon,
  Avatar,
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
  IconHeart,
  IconHeartFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";

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
            <Avatar src="" size={142} radius="sm" />
            <Stack gap={5}>
              <Title order={3}>{bank.name}</Title>
              <Text>{bank.description}</Text>

              <SimpleGrid cols={2} verticalSpacing="xs" spacing={"xs"}>
                <Text size="xs">
                  {<IconBook size={10} />}{" "}
                  {bank.subCategories?.map((item) => item.name).join(", ")}
                </Text>
                {/* <Text size="xs">
                  {<IconBook size={10} />} {quiz.subcategory}
                </Text> */}
                <Text size="xs">
                  {<IconBook size={10} />} {bank.totalUpVotes} upvotes
                </Text>
              </SimpleGrid>
            </Stack>
          </Group>
        </Flex>
        <Flex justify={"space-between"}>
          <Group gap="xs" align="start">
            <Avatar src="" size={50} />
            <Stack gap={5}>
              <Text size="xs"> {bank.createdBy.displayName}</Text>
              <Text size="xs"> {bank.createdAt}</Text>
            </Stack>
          </Group>
          <Stack justify="space-between">
            <Group gap="sm" justify="flex-end">
              <ShareButton bank={bank} setBank={setBank} />
              <Button variant="default" leftSection={<IconEdit size={14} />}>
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
