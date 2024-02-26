import { formatDate } from "@/utils"
import { ActionIcon, Button, Flex, Group, Input, Text } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/router"
import React, { useState } from "react"

const ReportFilter = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [fromDate, setFromDate] = useState<Date | null>(null)
    const [toDate, setToDate] = useState<Date | null>(null)

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({
            pathname: "/report",
            query: {
                name,
                from: formatDate(fromDate),
                to: formatDate(toDate),
            },
        })
    }

    const handleClearFilter = () => {
        setName("")
        setFromDate(null)
        setToDate(null)
        router.push({
            pathname: "/report",
        })
    }
    return (
        <form onSubmit={handleFilter}>
            <Flex justify={"space-between"} align={"center"}>
                <Group>
                    <Text>Filter by: </Text>
                    <Input
                        value={name}
                        placeholder="Search by name"
                        w="400px"
                        onChange={(event) => setName(event.currentTarget.value)}
                    />

                    <Group>
                        <Text>From</Text>
                        <DatePickerInput
                            placeholder="Pick date"
                            value={fromDate}
                            onChange={setFromDate}
                            size="sm"
                        />
                        <Text>To</Text>
                        <DatePickerInput
                            placeholder="Pick date"
                            value={toDate}
                            onChange={setToDate}
                            size="sm"
                        />
                    </Group>
                </Group>
                <Group>
                    <Button type="submit">
                        <Text fw={"500"}>Filter</Text>
                    </Button>
                    <ActionIcon
                        type="button"
                        color="red"
                        p={"8"}
                        size={"lg"}
                        onClick={handleClearFilter}
                    >
                        <IconTrash size={"1rem"} />
                    </ActionIcon>
                </Group>
            </Flex>
        </form>
    )
}

export default ReportFilter
