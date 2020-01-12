import cors from "cors";
import Express from "express";
import Morgan from "morgan";
import Router from "./router";

export default class HttpServer {
    app: Express.Express
    router: Express.Router

    constructor() {
        this.app = Express();
    }

    Init() {

        let router: Router = new Router();
        router.Init()

        let expressRouter: Express.Router = router.router;

        this.app.use(cors());
        this.app.use(Morgan('short'))

        this.app.use("/", expressRouter)

        let port: string = process.env.APP_PORT || '8080';

        this.app.listen(parseInt(port), err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${port}`);
        });

    }

}
