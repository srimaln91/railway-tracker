import { Point } from "../entities/point"
import { RailwayRepositoryInterface } from "../interfaces/railway_repository"

export default class LocationChecker {

    railwayRepository: RailwayRepositoryInterface

    constructor(railwayRepository: RailwayRepositoryInterface) {
        this.railwayRepository = railwayRepository
    }

    Check(location: Point, distance: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.railwayRepository.CheckOnRailWay(location, distance).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
