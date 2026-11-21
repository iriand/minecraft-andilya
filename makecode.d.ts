// MakeCode supplies these APIs at runtime. The declarations are for the editor.
declare namespace player {
    function onChat(
        command: string,
        handler: (num1: number, num2: number, num3: number) => void
    ): void

    function say(message: unknown): void
}

declare class Position {
    private readonly positionBrand: never
}

declare function posCamera(x: number, y: number, z: number): Position

declare namespace blocks {
    function place(block: number, position: Position): boolean
}

declare const POLISHED_ANDESITE: number
declare const GLOWSTONE: number
