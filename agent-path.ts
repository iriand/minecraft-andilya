namespace educationStarter {
    function findExistingMaterialSlot(material: number, needed: number): number {
        let partialSlot = 0
        let partialCount = 0

        for (let slot = 1; slot <= 27; slot++) {
            const count = agent.getItemCount(slot)
            if (count > partialCount && agent.getItemDetail(slot) === material) {
                if (count >= needed) {
                    return slot
                }
                partialSlot = slot
                partialCount = count
            }
        }

        return partialSlot
    }

    function findAvailableSlot(reservedSlot: number): number {
        for (let slot = 1; slot <= 27; slot++) {
            if (slot !== reservedSlot && agent.getItemCount(slot) === 0) {
                return slot
            }
        }

        const fallbackSlot = reservedSlot === 27 ? 26 : 27
        player.say("Агент заменит содержимое слота " + fallbackSlot)
        return fallbackSlot
    }

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
        const stones = length - lights
        // Reserve existing stacks for both materials before choosing fallback slots.
        let pathSlot = findExistingMaterialSlot(POLISHED_ANDESITE, stones)
        let lightSlot = lights > 0 ? findExistingMaterialSlot(GLOWSTONE, lights) : 0
        if (pathSlot === 0) {
            pathSlot = findAvailableSlot(lightSlot)
        }
        if (lights > 0 && lightSlot === 0) {
            lightSlot = findAvailableSlot(pathSlot)
        }

        agent.setAssist(DESTROY_OBSTACLES, false)
        agent.setAssist(PLACE_ON_MOVE, false)
        if (agent.getItemCount(pathSlot) < stones || agent.getItemDetail(pathSlot) !== POLISHED_ANDESITE) {
            agent.setItem(POLISHED_ANDESITE, stones, pathSlot)
        }
        if (lights > 0 && (agent.getItemCount(lightSlot) < lights || agent.getItemDetail(lightSlot) !== GLOWSTONE)) {
            agent.setItem(GLOWSTONE, lights, lightSlot)
        }

        for (let step = 1; step <= length; step++) {
            if (!agent.move(FORWARD, 1)) {
                player.say("Агент не смог пройти вперёд на шаге " + step)
                return
            }

            agent.setSlot(step % 4 === 0 ? lightSlot : pathSlot)
            if (!agent.place(DOWN)) {
                player.say("Агент не смог положить блок на шаге " + step)
                return
            }
        }

        player.say("Агент построил дорожку. Длина — " + length + " блоков.")
    }
}
