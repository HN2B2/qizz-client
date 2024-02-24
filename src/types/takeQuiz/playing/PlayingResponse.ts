export enum PlayingState {
    COUNTDOWN = "COUNTDOWN",
    ANSWERING = "ANSWERING",
    RESULT = "RESULT",
    RANKING = "RANKING",
}

export default interface PlayingResponse<T> {
    state: PlayingState
    data: T
}
