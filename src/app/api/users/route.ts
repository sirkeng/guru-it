import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import * as sql from 'mssql'

import { sqlConnect } from '@/utils/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() // Parse the JSON body
    const { putUser } = body
    const pool = await sqlConnect()

    console.log(putUser)

    const result = await pool.request().input('user_id', sql.Int, putUser).query(`
        SELECT
          user_id, user_no, user_firstname, user_lastname,
          user_email, user_phone, user_jobtitle, user_role
        FROM engineers
        WHERE user_id = @user_id
      `)

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Engineer not found' }, { status: 404 })
    }

    return NextResponse.json(result.recordset[0])
  } catch (error) {}
}
