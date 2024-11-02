import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import * as sql from 'mssql'

import { sqlConnect } from '@/utils/db'

// POST request to fetch all engineers
export async function POST(req: NextRequest) {
  try {
    // Parse the body to get putEngineer value
    const body = await req.json() // Parse the JSON body
    const { putEngineer } = body
    const pool = await sqlConnect()

    let result

    // Check if putEngineer is 'ALL'
    if (putEngineer === 'ALL') {
      // Query to select all data from engineers table
      result = await pool.request().query(`
        SELECT
          user_id, user_no, user_firstname, user_lastname,
          user_email, user_phone, user_jobtitle, user_role, user_img
        FROM engineers
      `)

      if (result.recordset.length === 0) {
        return NextResponse.json({ error: 'Engineer not found' }, { status: 404 })
      }
    } else if (!isNaN(Number(putEngineer))) {
      // Query to select data for specific user_id
      result = await pool.request().input('user_id', sql.Int, putEngineer).query(`
          SELECT
            user_id, user_no, user_firstname, user_lastname,
            user_email, user_phone, user_jobtitle, user_role, user_img
          FROM engineers
          WHERE user_id = @user_id
        `)

      if (result.recordset.length === 0) {
        return NextResponse.json({ error: 'Engineer not found' }, { status: 404 })
      }
    } else {
      return NextResponse.json({ error: 'Invalid putEngineer value' }, { status: 400 })
    }

    // Return the engineers data as JSON
    return NextResponse.json(result.recordset)
  } catch (err) {
    console.error('Error fetching engineers:', err)

    return NextResponse.json({ error: 'Failed to fetch engineers' }, { status: 500 })
  }
}
