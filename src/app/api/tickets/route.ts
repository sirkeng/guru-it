import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import * as sql from 'mssql'

import { sqlConnect } from '@/utils/db'

export async function GET(req: NextRequest) {
  // จัดการ request สำหรับ method GET
  const ticket_no = req.nextUrl.searchParams.get('ticket_no')

  if (!ticket_no) {
    try {
      const pool = await sqlConnect()

      const result = await pool.request().query(
        `SELECT * FROM tickets ORDER BY
          CASE
              WHEN ticket_status = 0 THEN ticket_create
              ELSE NULL
          END ASC,
          CASE
              WHEN ticket_status != 0 THEN ticket_create
              ELSE NULL
          END DESC;`
      )

      return NextResponse.json(result.recordset)
    } catch (error) {
      console.error('Database query failed:', error)

      return NextResponse.json({
        error: 'Error Fetching Ticket'
      })
    }
  } else {
    try {
      const pool = await sqlConnect()

      const result = await pool
        .request()
        .input('ticket_no', sql.Int, ticket_no)
        .query(
          `SELECT * FROM tickets WHERE ticket_no = @ticket_no ORDER BY
          CASE
              WHEN ticket_status = 0 THEN ticket_create
              ELSE NULL
          END ASC,
          CASE
              WHEN ticket_status != 0 THEN ticket_create
              ELSE NULL
          END DESC;`
        )

      return NextResponse.json(result.recordset)
    } catch (error) {
      console.error('Database query failed:', error)

      return NextResponse.json({
        error: 'Error Fetching Ticket'
      })
    }
  }
}
