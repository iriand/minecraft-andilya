namespace educationStarter {
    export function buildPath(length: number) {
        if (length < 1 || length > 32 || length % 1 !== 0) {
            player.say("Введи path и целое число от 1 до 32, например path 12")
            return
        }

        for (let step = 1; step <= length; step++) {
            blocks.place(POLISHED_ANDESITE, posCamera(0, -1, step))

            if (step % 4 === 0) {
                blocks.place(GLOWSTONE, posCamera(1, 0, step))
            }
        }
    }
}
