import React, { useContext } from "react"
import GameBackground from "../../common/GameBackground"
import { CompatClient } from "@stomp/stompjs"
import PlayingResponse, {
    PlayingState,
} from "@/types/takeQuiz/playing/PlayingResponse"
import Head from "next/head"
import { LoadingOverlay } from "@mantine/core"
import Countdown from "./Countdown"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import Ranking from "./ranking/Ranking"
import { MonitorContext } from "@/pages/monitor/[quizCode]"
import { WaitingRoomResponse } from "@/types/takeQuiz/waitingRoom/WaitingRoomResponse"

const PlayingRoom = () => {
    const {
        message: roomInfo,
        connected,
        quiz,
    }: {
        message: QuizRoomInfoResponse<PlayingResponse<any>> | null
        client: CompatClient
        connected: boolean
        quiz: QuizRoomInfoResponse<WaitingRoomResponse>
    } = useContext(MonitorContext)!

    const { data: playingData }: { data: PlayingResponse<any> | null } =
        roomInfo || { data: null }

    if (!playingData || !connected) {
        return (
            <GameBackground>
                <Head>
                    <title>{`Game pin: ${quiz.quizCode} | Qizz`}</title>
                </Head>
                <LoadingOverlay
                    visible
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 10 }}
                />
            </GameBackground>
        )
    }

    switch (playingData.state) {
        case PlayingState.COUNTDOWN:
            return <Countdown />

        case PlayingState.ANSWERING:
        case PlayingState.RESULT:
        case PlayingState.RANKING:
            return <Ranking />

        default:
            return <GameBackground>PlayingRoom</GameBackground>
    }
}
export default PlayingRoom
