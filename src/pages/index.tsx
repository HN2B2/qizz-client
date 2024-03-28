export const runtime = "experimental-edge"

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
const Home = ({ categoryQuizBanksData }: Props) => {
    const [data, setData] = useState([])
    const icon = <IconInfoCircle />
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.values.code) {
            return
        }
        router.push(`/play/${form.values.code}`)
    }

    const { user } = useUser()

    return (
        <HeaderLayout>
            <Container size="xl"></Container>
        </HeaderLayout>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const { req, query } = context
        const { page = "1", keyword, order, sort } = query

        const res = await instance
            .get(`bank/all/categories/10`, {
                headers: {
                    Cookie: req.headers.cookie || "",
                },
            })
            .json()
        const categoryQuizBanksData = res

        return {
            props: {
                categoryQuizBanksData,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}

export default Home
