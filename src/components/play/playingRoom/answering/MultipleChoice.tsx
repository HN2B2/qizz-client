import { QuizContext } from "@/pages/play/[quizCode]"
import { QuestionType } from "@/types/question/QuestionType"
import { QuizResponse } from "@/types/quiz"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import PlayingQuestionResponse from "@/types/takeQuiz/playing/PlayingQuestionResponse"
import PlayingResponse, {
    PlayingState,
} from "@/types/takeQuiz/playing/PlayingResponse"
import { instance } from "@/utils"
import { Group, Paper } from "@mantine/core"
import { CompatClient } from "@stomp/stompjs"
import { motion } from "framer-motion"
import React, { useContext, useEffect, useState } from "react"

const AnswerColor: Record<number, string> = {
    0: "red",
    1: "blue",
    2: "yellow",
    3: "lime",
    4: "orange",
}

interface MultipleChoiceProps {
    timeLeft: number
}

const MultipleChoice = ({ timeLeft }: MultipleChoiceProps) => {
    const {
        message: roomInfo,
        quiz,
    }: {
        message: QuizRoomInfoResponse<PlayingResponse<any>> | null
        client: CompatClient
        connected: boolean
        quiz: QuizResponse
    } = useContext(QuizContext)!

    const {
        data: playingData,
    }: { data: PlayingResponse<PlayingQuestionResponse> | null } = roomInfo || {
        data: null,
    }

    const answers = JSON.parse(playingData?.data.answersMetadata || "[]")

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const handleSelectAnswer = (index: number) => {
        if (timeLeft === 0 || playingData?.state !== PlayingState.ANSWERING)
            return
        setSelectedAnswer(index)
        try {
            instance.post(
                `/take-quiz/${quiz.code}/${playingData.data.questionId}`,
                {
                    answerMetadata: JSON.stringify([answers[index]] || [""]),
                    QuestionType: QuestionType.MULTIPLE_CHOICE,
                    answerTime: timeLeft / 10,
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
    useEffect(() => {
        if (timeLeft === 1 && selectedAnswer === null) {
            setSelectedAnswer(100)
        }
        setCorrectAnswers(
            JSON.parse(playingData?.data.correctAnswersMetadata || "[]")
        )
    }, [playingData, timeLeft, selectedAnswer])

    return (
        <Group grow>
            {answers.map((answer: string, index: number) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{
                        scale:
                            selectedAnswer === null
                                ? 1
                                : selectedAnswer === index
                                ? 1
                                : correctAnswers.includes(answer)
                                ? 1
                                : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.25,
                    }}
                >
                    <button
                        className={` w-full ${
                            timeLeft === 0 && "cursor-not-allowed"
                        }`}
                        onClick={() => handleSelectAnswer(index)}
                    >
                        <Paper
                            key={index}
                            className={`p-16 flex items-center justify-center transition-all duration-300 ${
                                selectedAnswer === index
                                    ? "border-4"
                                    : "border-2"
                            } border-white`}
                            radius="md"
                            bg={
                                timeLeft === 0
                                    ? correctAnswers.includes(answer)
                                        ? "green"
                                        : selectedAnswer === index
                                        ? "red"
                                        : AnswerColor[index]
                                    : AnswerColor[index]
                            }
                            shadow="md"
                        >
                            <p className="flex items-center justify-center text-white">
                                {answer}
                            </p>
                        </Paper>
                    </button>
                </motion.div>
            ))}
        </Group>
    )
}

export default MultipleChoice
