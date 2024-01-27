import { Question } from "@/types/question";
import { Box, Divider, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
interface Props {
  data: Question;
}
const FillInTheBlank = ({ data }: Props) => {
  console.log(data.correctAnswersMetadata);
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
      <Text>{data.correctAnswersMetadata} </Text>
    </Paper>
  );
};

export default FillInTheBlank;
