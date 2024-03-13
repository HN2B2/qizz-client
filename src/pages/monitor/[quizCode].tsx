import { GameBackground } from "@/components/play";
import useSubscription from "@/hooks/useSubscription";
import useWebSocket from "@/hooks/useWebSocket";
import { Button, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { GetServerSidePropsContext } from "next";
import React from "react";
const MonitorHeader = () => {
  return <Button>End</Button>;
};
const JoinGamePaper = () => {
  return (
    <Paper p="lg" radius="md" shadow="sm" opacity={0.8} w={"100%"}>
      <Stack>
        <Flex justify={"space-between"}>
          <Text>Join Game</Text>
        </Flex>
        <Text ta="center">1. Use any device to open</Text>
        <Button
          component="a"
          href="/auth/login"
          variant="default"
          fullWidth
          mt={0}
        >
          joinmyquiz.com
        </Button>
        <Text ta="center">2. Enter this code</Text>
        <Button
          component="a"
          href="/auth/login"
          variant="default"
          fullWidth
          mt={0}
        >
          code
        </Button>
      </Stack>
    </Paper>
  );
};
const ParticipantPaper = () => {
  return (
    <Paper
      p="lg"
      radius="md"
      shadow="sm"
      opacity={0.8}
      withBorder
      bg={"black"}
      w={"100%"}
    >
      <Stack>
        <Flex justify={"space-between"}>
          <Text c={"white"}>Participants</Text>
          <Group gap={8}>
            <IconUsers color="white"></IconUsers>
            <Text c={"white"}>so</Text>
          </Group>
        </Flex>
      </Stack>
    </Paper>
  );
};
const Monitor = ({ quizCode }: { quizCode: string }) => {
  const { client } = useSubscription();

  const { message, connected } = useWebSocket<any>(`/play/${quizCode}`, client);
  const handleStart = () => {
    client.publish({
      destination: `/start/${quizCode}`,
      body: "",
    });
  };
  return (
    <GameBackground className="flex items-center justify-center">
      <Paper p="lg" radius="md" shadow="sm" bg="dark" opacity={0.8} w={"50%"}>
        <Stack>
          <Flex justify={"space-between"} gap={10}>
            <JoinGamePaper />
            <ParticipantPaper />
          </Flex>
          <Group
            justify="
          space-between"
          >
            <Button onClick={handleStart} size="lg">
              Start
            </Button>
            <Button size="lg">End</Button>
          </Group>
        </Stack>
      </Paper>
    </GameBackground>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { quizCode } = context.query;
  return {
    props: {
      quizCode,
    },
  };
};

export default Monitor;
