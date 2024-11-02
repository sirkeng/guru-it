import * as sql from 'mssql'

const config: sql.config = {
  user: `${process.env.NEXT_PUBLIC_USERNAME}`,
  password: `${process.env.NEXT_PUBLIC_PASSWORD}`,
  server: '192.168.78.12',
  database: 'GURU_IT',

  // port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for Azure
    trustServerCertificate: true // change to true for local dev/self-signed certs
  }
}

export const sqlConnect = async () => new sql.ConnectionPool(config).connect()
