namespace educationStarter {
    export function buildAgentPath(length: number) {
        if (length < 1 || length > 32 || length % 1 !== 0) {
            player.say("Введи agentpath и целое число от 1 до 32, например agentpath 5")
            return
        }

        if (!agent.teleport(pos(0, 1, 0), player.getOrientation())) {
            player.say("Не удалось переместить Агента. Проверь, что над тобой свободно.")
            return
        }

        const lights = Math.floor(length / 4)
        if (agent.getItemCount(1) > 0 || (lights > 0 && agent.getItemCount(2) > 0)) {
            player.say("Освободи слоты 1 и 2 в инвентаре Агента и повтори команду.")
            return
        }

        agent.setAssist(DESTROY_OBSTACLES, false)
        agent.setAssist(PLACE_ON_MOVE, false)
        agent.setItem(POLISHED_ANDESITE, length - lights, 1)
        if (lights > 0) {
            agent.setItem(GLOWSTONE, lights, 2)
        }

        for (let step = 1; step <= length; step++) {
            if (!agent.move(FORWARD, 1)) {
                player.say("Агент не смог пройти вперёд на шаге " + step)
                return
            }

            agent.setSlot(step % 4 === 0 ? 2 : 1)
            if (!agent.place(DOWN)) {
                player.say("Агент не смог положить блок на шаге " + step)
                return
            }
        }

        player.say("Агент построил дорожку. Длина — " + length + " блоков.")
    }
}
