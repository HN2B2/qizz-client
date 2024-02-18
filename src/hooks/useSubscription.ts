import { socketUrl } from "@/utils"
import { CompatClient, Stomp } from "@stomp/stompjs"
import React, { useState } from "react"

const useSubscription = () => {
    const [client, setClient] = useState<CompatClient>(Stomp.over(socketUrl))
    return { client, setClient }
}

export default useSubscription
