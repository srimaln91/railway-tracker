import { Point } from "../../../domain/entities/point"
import LocationChecker from "../../../domain/usecases/location_check"
import PostgresAdapter from "../../../externals/adapters/postgres"
import RailwayRepository from "../../../externals/repositories/railway"
import { PostgresAdapterInterface, PostgresConnectionInterface } from "../../../interfaces/postgres_adapter"

export default class BaseController {

    locationChecker: LocationChecker

    constructor() {

        // TODO: Inject these from DI container
        let connDetails: PostgresConnectionInterface = {
            user: process.env.DB_USER,
            server: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: parseInt(process.env.DB_PORT),
        };

        let dbAdapter: PostgresAdapterInterface = new PostgresAdapter(connDetails);
        let railwayRepository = new RailwayRepository(dbAdapter)

        this.locationChecker = new LocationChecker(railwayRepository)

    }

    public CheckOnRailway = (req, res) => {

        // TODO: Request body should be validated before get into the application
        let point: Point = {
            longtitude: req.body.lon,
            latitude: req.body.lat
        }

        let distance: number = req.body.distance;

        this.locationChecker.Check(point, distance).then((result) => {
            res.json({ "inside": result })
            res.status(200)
            res.end();
        }).catch((err) => {
            console.error(err)
            res.send({ error: 'something blew up' })
            res.status(500)
            res.end()
        })

    }
}
