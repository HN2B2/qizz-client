import { ReportResponse } from "@/types/report"
import { formatDate } from "@/utils"
import { ActionIcon, Table, Text, Tooltip } from "@mantine/core"
import { IconEye } from "@tabler/icons-react"
import Link from "next/link"

const ReportTableRow = ({
    index,
    report,
}: {
    index: number
    report: ReportResponse
}) => {
    return (
        <Table.Tr>
            <Table.Td>
                <Text>{index}</Text>
            </Table.Td>
            <Table.Td>{report.quizName}</Table.Td>
            <Table.Td>{report.totalParticipant}</Table.Td>
            <Table.Td>{report.state}</Table.Td>
            <Table.Td>{report.quizCode}</Table.Td>
            <Table.Td>{formatDate(report.createdAt)}</Table.Td>
            <Table.Td>
                <Tooltip label="View report detail">
                    <ActionIcon
                        variant="default"
                        aria-label="Settings"
                        component={Link}
                        href={` /report/${report.quizId} `}
                    >
                        <IconEye
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Tooltip>
            </Table.Td>
        </Table.Tr>
    )
}

export default ReportTableRow
