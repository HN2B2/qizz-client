import { GameBackground } from "@/components/common"
import useUser from "@/hooks/useUser"
import { MonitorContext } from "@/pages/monitor/[quizCode]"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import { WaitingRoomResponse } from "@/types/takeQuiz/waitingRoom/WaitingRoomResponse"
import { appUrl } from "@/utils"
import { WebSocketRequest } from "@/utils/WebSocketRequest"
import {
    Button,
    Divider,
    Flex,
    Group,
    Paper,
    Stack,
    Text,
    Tooltip,
    UnstyledButton,
} from "@mantine/core"
import { useClipboard, useListState } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { CompatClient } from "@stomp/stompjs"
import { IconDeviceGamepad, IconUsers } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { useContext, useEffect } from "react"

const JoinGamePaper = ({
    quiz,
}: {
    quiz: QuizRoomInfoResponse<WaitingRoomResponse>
}) => {
    const clipboard = useClipboard({ timeout: 1000 })
    const handleCopyCode = () => {
        clipboard.copy(`${appUrl}/play/${quiz.quizCode}`)
    }
    const handleShowQRCode = () => {
        modals.open({
            children: (
                <div className="flex justify-center">
                    <QRCodeSVG
                        value={`${appUrl}/play/${quiz.quizCode}`}
                        size={512}
                    />
                </div>
            ),
        })
    }
    return (
        <Paper p="lg" radius="md" shadow="sm" w={"100%"}>
            <Stack>
                <Flex justify={"space-between"}>
                    <Text>Join Game</Text>
                </Flex>
                <Text ta="center">1. Use any device to open</Text>
                <Button variant="default" fullWidth mt={0}>
                    qizz.tech
                </Button>
                <Text ta="center">2. Enter this code</Text>
                <Tooltip
                    label={
                        clipboard.copied ? "Link copied!" : "Copy link to share"
                    }
                    position="bottom"
                >
                    <Button
                        variant="default"
                        fullWidth
                        mt={0}
                        onClick={handleCopyCode}
                    >
                        {quiz.quizCode}
                    </Button>
                </Tooltip>
                <Divider label="Or scan QR code" />
                <Group justify="center" mt={10}>
                    <Tooltip label="Expand QR code" position="bottom">
                        <UnstyledButton onClick={handleShowQRCode}>
                            <QRCodeSVG
                                value={`${appUrl}/play/${quiz.quizCode}`}
                            />
                        </UnstyledButton>
                    </Tooltip>
                </Group>
            </Stack>
        </Paper>
    )
}

interface KickPlayerRequest {
    email: string
}

const ParticipantPaper = ({
    roomInfo,
    quiz,
    client,
}: {
    roomInfo: QuizRoomInfoResponse<WaitingRoomResponse> | null
    quiz: QuizRoomInfoResponse<WaitingRoomResponse>
    client: CompatClient
}) => {
    const [participants, handlers] = useListState(quiz.data.users)

    useEffect(() => {
        if (roomInfo) {
            handlers.setState(roomInfo.data.users)
        }
    }, [roomInfo])

    const { token } = useUser()
    const handleKick = (email: string) => {
        client.publish({
            destination: `/kick/${quiz.quizCode}`,
            body: new WebSocketRequest<KickPlayerRequest>(
                {
                    email,
                },
                token
            ).toString(),
        })
    }

    return (
        <Paper
            p="lg"
            radius="md"
            shadow="sm"
            withBorder
            bg={"black"}
            w={"100%"}
        >
            <Stack>
                <Flex justify={"space-between"}>
                    <Text c={"white"}>Participants</Text>
                    <Group gap={8}>
                        <IconUsers color="white"></IconUsers>
                        <Text c={"white"}>{participants.length}</Text>
                    </Group>
                </Flex>
                <Stack className="overflow-y-auto overflow-x-hidden">
                    <AnimatePresence>
                        {participants.map((participant) => (
                            <motion.div
                                key={participant.email}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}
                            >
                                <Tooltip
                                    label="Kick"
                                    position="right"
                                    offset={10}
                                >
                                    <Button
                                        variant="light"
                                        c={"white"}
                                        fullWidth
                                        onClick={() =>
                                            handleKick(participant.email)
                                        }
                                    >
                                        {participant.displayName}
                                    </Button>
                                </Tooltip>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Stack>
            </Stack>
        </Paper>
    )
}
const WaitingRoom = () => {
    const {
        message: roomInfo,
        client,
        connected,
        quiz,
    }: {
        message: QuizRoomInfoResponse<WaitingRoomResponse> | null
        client: CompatClient
        connected: boolean
        quiz: QuizRoomInfoResponse<WaitingRoomResponse>
    } = useContext(MonitorContext)!

    const { token } = useUser()
    const handleStart = () => {
        client.publish({
            destination: `/start/${quiz.quizCode}`,
            body: new WebSocketRequest<string>("", token).toString(),
        })
    }

    return (
        <GameBackground className="flex items-center justify-center">
            <Paper
                p="lg"
                radius="md"
                shadow="sm"
                bg="dark"
                opacity={0.8}
                w={"50%"}
            >
                <Stack>
                    <Flex justify={"space-between"} gap={10} h={500}>
                        <JoinGamePaper quiz={quiz} />
                        <ParticipantPaper
                            roomInfo={roomInfo}
                            quiz={quiz}
                            client={client}
                        />
                    </Flex>
                    <Group justify="center">
                        <Button
                            onClick={handleStart}
                            size="lg"
                            color="green"
                            leftSection={<IconDeviceGamepad />}
                        >
                            Start
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </GameBackground>
    )
}

export default WaitingRoom
