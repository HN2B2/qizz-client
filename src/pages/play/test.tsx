import useSubscription from "@/hooks/useSubscription"
import useWebSocket from "@/hooks/useWebSocket"
import React from "react"

const test = () => {
    const { client } = useSubscription()

    const { message, connected } = useWebSocket<any>(`/play/11111111`, client)
    const handleStart = () => {
        client.publish({
            destination: `/start/11111111`,
            body: "",
        })
    }
    return <button onClick={handleStart}>Click</button>
}

export default test
