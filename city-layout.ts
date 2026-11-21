namespace educationStarter {
    export enum CityMaterial {
        Empty = -1,
        Paving = 0,
        Wood = 1,
        Roof = 2,
        Window = 3,
        Lawn = 4,
        Flower = 5,
        Light = 6
    }

    export class CityLayout {
        readonly width: number
        readonly depth: number
        readonly height = 7
        private readonly houseCount: number
        private readonly columns: number
        private readonly lotSize = 10

        constructor(houseCount: number) {
            this.houseCount = houseCount
            this.columns = Math.ceil(Math.sqrt(houseCount))
            this.width = this.columns * this.lotSize
            this.depth = Math.ceil(houseCount / this.columns) * this.lotSize
        }

        materialAt(x: number, y: number, z: number): CityMaterial {
            const column = Math.floor(x / this.lotSize)
            const row = Math.floor(z / this.lotSize)
            const house = row * this.columns + column
            if (house >= this.houseCount) {
                return CityMaterial.Empty
            }

            const lotX = x % this.lotSize
            const lotZ = z % this.lotSize
            const insideHouse = lotX >= 3 && lotX <= 7 && lotZ >= 4 && lotZ <= 8
            const garden = lotX >= 7 && lotZ >= 2 && lotZ <= 3
            const lamp = lotX === 2 && lotZ === 2

            if (y === 0) {
                const street = lotX < 2 || lotZ < 2
                const frontWalk = lotX === 5 && lotZ < 4
                if (street || frontWalk || lamp) {
                    return CityMaterial.Paving
                }
                if (insideHouse) {
                    return CityMaterial.Wood
                }
                return garden ? CityMaterial.Lawn : CityMaterial.Empty
            }

            if (lamp) {
                if (y === 1) {
                    return CityMaterial.Paving
                }
                return y === 2 ? CityMaterial.Light : CityMaterial.Empty
            }
            if (garden && y === 1 && (lotX + lotZ) % 2 === 0) {
                return CityMaterial.Flower
            }
            if (!insideHouse) {
                return CityMaterial.Empty
            }

            const wallHeight = 3 + house % 3
            if (y === wallHeight + 1) {
                return CityMaterial.Roof
            }
            const front = lotZ === 4
            const side = lotX === 3 || lotX === 7
            const wall = front || side || lotZ === 8
            const doorway = front && lotX === 5 && y <= 2
            if (!wall || doorway || y > wallHeight) {
                return CityMaterial.Empty
            }
            const window = (front && (lotX === 4 || lotX === 6)) || (side && lotZ === 6)
            return window && y === 2 ? CityMaterial.Window : CityMaterial.Wood
        }
    }
}
