import { QuestionType } from "@/types/question/QuestionType";
import {
  AppShell,
  Button,
  Group,
  HoverCard,
  Menu,
  Select,
  Text,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlarm,
  IconChevronLeft,
  IconDeviceFloppy,
  IconRectangle,
  IconSquareCheck,
  IconTrophy,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const questionTypes = [
  {
    label: "Multiple Choice",
    icon: <IconSquareCheck style={{ width: rem(14), height: rem(14) }} />,
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    label: "Fill in the blank",
    icon: <IconRectangle style={{ width: rem(14), height: rem(14) }} />,
    type: QuestionType.FILL_IN_THE_BLANK,
  },
];

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

const questionTypeLabel: Record<QuestionType, string> = {
  [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
  [QuestionType.FILL_IN_THE_BLANK]: "Fill in the blank",
};

const CreateQuestionHeader = () => {
  const router = useRouter();
  const { questionId, type } = router.query;

  const handleCreateNewQuestion = () => {
    notifications.show({
      color: "green",
      title: "ABC",
      message: "Create question successfully",
    });
  };
  return (
    <AppShell.Header>
      <Group h="100%" justify="space-between" w={"100%"} px={8}>
        <Group p={8}>
          <Button
            variant="light"
            component="a"
            href={` /bank/${questionId}/edit `}
          >
            <IconChevronLeft />
          </Button>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="light">
                {questionTypeLabel[type as keyof typeof QuestionType]}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              {questionTypes.map((item) => (
                <Menu.Item key={item.type} leftSection={item.icon}>
                  <Link
                    href={` /bank/${questionId}/edit/create?type=${item.type}`}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group p={8}>
          <Select
            w={150}
            //   label=""
            leftSection={<IconAlarm size={"1rem"} />}
            placeholder="Pick value"
            data={times}
            defaultValue={times[1].value}
            allowDeselect={false}
            title="Test"
          />

          <Select
            w={150}
            leftSection={<IconTrophy size={"1rem"} />}
            placeholder="Pick value"
            data={points}
            defaultValue={points[0].value}
            allowDeselect={false}
          />

          <Button
            variant="filled"
            leftSection={<IconDeviceFloppy size={"1rem"} />}
            onClick={handleCreateNewQuestion}
          >
            Save question
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default CreateQuestionHeader;
