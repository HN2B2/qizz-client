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
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
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
  numberQuestion = numberRight + numberWrong + numberNot;
  return (
    <RingProgress
      size={100}
      sections={[{ value: 40, color: "blue" }]}
      label={
        <Text c="blue" fw={500} ta="center" size="lg">
          {Math.round((numberRight / numberQuestion) * 100) + "%"}
        </Text>
      }
    />
  );
};
const elements = [
  {
    avatar: "",
    username: "Trang",
    createdAt: "2022-10-10",
    numberRight: 3,
    numberWrong: 2,
    numberNot: 1,
    score: 100,
  },
  {
    avatar: "",
    username: "Thang",
    createdAt: "2022-10-10",
    numberRight: 4,
    numberWrong: 2,
    numberNot: 0,
    score: 200,
  },
  {
    avatar: "",
    createdAt: "2022-10-10",
    username: "Quy",
    numberRight: 1,
    numberWrong: 2,
    numberNot: 3,
    score: 3,
  },
  {
    avatar: "",
    createdAt: "2022-10-10",
    username: "Dung",
    numberRight: 2,
    numberWrong: 3,
    numberNot: 1,
    score: 300,
  },
  {
    avatar: "",
    createdAt: "2022-10-10",
    username: "B",
    numberRight: 2,
    numberWrong: 3,
    numberNot: 1,
    score: 300,
  },
  {
    avatar: "",
    createdAt: "2022-10-10",
    username: "D",
    numberRight: 2,
    numberWrong: 3,
    numberNot: 1,
    score: 300,
  },
];

const ParticipantDetails = () => {
  return (
    <Stack>
      <ScrollArea h={500}>
        <Stack>
          <Flex justify={"space-between"}>
            <Avatar src="" size={50} radius="xl" />
          </Flex>
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
const Participants = () => {
  const [ascending, setAscending] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [sortedElements, setSortedElements] = useState(elements);
  const [selectedSortOption, setSelectedSortOption] = useState("Accuracy");
  // const [selectedElement, setSelectedElement] = useState< | null>(null);

  // const handleClick = elements.map((element)) => {
  //   setSelectedElement(element);
  //   open();
  // };

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
            return (
              a.numberRight / (a.numberNot + a.numberRight + a.numberWrong) -
              b.numberRight / (b.numberNot + b.numberRight + b.numberWrong)
            );
          } else {
            return (
              -a.numberRight / (a.numberNot + a.numberRight + a.numberWrong) +
              b.numberRight / (b.numberNot + b.numberRight + b.numberWrong)
            );
          }
        });
        break;
      case "Points":
        sortedArray = [...sortedElements].sort((a, b) => {
          return (
            a.numberRight / (a.numberNot + a.numberRight + a.numberWrong) -
            b.numberRight / (b.numberNot + b.numberRight + b.numberWrong)
          );
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
  const sortedRows = sortedElements.map((element) => (
    <Table.Tr key={element.username} onClick={() => open()}>
      <Table.Td w={"20%"}>
        <Group>
          <Avatar variant="filled" src={element.avatar} />
          {element.username}
        </Group>
      </Table.Td>
      <Table.Td w={"40%"}>
        <Diagram
          numberRight={element.numberRight}
          numberWrong={element.numberWrong}
          numberNot={element.numberNot}
          numberQuestion={
            element.numberRight + element.numberWrong + element.numberNot
          }
        />
      </Table.Td>
      <Table.Td w={"20%"}>
        <Accuracy
          numberRight={element.numberRight}
          numberWrong={element.numberWrong}
          numberNot={element.numberNot}
          numberQuestion={
            element.numberRight + element.numberWrong + element.numberNot
          }
        />
      </Table.Td>
      <Table.Td w={"10%"}>
        <Flex gap={0}>
          <Text size="lg">{element.numberRight}</Text>
          <Text size="sm">
            /{element.numberRight + element.numberWrong + element.numberNot}
          </Text>
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
            <Group gap={5}>
              <ColorSwatch color="#f5f5f5" radius={"sm"} size={20} />
              <Text size="sm">Unattempted</Text>
            </Group>
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
            <ParticipantDetails />
          </Modal>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Participants;
