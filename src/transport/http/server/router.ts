import BodyParser from "body-parser";
import Express from "express";
import BaseController from "../controllers/base_controller";

export default class Router {

    public router: Express.Router;
    private baseController: BaseController

    constructor() {
        this.router = Express.Router()

        this.baseController = new BaseController()
    }

    public Init() {
        this.attachMiddlewares()
        this.attachRoutes()
    }

    private attachRoutes() {
        this.router.post('/check', this.baseController.CheckOnRailway)
    }

    private attachMiddlewares() {

        // middleware that is specific to this router
        // this.router.use(function (req, res, next) {
        //     console.log('Time: ', Date.now())
        //     next()
        // })

        // Enable request body parsing
        this.router.use(BodyParser.json()) // for parsing application/json
        this.router.use(BodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    }

}
