import {
  Flex,
  Group,
  Select,
  Stack,
  Text,
  Paper,
  ActionIcon,
  ColorSwatch,
  RingProgress,
  Progress,
  Table,
  Avatar,
  Modal,
  ScrollArea,
} from "@mantine/core";
import {} from "@mantine/charts";
import {
  IconChevronDown,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import ParticipantDetail from "./ParticipantDetail";
import React, { useEffect, useState } from "react";
import { useDisclosure, useListState } from "@mantine/hooks";
import {
  AllParticipantQuizResponse,
  ParticipantQuizResponse,
} from "@/types/report";
import { instance } from "@/utils";
import { useRouter } from "next/router";
const Diagram = ({
  numberRight,
  numberWrong,
  numberNot,
  numberQuestion,
}: {
  numberRight: number;
  numberWrong: number;
  numberNot: number;
  numberQuestion: number;
}) => {
  numberQuestion = numberRight + numberWrong + numberNot;
  return (
    <Progress.Root size={"lg"} w={"90%"}>
      <Progress.Section
        value={(numberRight / numberQuestion) * 100}
        color="#00c985"
      ></Progress.Section>
      <Progress.Section
        value={(numberWrong / numberQuestion) * 100}
        color="#ef3c69"
      ></Progress.Section>
      <Progress.Section
        value={(numberNot / numberQuestion) * 100}
        color="#f5f5f5"
      ></Progress.Section>
    </Progress.Root>
  );
};
const Accuracy = ({
  numberRight,
  numberWrong,
  numberNot,
  numberQuestion,
}: {
  numberRight: number;
  numberWrong: number;
  numberNot: number;
  numberQuestion: number;
}) => {
  return (
    <RingProgress
      size={100}
      sections={[
        {
          value: Math.round((numberRight / numberQuestion) * 100),
          color: "blue",
        },
      ]}
      label={
        <Text c="blue" fw={500} ta="center" size="lg">
          {Math.round((numberRight / numberQuestion) * 100) + "%"}
        </Text>
      }
    />
  );
};

const Participants = () => {
  const [ascending, setAscending] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [participants, listParticipants] =
    useListState<ParticipantQuizResponse>([]);
  const [sortedElements, setSortedElements] = useState(participants);
  const [selectedSortOption, setSelectedSortOption] = useState("Accuracy");
  const { quizId } = useRouter().query;
  const [id, setId] = useState<number>(0);
  const [participant, setParticipant] = useState<ParticipantQuizResponse>(
    participants[0]
  );
  // const [selectedElement, setSelectedElement] = useState< | null>(null);

  // const handleClick = elements.map((element)) => {
  //   setSelectedElement(element);
  //   open();
  // };

  const fetchData = async () => {
    const data: AllParticipantQuizResponse = await instance
      .get(`reports/${quizId}/participant`)
      .json();
    if (data) {
      listParticipants.setState(data.data);
      setSortedElements(data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSortChange = ({
    sortOption,
    IconSort,
  }: {
    sortOption: string;
    IconSort: boolean;
  }) => {
    let sortedArray;
    switch (sortOption) {
      case "Accuracy":
        sortedArray = [...sortedElements].sort((a, b) => {
          if (IconSort) {
            return a.point / a.totalQuestion - b.point / b.totalQuestion;
          } else {
            return -a.point / a.totalQuestion + b.point / b.totalQuestion;
          }
        });
        break;
      case "Points":
        sortedArray = [...sortedElements].sort((a, b) => {
          return a.point / a.totalQuestion - b.point / b.totalQuestion;
        });
        break;
      // Add cases for other sort options
      default:
        sortedArray = sortedElements;
    }
    setSortedElements(sortedArray);
  };
  const handleClickSort = (sortOption: string) => {
    setAscending(!ascending);
    handleSortChange({ sortOption, IconSort: ascending });
  };

  const handleClick = (id: number, participant: ParticipantQuizResponse) => {
    setId(() => id);
    setParticipant(() => participant);
    open();
  };
  const sortedRows = sortedElements.map((element) => (
    <Table.Tr
      key={element.userId}
      onClick={() => handleClick(element.quizJoinedUserId, element)}
    >
      <Table.Td w={"20%"}>
        <Group>
          <Avatar variant="filled" />
          {element.displayName}
        </Group>
      </Table.Td>
      <Table.Td w={"40%"}>
        <Diagram
          numberRight={element.point}
          numberWrong={element.totalQuestion - element.point}
          numberNot={0}
          numberQuestion={element.totalQuestion}
        />
      </Table.Td>
      <Table.Td w={"20%"}>
        <Accuracy
          numberRight={element.point}
          numberWrong={element.totalQuestion - element.point}
          numberNot={0}
          numberQuestion={element.totalQuestion}
        />
      </Table.Td>
      <Table.Td w={"10%"}>
        <Flex gap={0}>
          <Text size="lg">{element.point}</Text>
          <Text size="sm">/{element.totalQuestion}</Text>
        </Flex>
      </Table.Td>
      <Table.Td w={"10%"}>{element.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Stack mt={10}>
      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Group>
          <Text>Sort by: </Text>
          <Select
            value={selectedSortOption}
            // onChange={(e) => {
            //   if (e != null) {
            //     setSelectedSortOption(e.target.value);
            //   }
            // }}
            rightSection={<IconChevronDown size={14} stroke={1.5} />}
            size="sm"
            data={["Accuracy", "Points", "Score", "Name", "Submission time"]}
          />
        </Group>
        <ActionIcon
          onClick={() => handleClickSort(selectedSortOption)}
          variant="default"
          size="lg"
        >
          {ascending ? <IconSortAscending /> : <IconSortDescending />}
        </ActionIcon>
      </Flex>
      <Paper p="lg" radius="md" shadow="sm" withBorder>
        <Stack>
          <Flex
            // mih={50}
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Group gap={5}>
              <ColorSwatch color="green" radius={"sm"} size={20} />
              <Text size="sm">Correct</Text>
            </Group>
            <Group gap={5}>
              <ColorSwatch color="red" radius={"sm"} size={20} />
              <Text size="sm">Incorrect</Text>
            </Group>
            {/* <Group gap={5}>
              <ColorSwatch color="#f5f5f5" radius={"sm"} size={20} />
              <Text size="sm">Unattempted</Text>
            </Group> */}
          </Flex>
          <ScrollArea h={500}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th>Accuracy</Table.Th>
                  <Table.Th>Points</Table.Th>
                  <Table.Th>Score</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{sortedRows}</Table.Tbody>
            </Table>
          </ScrollArea>

          <Modal
            size={"60%"}
            opened={opened}
            onClose={close}
            centered
            overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }}
            transitionProps={{
              transition: "fade",
              duration: 600,
              timingFunction: "linear",
            }}
          >
            <ParticipantDetail participant={participant} id={id} />
          </Modal>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Participants;
