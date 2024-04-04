export class WebSocketRequest<T> {
    constructor(private readonly body: T, private readonly token: string) {}

    public toString() {
        return JSON.stringify({
            body: this.body,
            token: this.token,
        })
    }
}
