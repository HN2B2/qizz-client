import UserRankingResponse from "./UserRankingResponse"

export default interface RankingResponse {
    totalQuestion: number
    currentQuestion: number
    players: UserRankingResponse[]
}
