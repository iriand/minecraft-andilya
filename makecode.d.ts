// MakeCode supplies player at runtime. These declarations are for the editor.
declare namespace player {
    function onChat(
        command: string,
        handler: (num1: number, num2: number, num3: number) => void
    ): void

    function say(message: unknown): void
}
