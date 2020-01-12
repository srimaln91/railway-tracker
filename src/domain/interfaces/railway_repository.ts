import { Point } from "../entities/point";

export interface RailwayRepositoryInterface {
    dbAdapter: any
    CheckOnRailWay(point: Point, distance: number): Promise<boolean>
}
