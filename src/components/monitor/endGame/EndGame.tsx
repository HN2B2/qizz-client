import { useContext, useEffect, useState } from "react"
import GameBackground from "../../common/GameBackground"
import { motion } from "framer-motion"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import { QuizContext } from "@/pages/play/[quizCode]"
import RankingResponse from "@/types/takeQuiz/playing/RankingResponse"
import { useViewportSize } from "@mantine/hooks"
import Confetti from "react-confetti"
import { instance } from "@/utils"
import { MonitorContext } from "@/pages/monitor/[quizCode]"
const EndGame = () => {
    const { quiz } = useContext(MonitorContext)!

    const [players, setPlayers] = useState<RankingResponse["players"]>([])
    const getResult = async () => {
        try {
            const data: QuizRoomInfoResponse<RankingResponse> = await instance
                .get(`take-quiz/result/${quiz.quizCode}`)
                .json()
            setPlayers(data.data.players)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getResult()
    }, [])

    const variants = {
        hidden: { y: "120%" },
        visible: { y: "10%" },
    }
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useViewportSize()

    return (
        <GameBackground>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    tweenDuration={50000}
                    numberOfPieces={1000}
                />
            )}
            <div className="h-screen flex items-end justify-center gap-4 overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5,
                        delay: 2.5,
                    }}
                >
                    <div className="h-[500px] w-72 bg-blue-500 shadow-lg border-2 border-white text-white flex flex-col items-center p-4 pt-32 text-2xl font-semibold rounded-t-lg relative z-10">
                        <img
                            src="/play/silver.png"
                            alt="Bronze"
                            className="absolute -top-12 -left-12 w-32 object-contain drop-shadow-lg"
                        />
                        <div className="mb-4 text-3xl">
                            {players[1]?.displayName || "Somebody"}
                        </div>
                        <div>{players[1]?.score || 0}</div>
                    </div>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5,
                        delay: 4,
                    }}
                    onAnimationComplete={() => setShowConfetti(true)}
                >
                    <div className="h-[650px] w-72 bg-blue-500 shadow-lg border-2 border-white text-white flex flex-col items-center p-4 pt-32 text-2xl font-semibold rounded-t-lg relative z-10">
                        <img
                            src="/play/gold.png"
                            alt="Bronze"
                            className="absolute -top-12 -left-12 w-32 object-contain drop-shadow-lg"
                        />
                        <div className="mb-4 text-3xl">
                            {players[0]?.displayName || "Somebody"}
                        </div>
                        <div>{players[0]?.score || 0}</div>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5,
                        delay: 1,
                    }}
                >
                    <div className="h-[400px] w-72 bg-blue-500 shadow-lg border-2 border-white text-white flex flex-col items-center p-4 pt-32 text-2xl font-semibold rounded-t-lg relative">
                        <img
                            src="/play/bronze.png"
                            alt="Bronze"
                            className="absolute -top-12 -right-12 w-32 object-contain drop-shadow-lg"
                        />
                        <div className="mb-4 text-3xl">
                            {players[2]?.displayName || "Somebody"}
                        </div>
                        <div>{players[2]?.score || 0}</div>
                    </div>
                </motion.div>
            </div>
        </GameBackground>
    )
}

export default EndGame
