import { QuestionResponse } from "@/types/question"
import { renderHTML } from "@/utils"
import {
    Box,
    Divider,
    Paper,
    SimpleGrid,
    Text,
    TypographyStylesProvider,
} from "@mantine/core"
import React from "react"
interface Props {
    data: QuestionResponse
    show: boolean
}
const FillInTheBlank = ({ data, show }: Props) => {
    const correctAnswersMetadata: string[] = JSON.parse(
        data.correctAnswersMetadata
    )
    // console.log(data.correctAnswersMetadata);
    return (
        <Paper px="xl" py="xs" shadow="xs">
            {/* <Text>{data.content}</Text> */}
            <TypographyStylesProvider>
                <div
                    dangerouslySetInnerHTML={{
                        __html: renderHTML(data.content),
                    }}
                />
            </TypographyStylesProvider>
            {show && (
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
            )}
            {show && <Text>{correctAnswersMetadata[0]} </Text>}
        </Paper>
    )
}

export default FillInTheBlank
