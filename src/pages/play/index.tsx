import { BackgroundGradientAnimation } from "@/components/common/BackgroundGradientAnimation"
import { QuizResponse } from "@/types/quiz"
import { getServerErrorNoti, instance } from "@/utils"
import {
    Button,
    Container,
    Group,
    Image,
    Input,
    Paper,
    Stack,
    Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

const PlayPage = () => {
    const [error, setError] = useState("")
    const [quizCode, setQuizCode] = useState("")
    const [loading, { close: closeLoading, open: openLoading }] =
        useDisclosure()

    const isValidQuizCode = (value: string) => {
        if (isNaN(Number(value))) {
            setError("Quiz code must be a number")
            return false
        }
        if (value.length !== 8) {
            setError("Quiz code must be 8 digits")
            return false
        }
        setError("")
        return true
    }
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        openLoading()
        if (!isValidQuizCode(quizCode)) {
            closeLoading()
            return
        }
        try {
            const data: QuizResponse = await instance
                .get(`quiz/${quizCode}`)
                .json()
            router.push(`/play/${data.code}`)
        } catch (error) {
            setError(getServerErrorNoti(error))
        } finally {
            closeLoading()
        }
    }
    return (
        <>
            <Head>
                <title>Play | Qizz</title>
            </Head>
            <BackgroundGradientAnimation>
                <div className="absolute inset-0 w-full h-full bg-slate-900/70 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
                <Container className="absolute z-50 inset-0 h-screen w-full flex items-center justify-center">
                    <Stack justify="center" align="center">
                        <Image
                            src="/logo/logo-3-white.png"
                            className="h-40 mb-10 drop-shadow-lg"
                        />
                        <form onSubmit={handleSubmit} className="w-full">
                            <Group>
                                <Input
                                    placeholder="Enter quiz code"
                                    size="xl"
                                    radius="md"
                                    value={quizCode}
                                    onChange={(e) => {
                                        setError("")
                                        setQuizCode(e.currentTarget.value)
                                    }}
                                    maxLength={8}
                                    className="w-[400px] shadow-lg"
                                />
                                <Button
                                    size="xl"
                                    radius="md"
                                    type="submit"
                                    className="shadow-lg"
                                    loading={loading}
                                >
                                    Join
                                </Button>
                            </Group>
                        </form>
                        {error.length > 0 && (
                            <Paper
                                className="w-full drop-shadow-lg"
                                bg="red"
                                c="white"
                                p="md"
                                radius="md"
                            >
                                <Text ta="center">{error}</Text>
                            </Paper>
                        )}
                    </Stack>
                </Container>
            </BackgroundGradientAnimation>
        </>
    )
}

export default PlayPage
