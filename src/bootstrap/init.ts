import DotENV from "dotenv";
import HttpServer from "../transport/http/server";

export default function Bootstrap() {

    // Load Confgurations from .env
    DotENV.config()

    let server = new HttpServer();
    server.Init();
}
