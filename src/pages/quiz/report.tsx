import { UserLayout } from "@/components/layouts";

import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconChevronDown, IconDotsVertical } from "@tabler/icons-react";
import { log } from "console";
import { link } from "fs";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { Component, useState } from "react";
const elements = [
  {
    Type: 1,
    QuizName: "12.011",
    TotalParticipants: "C",
    Accuracy: "Carbon",
    Code: "123",
    Class: "C",
    Actions: "C",
  },
  {
    Type: 2,
    QuizName: "12.011",
    TotalParticipants: "C",
    Accuracy: "Carbon",
    Code: "123",
    Class: "C",
    Actions: "C",
  },
  {
    Type: 3,
    QuizName: "12.011",
    TotalParticipants: "C",
    Accuracy: "Carbon",
    Code: "123",
    Class: "C",
    Actions: "C",
  },
  {
    Type: 4,
    QuizName: "12.011",
    TotalParticipants: "C",
    Accuracy: "Carbon",
    Code: "123",
    Class: "C",
    Actions: "C",
  },
  {
    Type: 5,
    QuizName: "12.011",
    TotalParticipants: "C",
    Accuracy: "Carbon",
    Code: "123",
    Class: "C",
    Actions: "C",
  },
];
const Report = () => {
  const [valueStart, setValueStart] = useState<Date | null>(null);
  const [valueEnd, setValueEnd] = useState<Date | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleRowClick = () => {
    window.location.href = `/quiz/report-detail`;
  };
  const rows = elements.map((element) => (
    <Table.Tr
      key={element.QuizName}
      bg={
        selectedRows.includes(element.Type)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
      onClick={handleRowClick}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.Type)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.Type]
                : selectedRows.filter((Type) => Type !== element.Type)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.Type}</Table.Td>
      <Table.Td>{element.QuizName}</Table.Td>
      <Table.Td>{element.TotalParticipants}</Table.Td>
      <Table.Td>{element.Accuracy}</Table.Td>
      <Table.Td>{element.Code}</Table.Td>
      <Table.Td>{element.Class}</Table.Td>
      <Table.Td>{element.Actions}</Table.Td>
      {/* <Table.Td>{IconDotsVertical}</Table.Td> */}
    </Table.Tr>
  ));
  return (
    <UserLayout>
      <Stack>
        <Flex justify={"space-between"}>
          <Group>
            <Text>Filter by: </Text>
            <Select
              defaultValue={"All games"}
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              size="sm"
              data={["All games", "Scheduled", "Running", "Completed"]}
            />
            <Select
              defaultValue={"All reports"}
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              size="sm"
              data={["All reports", "My reports", "Shared reports"]}
            />
            <Select
              defaultValue={"All classes"}
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              size="sm"
              data={["All classes"]}
            />
            <Group>
              <Text>From</Text>
              <DatePickerInput
                placeholder="Pick date"
                value={valueStart}
                onChange={setValueStart}
                size="sm"
                // w={"40%"}
              />
              <Text>To</Text>
              <DatePickerInput
                placeholder="Pick date"
                value={valueEnd}
                onChange={setValueEnd}
                size="sm"
                // w={"40%"}
              />
            </Group>
          </Group>
          <UnstyledButton>Clear all</UnstyledButton>
        </Flex>
        <Paper p="lg" radius="md" shadow="sm">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Type</Table.Th>
                <Table.Th>Quiz Name</Table.Th>
                <Table.Th>Total Participants</Table.Th>
                <Table.Th>Accuracy</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>Class</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
        <Pagination.Root total={10}>
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      </Stack>
    </UserLayout>
  );
};

export default Report;
