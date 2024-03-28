import { motion } from "framer-motion"
import GameBackground from "../../common/GameBackground"
import { useEffect, useState } from "react"
const Countdown = () => {
    const [time, setTime] = useState(3)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])
    return (
        <GameBackground>
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    key={time}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8 }}
                    exit={{ scale: 0 }}
                >
                    <div className="bg-blue-500 w-32 h-32 rounded-full flex items-center justify-center">
                        <h1 className="text-6xl text-white font-bold">
                            {time}
                        </h1>
                    </div>
                </motion.div>
            </div>
        </GameBackground>
    )
}

export default Countdown
