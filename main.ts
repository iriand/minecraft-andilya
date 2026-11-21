namespace educationStarter {
    let agentBuilding = false

    function runAgentBuild(size: number, build: (size: number) => void) {
        if (agentBuilding) {
            player.say("Подожди, Агент ещё строит.")
            return
        }
        agentBuilding = true
        build(size)
        agentBuilding = false
    }

    export function registerCommands() {
        player.onChat("hello", function () {
            educationStarter.greetPlayer()
        })

        player.onChat("path", function (length) {
            educationStarter.buildPath(length)
        })

        player.onChat("agentpath", function (length) {
            runAgentBuild(length, educationStarter.buildAgentPath)
        })

        player.onChat("city", function (houseCount) {
            runAgentBuild(houseCount, educationStarter.buildCity)
        })
    }
}
