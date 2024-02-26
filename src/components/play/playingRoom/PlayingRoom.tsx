import React, { useContext } from "react"
import GameBackground from "../GameBackground"
import { QuizResponse } from "@/types/quiz"
import { CompatClient } from "@stomp/stompjs"
import PlayingResponse, {
    PlayingState,
} from "@/types/takeQuiz/playing/PlayingResponse"
import Head from "next/head"
import { LoadingOverlay } from "@mantine/core"
import Countdown from "./Countdown"
import Answering from "./answering/Answering"
import { QuizContext } from "@/pages/play/[quizCode]"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import Ranking from "./ranking/Ranking"

const PlayingRoom = () => {
    const {
        message: roomInfo,
        connected,
        quiz,
    }: {
        message: QuizRoomInfoResponse<PlayingResponse<any>> | null
        client: CompatClient
        connected: boolean
        quiz: QuizResponse
    } = useContext(QuizContext)!

    const { data: playingData }: { data: PlayingResponse<any> | null } =
        roomInfo || { data: null }

    if (!playingData || !connected) {
        return (
            <div className="bg-[url('/bg/takequiz.jpg')] min-h-screen bg-center bg-cover h-max">
                <Head>
                    <title>{`Game pin: ${quiz.code} | Qizz`}</title>
                </Head>
                <LoadingOverlay
                    visible
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 10 }}
                />
            </div>
        )
    }

    switch (playingData.state) {
        case PlayingState.COUNTDOWN:
            return <Countdown />

        case PlayingState.ANSWERING:
        case PlayingState.RESULT:
            return <Answering />

        case PlayingState.RANKING:
            return <Ranking />

        default:
            return <GameBackground>PlayingRoom</GameBackground>
    }
}
export default PlayingRoom
