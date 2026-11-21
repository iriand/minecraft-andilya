namespace educationStarter {
    export function registerCommands() {
        player.onChat("hello", function () {
            educationStarter.greetPlayer()
        })

        player.onChat("path", function (length) {
            educationStarter.buildPath(length)
        })
    }
}
