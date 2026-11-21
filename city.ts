namespace educationStarter {
    class CitySupplies {
        // The order matches CityMaterial in city-layout.ts.
        private readonly materials = [POLISHED_ANDESITE, PLANKS_OAK, STONE, GLASS, GRASS, OXEYE_DAISY, GLOWSTONE]
        private readonly slots: number[] = []
        private readonly stock: number[] = []
        private readonly remaining: number[] = []
        private activeSlot = 0

        constructor(layout: educationStarter.CityLayout) {
            for (let index = 0; index < this.materials.length; index++) {
                this.slots.push(0)
                this.stock.push(0)
                this.remaining.push(0)
            }
            for (let y = 0; y < layout.height; y++) {
                for (let z = 0; z < layout.depth; z++) {
                    for (let x = 0; x < layout.width; x++) {
                        const material = layout.materialAt(x, y, z)
                        if (material >= 0) {
                            this.remaining[material]++
                        }
                    }
                }
            }

            const emptySlots: number[] = []
            for (let slot = 1; slot <= 27; slot++) {
                const count = agent.getItemCount(slot)
                if (count <= 0) {
                    emptySlots.push(slot)
                } else {
                    const index = this.materials.indexOf(agent.getItemDetail(slot))
                    if (index >= 0 && count > this.stock[index]) {
                        this.slots[index] = slot
                        this.stock[index] = count
                    }
                }
            }

            let nextEmpty = 0
            let reserveSlot = 27
            for (let index = 0; index < this.slots.length; index++) {
                if (this.slots[index] === 0 && this.remaining[index] > 0) {
                    if (nextEmpty < emptySlots.length) {
                        this.slots[index] = emptySlots[nextEmpty++]
                    } else {
                        while (this.slots.indexOf(reserveSlot) >= 0) {
                            reserveSlot--
                        }
                        this.slots[index] = reserveSlot--
                        player.say("Агент заменит содержимое слота " + this.slots[index])
                    }
                }
            }
        }

        placeDown(index: number): boolean {
            const slot = this.slots[index]
            if (this.stock[index] === 0) {
                const count = Math.min(64, this.remaining[index])
                if (!agent.setItem(this.materials[index], count, slot)) {
                    return false
                }
                this.stock[index] = count
            }
            if (this.activeSlot !== slot) {
                agent.setSlot(slot)
                this.activeSlot = slot
            }
            if (!agent.place(DOWN)) {
                return false
            }
            this.stock[index]--
            this.remaining[index]--
            return true
        }
    }

    function constructCity(origin: Position, layout: educationStarter.CityLayout, supplies: CitySupplies): boolean {
        // Build bottom-up so the Agent always works from the space above the current layer.
        for (let y = 0; y < layout.height; y++) {
            for (let z = 0; z < layout.depth; z++) {
                let nextToPreviousBlock = false
                for (let x = 0; x < layout.width; x++) {
                    const material = layout.materialAt(x, y, z)
                    if (material < 0) {
                        nextToPreviousBlock = false
                        continue
                    }

                    const reached = nextToPreviousBlock
                        ? agent.move(FORWARD, 1)
                        : agent.teleport(positions.add(origin, pos(x, y + 1, z)), EAST)
                    if (!reached || !supplies.placeDown(material)) {
                        player.say("Агент остановился. Смещение от начала города: X=" + x + ", Y=" + y + ", Z=" + z)
                        return false
                    }
                    nextToPreviousBlock = true
                }
            }
            if (y === 0) {
                player.say("Улицы и фундаменты готовы. Агент строит дома.")
            }
        }
        return true
    }

    export function buildCity(houseCount: number) {
        if (houseCount < 1 || houseCount > 16 || houseCount % 1 !== 0) {
            player.say("Введи city и число домов от 1 до 16, например city 5")
            return
        }

        const origin = positions.add(player.position(), pos(3, 0, 3))
        const layout = new educationStarter.CityLayout(houseCount)
        player.say("Агент начинает строительство. Домов: " + houseCount
            + ". Размер площадки: " + layout.width + " на " + layout.depth + " блоков.")

        if (!agent.teleport(positions.add(origin, pos(0, 1, 0)), EAST)) {
            player.say("Не удалось переместить Агента. Попробуй на ровной открытой площадке.")
            return
        }
        agent.setAssist(DESTROY_OBSTACLES, false)
        agent.setAssist(PLACE_ON_MOVE, false)
        const supplies = new CitySupplies(layout)
        if (constructCity(origin, layout, supplies)) {
            player.say("Город готов. Домов: " + houseCount)
        }
    }
}
