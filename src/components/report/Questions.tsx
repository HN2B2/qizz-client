import { QuestionReportResponse } from "@/types/report";

interface QuestionDetailsProps {
  questions: QuestionReportResponse[];
}

import {
  Flex,
  Group,
  Select,
  Stack,
  Text,
  ActionIcon,
  rem,
} from "@mantine/core";
import {} from "@mantine/charts";
import {
  IconChevronDown,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import React, { useState } from "react";
import QuestionReportModal from "./QuestionReportModal";

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

const Questions = ({ questions }: QuestionDetailsProps) => {
  const [ascending, setAscending] = useState(true);
  const [sortedElements, setSortedElements] = useState(elements);
  const [selectedSortOption, setSelectedSortOption] = useState("Accuracy");
  const iconStyle = { width: rem(12), height: rem(12) };

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
            rightSection={<IconChevronDown style={iconStyle} />}
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
      {questions.map((question) => (
        <QuestionReportModal key={question.content} question={question} />
      ))}
    </Stack>
  );
};

export default Questions;
