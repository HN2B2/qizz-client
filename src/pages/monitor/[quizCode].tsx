export const runtime = "experimental-edge"

import { EndGame, PlayingRoom, WaitingRoom } from "@/components/monitor"
import { GameBackground } from "@/components/play"
import useSubscription from "@/hooks/useSubscription"
import useWebSocket from "@/hooks/useWebSocket"
import { QuizState } from "@/types/quiz/QuizState"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import { WaitingRoomResponse } from "@/types/takeQuiz/waitingRoom/WaitingRoomResponse"
import { instance } from "@/utils"
import { Button, Flex, Group, Paper, Stack, Text } from "@mantine/core"
import { CompatClient } from "@stomp/stompjs"
import { IconUsers } from "@tabler/icons-react"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Link from "next/link"
import { notFound } from "next/navigation"
import React, { createContext, useEffect, useState } from "react"
interface MonitorContextProps {
    message: QuizRoomInfoResponse<any> | null
    quiz: QuizRoomInfoResponse<WaitingRoomResponse>
    client: CompatClient
    connected: boolean
    children?: React.ReactNode
}

export const MonitorContext = createContext<MonitorContextProps | null>(null)

export const MonitorProvider: React.FC<MonitorContextProps> = ({
    message,
    quiz,
    client,
    connected,
    children,
}) => {
    return (
        <MonitorContext.Provider
            value={{
                message,
                quiz,
                client,
                connected,
            }}
        >
            <Head>
                <title>Monitor</title>
            </Head>
            {children}
        </MonitorContext.Provider>
    )
}
const Monitor = ({
    quizCode,
    quiz,
}: {
    quizCode: string
    quiz: QuizRoomInfoResponse<WaitingRoomResponse>
}) => {
    const [quizState, setQuizState] = useState<QuizState>(quiz.state)

    const { client } = useSubscription()

    const { message, connected } = useWebSocket<QuizRoomInfoResponse<any>>(
        `/play/${quizCode}`,
        client
    )

    useEffect(() => {
        if (message) {
            setQuizState(message.state)
        }
    }, [message])

    switch (quizState) {
        case QuizState.WAITING:
            return (
                <MonitorProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <WaitingRoom />
                </MonitorProvider>
            )
        case QuizState.STARTED:
            return (
                <MonitorProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <PlayingRoom />
                </MonitorProvider>
            )
        case QuizState.ENDED:
            return (
                <MonitorProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <EndGame />
                </MonitorProvider>
            )
        default:
            return <div>Invalid state</div>
    }
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const { quizCode } = context.query
        const quiz: QuizRoomInfoResponse<WaitingRoomResponse> = await instance
            .get(`take-quiz/monitor/${quizCode}`, {
                headers: {
                    Cookie: context.req.headers.cookie || "",
                },
            })
            .json()
        return {
            props: {
                quiz,
                quizCode,
            },
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default Monitor
