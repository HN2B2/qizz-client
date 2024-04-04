import React, { useContext, useEffect } from "react"
import GameBackground from "../../../common/GameBackground"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import PlayingResponse, {
    PlayingState,
} from "@/types/takeQuiz/playing/PlayingResponse"
import { CompatClient } from "@stomp/stompjs"
import { QuizResponse } from "@/types/quiz"
import { QuizContext } from "@/pages/play/[quizCode]"
import RankingResponse from "@/types/takeQuiz/playing/RankingResponse"
import { Container, Paper, Progress, Title } from "@mantine/core"
import { IconUsersGroup } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { useListState } from "@mantine/hooks"
import { WaitingRoomResponse } from "@/types/takeQuiz/waitingRoom/WaitingRoomResponse"
import { MonitorContext } from "@/pages/monitor/[quizCode]"

const Ranking = () => {
    const {
        message: roomInfo,
        quiz,
    }: {
        message: QuizRoomInfoResponse<PlayingResponse<any>> | null
        client: CompatClient
        connected: boolean
        quiz: QuizRoomInfoResponse<WaitingRoomResponse>
    } = useContext(MonitorContext)!

    const [players, handlers] = useListState(
        quiz.data.users
            .map((user) => {
                return {
                    displayName: user.displayName,
                    score: 0,
                    correctCount: 0,
                    wrongCount: 0,
                }
            })
            .sort((a, b) => b.score - a.score)
    )
    console.log(players)

    const {
        data: playingData,
    }: { data: PlayingResponse<RankingResponse> | null } = roomInfo || {
        data: null,
    }
    useEffect(() => {
        if (playingData?.state === PlayingState.RANKING) {
            handlers.setState(
                playingData?.data?.players?.sort((a, b) => b.score - a.score) ||
                    []
            )
        }
    }, [playingData])

    return (
        <GameBackground className="flex justify-center p-16">
            <Container
                size={"xl"}
                w={"100%"}
                className="flex flex-col items-center"
            >
                <motion.div
                    key={quiz.quizCode}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.25,
                    }}
                    exit={{ scale: 0 }}
                >
                    <Paper p={32} mb={100} className="w-fit">
                        <Title order={1} tt="uppercase">
                            Leaderboard
                        </Title>
                    </Paper>
                </motion.div>

                <motion.div
                    key={"leaderboard" + quiz.quizName}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.25,
                    }}
                    exit={{ scale: 0 }}
                    className="w-full"
                >
                    <div className="bg-black/20 w-full rounded-lg">
                        <div className="bg-black/40 rounded-lg p-8 text-white text-lg flex items-center gap-2">
                            <IconUsersGroup />{" "}
                            <span className="text-lg font-semibold">
                                {players.length} participants
                            </span>
                        </div>
                        <div className="p-8 flex flex-col gap-1">
                            {players.map((player, index) => (
                                <div
                                    key={index}
                                    className="bg-black/40 px-4 flex items-center gap-2 h-full rounded-md"
                                >
                                    <h3 className="text-white py-4 text-lg w-20">
                                        {index + 1}
                                    </h3>
                                    <h2 className="text-white py-4 text-xl font-semibold w-80 line-clamp-1">
                                        {player.displayName}
                                    </h2>
                                    <p className="text-white py-4 text-lg font-medium w-32 line-clamp-1">
                                        {player.score}
                                    </p>
                                    <div className="grow">
                                        <Progress.Root
                                            size={30}
                                            className="h-full"
                                        >
                                            <Progress.Section
                                                value={
                                                    (player.correctCount /
                                                        (playingData?.data
                                                            .totalQuestion ||
                                                            10)) *
                                                    100
                                                }
                                                color="green"
                                            >
                                                <Progress.Label>
                                                    {player.correctCount}
                                                </Progress.Label>
                                            </Progress.Section>
                                            <Progress.Section
                                                value={
                                                    (player.wrongCount /
                                                        (playingData?.data
                                                            .totalQuestion ||
                                                            10)) *
                                                    100
                                                }
                                                color="red"
                                            >
                                                <Progress.Label>
                                                    {player.wrongCount}
                                                </Progress.Label>
                                            </Progress.Section>
                                        </Progress.Root>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </GameBackground>
    )
}

export default Ranking
