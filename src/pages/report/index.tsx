import { UserLayout } from "@/components/layouts"
import { ReportFilter, ReportPagination } from "@/components/report"
import ReportTableRow from "@/components/report/ReportTableRow"
import { GetAllReportResponse, ReportResponse } from "@/types/report"
import { getServerErrorNoti, instance, removeEmpty } from "@/utils"
import { Flex, Paper, Stack, Table, Text } from "@mantine/core"
import { GetServerSidePropsContext } from "next"

const PAGE_SIZE = 10
interface ReportProps {
    reports: ReportResponse[]
    total: number
    page: number
}

const Report = ({ reports, total, page }: ReportProps) => {
    return (
        <UserLayout>
            <Stack>
                <ReportFilter />
                <Paper p="lg" radius="md" shadow="sm">
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th />
                                {/* <Table.Th>Type</Table.Th> */}
                                <Table.Th>Quiz Name</Table.Th>
                                <Table.Th>Total Participants</Table.Th>
                                <Table.Th>State</Table.Th>
                                <Table.Th>Code</Table.Th>
                                <Table.Th>Created at</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {reports?.length === 0 && (
                                <Table.Tr>
                                    <Table.Td colSpan={7}>
                                        <Flex justify="center">
                                            <Text>No data</Text>
                                        </Flex>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                            {reports?.map((report, index) => (
                                <ReportTableRow
                                    key={report.quizId}
                                    report={report}
                                    index={(page - 1) * PAGE_SIZE + (index + 1)}
                                />
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
                <ReportPagination total={Math.ceil(total / PAGE_SIZE)} />
            </Stack>
        </UserLayout>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { req, query } = context
    const { page, name, from, to } = query
    try {
        const data: GetAllReportResponse = await instance
            .get("reports", {
                searchParams: removeEmpty({
                    page: page?.toString() || (1).toString(),
                    limit: PAGE_SIZE.toString(),
                    name: name as string,
                    from: from as string,
                    to: to as string,
                }),
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()

        return {
            props: {
                reports: data.data,
                total: data.total,
                page: page || 1,
            },
        }
    } catch (error) {
        console.log(getServerErrorNoti(error))

        return {
            notFound: true,
        }
    }
}

export default Report
