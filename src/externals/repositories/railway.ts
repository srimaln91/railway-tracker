import { Point } from "../../domain/entities/point";
import { RailwayRepositoryInterface } from "../../domain/interfaces/railway_repository";
import { PostgresAdapterInterface } from "../../interfaces/postgres_adapter";

export default class RailwayRepository implements RailwayRepositoryInterface {

    dbAdapter: PostgresAdapterInterface

    constructor(dbAdapter: PostgresAdapterInterface) {
        this.dbAdapter = dbAdapter
    }

    queryString: string = `SELECT EXISTS(
        SELECT way
        FROM planet_osm_roads
        WHERE railway = 'rail'
        AND ST_DWithin(CAST(ST_SetSRID( ST_Point( $1, $2), 4326) AS geography), CAST(way AS geography), $3)
    )`;

    async CheckOnRailWay(point: Point, distance: number): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.dbAdapter.Query(this.queryString, [
                point.longtitude.toString(),
                point.latitude.toString(),
                distance.toString()
            ]).then((result) => {
                if (result.rows[0].exists == true) {
                    resolve(true)
                }
                resolve(false)
            }).catch((err) => {
                reject(err)
            })
        })

    }
}
