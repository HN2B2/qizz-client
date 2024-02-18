import useSubscription from "@/hooks/useSubscription"
import useUser from "@/hooks/useUser"
import useWebSocket from "@/hooks/useWebSocket"
import { QuizResponse } from "@/types/quiz"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import { appUrl, instance } from "@/utils"
import { WebSocketRequest } from "@/utils/WebSocketRequest"
import {
    Container,
    Group,
    Paper,
    Text,
    Title,
    Tooltip,
    UnstyledButton,
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { modals } from "@mantine/modals"
import { IconUserFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"

interface TakeQuizProps {
    quiz: QuizResponse
}

const TakeQuiz = ({ quiz }: TakeQuizProps) => {
    const { client } = useSubscription()
    const { token } = useUser()

    const { message: roomInfo, connected } = useWebSocket<QuizRoomInfoResponse>(
        `/play/${quiz.code}`,
        client
    )

    const handleJoin = () => {
        client?.publish({
            destination: `/join/${quiz.code}`,
            body: new WebSocketRequest<string>("", token).toString(),
        })
    }

    useEffect(() => {
        if (connected) {
            handleJoin()
        }
    }, [connected])

    const clipboard = useClipboard({ timeout: 1000 })
    const handleCopyCode = () => {
        clipboard.copy(`${appUrl}/play/${quiz.code}`)
    }
    const handleShowQRCode = () => {
        modals.open({
            children: (
                <div className="flex justify-center">
                    <QRCodeSVG
                        value={`${appUrl}/play/${quiz.code}`}
                        size={512}
                    />
                </div>
            ),
        })
    }
    return (
        <div className="bg-[url('/bg/takequiz.jpg')] min-h-screen bg-center bg-cover h-max">
            <Head>
                <title>{`Game pin: ${quiz.code} | Qizz`}</title>
            </Head>
            <Container size="xl">
                <Group
                    justify="space-between"
                    align="start"
                    pb={48}
                    pt={32}
                    className="w-full"
                >
                    <div />
                    <Group>
                        <Paper p={16}>
                            <Text size="xl" fw={500}>
                                Game pin:
                            </Text>
                            <Tooltip
                                label={
                                    clipboard.copied
                                        ? "Link copied!"
                                        : "Copy link to share"
                                }
                                position="bottom"
                            >
                                <UnstyledButton onClick={handleCopyCode}>
                                    <Title
                                        order={1}
                                        size={64}
                                        ta="center"
                                        fw={800}
                                        className="tracking-widest"
                                    >
                                        {quiz.code}
                                    </Title>
                                </UnstyledButton>
                            </Tooltip>
                        </Paper>
                        <Paper p={10} pb={4}>
                            <Tooltip label="Expand QR code" position="bottom">
                                <UnstyledButton onClick={handleShowQRCode}>
                                    <QRCodeSVG
                                        value={`${appUrl}/play/${quiz.code}`}
                                    />
                                </UnstyledButton>
                            </Tooltip>
                        </Paper>
                    </Group>
                    <Group>
                        <Paper px={12} py={6}>
                            <Group gap={0}>
                                <IconUserFilled size={24} />
                                <Text size="xl" fw={500} ml={8}>
                                    {roomInfo?.current}
                                </Text>
                            </Group>
                        </Paper>
                    </Group>
                </Group>

                <Group pb={48} justify="center" align="center">
                    {roomInfo?.users.map((user) => (
                        <motion.div
                            key={user.email}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            <Paper shadow="md" p={16}>
                                <Text
                                    lineClamp={1}
                                    size="lg"
                                    truncate="end"
                                    fw={500}
                                >
                                    {user.displayName}
                                </Text>
                            </Paper>
                        </motion.div>
                    ))}
                </Group>
            </Container>
        </div>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { quizCode } = context.query
    const token = context.req.cookies.user
    try {
        const { data: quiz }: { data: QuizResponse } = await instance.get(
            `/quiz/${quizCode}`
        )
        if (!token) {
            return {
                redirect: {
                    destination: `/play/pre?code=${quiz.code}`,
                    permanent: false,
                },
            }
        }

        return {
            props: {
                quiz,
            },
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default TakeQuiz
