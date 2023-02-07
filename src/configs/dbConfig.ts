import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'stock-db',
    port: 5432,
});

export default pool;