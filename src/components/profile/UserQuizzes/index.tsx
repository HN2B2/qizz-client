import { BankResponse } from "@/types/bank"
import { instance, removeEmpty } from "@/utils"
import {
    Avatar,
    Card,
    Flex,
    Grid,
    Group,
    NavLink,
    Paper,
    Stack,
    Text,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import {
    IconHeart,
    IconShare,
    IconThumbUp,
    IconUser,
    IconWallpaper,
} from "@tabler/icons-react"
import Link from "next/link"
interface QuizzesProps {
    quizzes: BankResponse[]
}
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
export const PAGE_SIZE = 2
const data = [
    {
        icon: IconUser,
        label: "Created by me",
        // description: "Item with description",
        value: "created",
    },
    {
        icon: IconHeart,
        label: "Liked by me",
        value: "liked",
        //   rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    },
    { icon: IconShare, label: "Shared with me", value: "shared" },
    { icon: IconThumbUp, label: "Upvoted by me", value: "upvoted" },
    { icon: IconWallpaper, label: "All my contents", value: "all" },
]
const UserQuizzes = ({ quizzes }: QuizzesProps) => {
    const [active, setActive] = useState(0)
    const [value, setValue] = useState("")

    const [bankList, handlers] = useListState<BankResponse>([])
    const [total, setTotal] = useState(0)
    const [activeTab, setActiveTab] = useState<string | null>("published")

    const router = useRouter()
    const {
        page = "1",
        keyword,
        order,
        sort,
        draft,
        subCategoryIds,
        tab = "created",
    } = router.query

    const handleFetchCategoryData = async () => {
        try {
            const bankData: { data: any; total: number } = await instance
                .get(`bank/all`, {
                    searchParams: removeEmpty({
                        limit: PAGE_SIZE,
                        page,
                        keyword,
                        order,
                        sort,
                        draft,
                        subCategoryIds,
                        tab,
                    }),
                })
                .json()
            handlers.setState(bankData.data)
            setTotal(bankData.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchCategoryData()
    }, [])

    useEffect(() => {
        handleFetchCategoryData()
    }, [page, keyword, order, sort, draft, subCategoryIds, tab])

    const handleActive = (index: number) => {
        setActive(index)
        router.push({
            pathname: "/my-library",
            query: {
                keyword,
                order,
                sort,
                page: "1",
                draft,
                subCategoryIds,
                tab: data[index].value,
            },
        })
    }

    const handleSearch = (value: string) => {
        setValue(value)
        router.push({
            pathname: "/my-library",
            query: {
                keyword: value,
                order,
                sort,
                page: "1",
                draft,
                subCategoryIds,
                tab,
            },
        })
    }

    const handleActiveTab = (value: string | null) => {
        setActiveTab(value)
        router.push({
            pathname: "/my-library",
            query: {
                keyword,
                order,
                sort,
                page: "1",
                draft: value === "published" ? false : true,
                subCategoryIds,
            },
        })
    }

    const items = data.map((item, index) => (
        <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            //   description={item.description}
            //   rightSection={item.rightSection}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => handleActive(index)}
        />
    ))
    const totalPage = Math.ceil(total / PAGE_SIZE)
    return (
        <Grid>
            <Grid.Col span={4}>
                <Stack gap={2}>
                    <Paper p="sm" radius="md" shadow="sm" mb="md">
                        <Text fw={500}>2 results</Text>
                    </Paper>
                    {quizzes.map((quiz) => (
                        <Card
                            p="xl"
                            radius="md"
                            shadow="sm"
                            // mb="md"
                            component={Link}
                            href={`/quiz/${quiz.quizBankId}`}
                            mt={5}
                        >
                            {/* <Paper p="sm" radius="md" shadow="sm" mb="md"> */}
                            <Card.Section>
                                <Group>
                                    <Avatar
                                        src={quiz.featuresImage}
                                        radius={"sm"}
                                    />
                                    <Stack gap={2}>
                                        <Text fw={500} size="lg">
                                            {quiz.name}
                                        </Text>
                                        <Flex justify="space-between">
                                            <Text size="sm">Question</Text>
                                        </Flex>
                                    </Stack>
                                </Group>
                            </Card.Section>

                            {/* </Paper> */}
                        </Card>
                    ))}
                </Stack>
            </Grid.Col>
            <Grid.Col span={8}>
                <Paper p="lg" radius="md" shadow="sm" mb="md"></Paper>
            </Grid.Col>
        </Grid>
    )
}

export default UserQuizzes
