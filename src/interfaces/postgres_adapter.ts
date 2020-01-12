export interface PostgresAdapterInterface {
    Query(query: string, params: string[]): Promise<any>
    Destruct(): Promise<any>
}

export interface PostgresConnectionInterface {
    server: string
    port: number
    database: string
    user: string
    password: string
}
