namespace educationStarter {
    export function registerCommands() {
        player.onChat("hello", function () {
            educationStarter.greetPlayer()
        })
    }
}
