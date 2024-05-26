import pg from 'pg'
import 'dotenv/config'
const { Pool } = pg

const pool = new Pool ({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    port: Number(process.env.DATABASE_PORT)
})

export default pool;
