import { CompatClient } from "@stomp/stompjs"
import { useEffect, useState } from "react"

const useWebSocket = <T>(url: string, client: CompatClient) => {
    const [message, setMessage] = useState<T | null>(null)
    const [connected, setConnected] = useState(false)
    const connect = () => {
        client.connect({}, () => {
            setConnected(true)
            client.subscribe(url, (message) => {
                setMessage(JSON.parse(message.body))
            })
        })
    }
    useEffect(() => {
        connect()

        return () => {
            client.disconnect()
        }
    }, [])

    return { message, connected }
}

export default useWebSocket
