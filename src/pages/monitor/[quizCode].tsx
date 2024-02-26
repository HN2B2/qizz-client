import { GameBackground } from "@/components/play"
import useSubscription from "@/hooks/useSubscription"
import useWebSocket from "@/hooks/useWebSocket"
import { Button } from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import React from "react"

const Monitor = ({ quizCode }: { quizCode: string }) => {
    const { client } = useSubscription()

    const { message, connected } = useWebSocket<any>(
        `/play/${quizCode}`,
        client
    )
    const handleStart = () => {
        client.publish({
            destination: `/start/${quizCode}`,
            body: "",
        })
    }
    return (
        <GameBackground className="flex items-center justify-center">
            <Button onClick={handleStart}>Start</Button>
        </GameBackground>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { quizCode } = context.query
    return {
        props: {
            quizCode,
        },
    }
}

export default Monitor
