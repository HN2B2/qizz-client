import React, { useState } from "react"
import {
    Container,
    Grid,
    Button,
    Paper,
    TextInput,
    Text,
    Avatar,
    Blockquote,
    Title,
    Group,
    Stack,
    Flex,
} from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { Carousel } from "@mantine/carousel"
import { useForm } from "@mantine/form"
import QuizCard from "@/components/cards/QuizCard"
import Category from "@/types/category/Category"
import { BankResponse } from "@/types/bank"
import Link from "next/link"
import { HeaderLayout } from "@/components/layouts"
import UserResponse, { UserRole } from "@/types/user/UserResponse"
import useUser from "@/hooks/useUser"
import { GetServerSidePropsContext } from "next"
import { instance } from "@/utils"
import BankCard from "@/components/cards/BankCard"
import { useRouter } from "next/router"
import { getHotkeyHandler } from "@mantine/hooks"

interface CategoryQuizBanks {
    category: Category
    banks: BankResponse[]
}

interface Props {
    categoryQuizBanksData: CategoryQuizBanks[]
}
const PopularQuiz = () => {
    const icon = <IconInfoCircle />
    return (
        <Carousel
            withIndicators
            height={200}
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
            slideGap={{ base: 0, sm: "md" }}
            loop
            align="start"
        >
            <Carousel.Slide>
                <Blockquote
                    color="blue"
                    cite="– Forrest Gump"
                    icon={icon}
                    mt="xl"
                >
                    Life is like an npm install – you never know what you are
                    going to get.
                </Blockquote>
            </Carousel.Slide>
            <Carousel.Slide>
                <Blockquote
                    color="blue"
                    cite="– Forrest Gump"
                    icon={icon}
                    mt="xl"
                >
                    Life is like an npm install – you never know what you are
                    going to get.
                </Blockquote>
            </Carousel.Slide>
            <Carousel.Slide>
                <Blockquote
                    color="blue"
                    cite="– Forrest Gump"
                    icon={icon}
                    mt="xl"
                >
                    Life is like an npm install – you never know what you are
                    going to get.
                </Blockquote>
            </Carousel.Slide>
            <Carousel.Slide>
                <Blockquote
                    color="blue"
                    cite="– Forrest Gump"
                    icon={icon}
                    mt="xl"
                >
                    Life is like an npm install – you never know what you are
                    going to get.
                </Blockquote>
            </Carousel.Slide>
        </Carousel>
    )
}
const Home = () => {
    const [data, setData] = useState([])
    const icon = <IconInfoCircle />
    const [search, setSearch] = useState("")
    const handleSearch = () => {
        router.push(`/search?keyword=${search}`)
    }
    const form = useForm({
        initialValues: { code: "" },

        validate: {
            code: (value: string) => {
                if (isNaN(Number(value))) {
                    return "Quiz code must be a number"
                }
                if (value.length !== 8) {
                    return "Quiz code must be 8 digits"
                }
                return null
            },
        },
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        form.validate()
        if (!form.values.code) {
            setLoading(false)
            return
        }
        router.push(`/play/${form.values.code}`)
    }

    const [profileLoading, setProfileLoading] = useState(false)

    const { user } = useUser()

    return (
        <HeaderLayout>
            <Container size="xl">
                <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
                    <Grid.Col span={{ base: 12, md: 8, lg: 8, xs: 7 }}>
                        <Paper
                            py={{ base: "xs", sm: "md", lg: "xl" }}
                            c="#fff"
                            ta="center"
                            m="auto"
                            radius="md"
                            h="100%"
                            shadow="md"
                            withBorder
                            mih="300"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <Flex justify={"space-between"} gap={20}>
                                    <TextInput
                                        placeholder="Enter code: "
                                        w={{ base: 300, sm: 400, lg: 500 }}
                                        size="lg"
                                        mx="auto"
                                        radius="md"
                                        {...form.getInputProps("code")}
                                        maxLength={8}
                                    />
                                    <Button
                                        variant="filled"
                                        type="submit"
                                        size="lg"
                                        radius="md"
                                        loading={loading}
                                    >
                                        Join
                                    </Button>
                                </Flex>
                            </form>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4, lg: 4, xs: 5 }}>
                        <Paper
                            radius="md"
                            withBorder
                            p="lg"
                            bg="var(--mantine-color-body)"
                            h="100%"
                            shadow="md"
                        >
                            <Avatar
                                // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                                size={120}
                                radius={120}
                                mx="auto"
                            />
                            <Text ta="center" fz="lg" fw={500} mt="md">
                                {user?.displayName ||
                                    "Login to view your profile"}
                            </Text>
                            <Text ta="center" c="dimmed" fz="sm">
                                @{user?.username || ""}
                            </Text>

                            <Button
                                component={Link}
                                href="/profile"
                                variant="default"
                                fullWidth
                                mt="md"
                                loading={profileLoading}
                                onClick={() => setProfileLoading(true)}
                            >
                                View profile
                            </Button>
                        </Paper>
                    </Grid.Col>
                </Grid>
                <Title order={1} my="xl" w="100%" ta="left">
                    Popular Quizzes
                </Title>
                <PopularQuiz />
                <Stack align="center">
                    <Title order={2}>Search for Quiz Bank</Title>
                    <TextInput
                        size="lg"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={getHotkeyHandler([["Enter", handleSearch]])}
                    />
                </Stack>
            </Container>
        </HeaderLayout>
    )
}

export default Home
