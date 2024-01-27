import {
  Box,
  Button,
  CheckIcon,
  Combobox,
  Divider,
  Group,
  InputBase,
  Paper,
  Pill,
  Text,
  useCombobox,
  Input,
  Select,
  HoverCard,
} from "@mantine/core";
import {
  IconAlarm,
  IconCopyPlus,
  IconGripVertical,
  IconPencil,
  IconTrash,
  IconTrophy,
} from "@tabler/icons-react";
import React, { useState } from "react";
import MultipleChoice from "./questionsType/MultipleChoice";
import FillInTheBlank from "./questionsType/FillInTheBlank";
import { QuestionType } from "@/types/question/QuestionType";
import { Question } from "@/types/question";

const times = [
  {
    value: "15",
    label: "15 seconds",
  },
  {
    value: "30",
    label: "30 seconds",
  },
  {
    value: "60",
    label: "1 minute",
  },
  {
    value: "120",
    label: "2 minutes",
  },
  {
    value: "300",
    label: "5 minutes",
  },
];

const points = [
  {
    value: "1",
    label: "1 point",
  },
  {
    value: "2",
    label: "2 points",
  },
  {
    value: "3",
    label: "3 points",
  },
  {
    value: "4",
    label: "4 points",
  },
];

interface Props {
  type: string;
  data: Question;
}
const Question = ({ type, data }: Props) => {
  const QuestionTypes: Record<QuestionType, React.ReactNode> = {
    [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice data={data} />,
    [QuestionType.FILL_IN_THE_BLANK]: <FillInTheBlank data={data} />,
  };
  const questionType: QuestionType =
    QuestionType[type as keyof typeof QuestionType];

  return (
    <Paper shadow="md" withBorder my={"sm"}>
      <Group justify="space-between">
        <Pill.Group p={8}>
          <Pill p={0} radius={0}>
            <IconGripVertical></IconGripVertical>
          </Pill>
          <Pill variant="transparent">Question {data.questionIndex}</Pill>
          {/* <Button variant="default">Third</Button> */}
        </Pill.Group>
        <Button.Group p={8}>
          <HoverCard shadow="md" position="top" closeDelay={0}>
            <HoverCard.Target>
              <Button variant="default" p={6} mx={4}>
                <IconPencil size={16}></IconPencil>Edit
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown bg={"#000"}>
              <Text size="sm" c={"#fff"}>
                Edit this question
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <HoverCard shadow="md" position="top" closeDelay={0}>
            <HoverCard.Target>
              <Button variant="default" p={6} mx={4}>
                <IconCopyPlus size={16}></IconCopyPlus>
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown bg={"#000"}>
              <Text size="sm" c={"#fff"}>
                Duplicate this question
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <HoverCard shadow="md" position="top" closeDelay={0}>
            <HoverCard.Target>
              <Button variant="default" p={6} mx={4}>
                <IconTrash size={16}></IconTrash>
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown bg={"#000"}>
              <Text size="sm" c={"#fff"}>
                Delete this question
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Button.Group>
      </Group>
      {/* <FillInTheBlank></FillInTheBlank> */}
      {/* <MultipleChoice></MultipleChoice> */}
      {QuestionTypes[questionType]}
      {/* <Paper px="xl" py="xs">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          expedita error. Enim ut suscipit saepe amet hic quis quos
          exercitationem fuga, vero, commodi praesentium, perferendis rerum?
          Ducimus nemo dolores assumenda?
        </Text>
        <Divider
          my="sm"
          variant="dashed"
          labelPosition="left"
          label={
            <>
              <Box ml={5}>Answer</Box>
            </>
          }
        />
      </Paper> */}
      <Group p={8}>
        <HoverCard shadow="md" position="top" closeDelay={0}>
          <HoverCard.Target>
            <Select
              w={150}
              //   label=""
              leftSection={<IconAlarm></IconAlarm>}
              placeholder="Pick value"
              data={times}
              defaultValue={data.duration.toString()}
              allowDeselect={false}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown bg={"#000"}>
            <Text c={"#fff"} size="sm">
              Set time alloted to answer this question
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <HoverCard position="top" shadow="md" closeDelay={0}>
          <HoverCard.Target>
            <Select
              w={150}
              //   label=""
              leftSection={<IconTrophy></IconTrophy>}
              placeholder="Pick value"
              data={points}
              defaultValue={data.point.toString()}
              allowDeselect={false}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown bg={"#000"}>
            <Text size="sm" c={"#fff"}>
              Change question points
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </Paper>
  );
};

export default Question;
