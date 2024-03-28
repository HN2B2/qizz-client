import { QuizResponse } from "@/types/quiz"
import { instance } from "@/utils"
import { GetServerSidePropsContext } from "next"
import {
    EndGame,
    GameBackground,
    PlayingRoom,
    WaitingRoom,
} from "@/components/play"
import { QuizState } from "@/types/quiz/QuizState"
import useWebSocket from "@/hooks/useWebSocket"
import useSubscription from "@/hooks/useSubscription"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import { WaitingRoomResponse } from "@/types/takeQuiz/waitingRoom/WaitingRoomResponse"
import { createContext, useEffect, useState } from "react"
import PlayingResponse from "@/types/takeQuiz/playing/PlayingResponse"
import { CompatClient } from "@stomp/stompjs"

interface QuizContextProps {
    message: QuizRoomInfoResponse<any> | null
    quiz: QuizResponse
    client: CompatClient
    connected: boolean
    children?: React.ReactNode
}

export const QuizContext = createContext<QuizContextProps | null>(null)

export const QuizProvider: React.FC<QuizContextProps> = ({
    message,
    quiz,
    client,
    connected,
    children,
}) => {
    return (
        <QuizContext.Provider
            value={{
                message,
                quiz,
                client,
                connected,
            }}
        >
            {children}
        </QuizContext.Provider>
    )
}
interface TakeQuizProps {
    quiz: QuizResponse
}

const TakeQuiz = ({ quiz }: TakeQuizProps) => {
    const [quizState, setQuizState] = useState<QuizState>(quiz.quizState)
    const { client } = useSubscription()

    const { message, connected } = useWebSocket<QuizRoomInfoResponse<any>>(
        `/play/${quiz.code}`,
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
                <QuizProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <WaitingRoom />
                </QuizProvider>
            )
        case QuizState.STARTED:
            return (
                <QuizProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <PlayingRoom />
                </QuizProvider>
            )
        case QuizState.ENDED:
            return (
                <QuizProvider
                    message={message}
                    quiz={quiz}
                    client={client}
                    connected={connected}
                >
                    <EndGame />
                </QuizProvider>
            )
        default:
            return <div>Invalid state</div>
    }
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { quizCode } = context.query
    const token = context.req.cookies.user
    try {
        const quiz: QuizResponse = await instance
            .get(`quiz?code=${quizCode}`)
            .json()

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
        console.log(error)

        return {
            notFound: true,
        }
    }
}

export default TakeQuiz
