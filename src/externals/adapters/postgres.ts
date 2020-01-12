import { Pool } from 'pg';
import { PostgresAdapterInterface, PostgresConnectionInterface } from "../../interfaces/postgres_adapter";

export default class PostgresAdapter implements PostgresAdapterInterface {

    pool: any

    constructor(conn: PostgresConnectionInterface) {
        this.pool = new Pool({
            user: conn.user,
            host: conn.server,
            database: conn.database,
            password: conn.password,
            port: conn.port,
        });

        // the pool will emit an error on behalf of any idle clients
        // it contains if a backend error or network partition happens
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
        });
    }

    async Query(query: string, params: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool
                .connect()
                .then(client => {
                    return client
                        .query(query, params)
                        .then(res => {
                            client.release()
                            resolve(res)
                        })
                        .catch(err => {
                            client.release()
                            reject(err)
                        })
                })
        })
    }

    async Destruct(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.end().then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
