import { QuestionResponse } from "@/types/question";
import { Box, Divider, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
interface Props {
  data: QuestionResponse;
}
const FillInTheBlank = ({ data }: Props) => {
  const correctAnswersMetadata: string[] = JSON.parse(
    data.correctAnswersMetadata.replaceAll("'", '"')
  );
  // console.log(data.correctAnswersMetadata);
  return (
    <Paper px="xl" py="xs" shadow="xs">
      {/* <Text>{data.content}</Text> */}
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
      <Text>{correctAnswersMetadata[0]} </Text>
    </Paper>
  );
};

export default FillInTheBlank;
