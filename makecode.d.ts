// MakeCode supplies these APIs at runtime. The declarations are for the editor.
declare namespace player {
    function onChat(
        command: string,
        handler: (num1: number, num2: number, num3: number) => void
    ): void

    function say(message: unknown): void

    function getOrientation(): number
}

declare class Position {
    private readonly positionBrand: never
}

declare function posCamera(x: number, y: number, z: number): Position
declare function pos(x: number, y: number, z: number): Position

declare namespace blocks {
    function place(block: number, position: Position): boolean
}

declare namespace agent {
    function teleport(position: Position, direction: number): boolean
    function getItemCount(slot: number): number
    function getItemDetail(slot: number): number
    function setAssist(assist: number, enabled: boolean): void
    function setItem(item: number, count: number, slot: number): void
    function setSlot(slot: number): void
    function move(direction: number, blocks: number): boolean
    function place(direction: number): boolean
}

declare const POLISHED_ANDESITE: number
declare const GLOWSTONE: number
declare const FORWARD: number
declare const DOWN: number
declare const DESTROY_OBSTACLES: number
declare const PLACE_ON_MOVE: number
