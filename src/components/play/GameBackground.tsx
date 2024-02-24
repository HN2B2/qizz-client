import { twMerge } from "tailwind-merge"

const GameBackground = ({
    className = "",
    children,
}: {
    className?: string
    children: React.ReactNode
}) => {
    return (
        <div
            className={twMerge(
                ` bg-[url('/bg/takequiz.jpg')] min-h-screen bg-center bg-cover h-max ${className}`
            )}
        >
            {children}
        </div>
    )
}

export default GameBackground
