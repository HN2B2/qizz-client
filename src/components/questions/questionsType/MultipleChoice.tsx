import { Question } from "@/types/question";
import { Box, Divider, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

interface Props {
  data: Question;
}
const MultipleChoice = ({ data }: Props) => {
  return (
    <Paper px="xl" py="xs">
      <Text>{data.content}</Text>
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
      <SimpleGrid cols={2} verticalSpacing="sm">
        {data.answersMetadata?.map((answer, index) => (
          <Box my={0} display={"flex"} key={index}>
            {data.correctAnswersMetadata?.includes(answer) ? (
              <IconCheck height={"100%"} color="green" size={14}></IconCheck>
            ) : (
              <IconX height={"100%"} color="red" size={14}></IconX>
            )}
            <Text>{answer}</Text>
          </Box>
        ))}
        {/* <Box display={"flex"}>
          <IconCheck height={"100%"} color="green" size={14}></IconCheck>
          <Text>{data.answersMetadata ? data.answersMetadata[0] : ""}</Text>
        </Box>
        <Box my={0} display={"flex"}>
          <IconX height={"100%"} color="red" size={14}></IconX>
          <Text>Lorem</Text>
        </Box>
        <Box my={0} display={"flex"}>
          <IconX height={"100%"} color="red" size={14}></IconX>
          <Text>Lorem</Text>
        </Box>
        <Box my={0} display={"flex"}>
          <IconX height={"100%"} color="red" size={14}></IconX>
          <Text>Lorem</Text>
        </Box>
        <Box my={0} display={"flex"}>
          <IconX height={"100%"} color="red" size={14}></IconX>
          <Text>Lorem</Text>
        </Box> */}
      </SimpleGrid>
    </Paper>
  );
};

export default MultipleChoice;
