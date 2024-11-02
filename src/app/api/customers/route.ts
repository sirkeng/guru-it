import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import * as sql from 'mssql'

import { sqlConnect } from '@/utils/db'

export async function POST(req: NextRequest) {
  const body = await req.json() // Parse the JSON body
  const { putData } = body
  const pool = await sqlConnect()

  if (putData === 'ALL') {
    try {
      // Query to select all customer data
      const result = await pool.request().query(`
      SELECT
        customer_id, customer_no, customer_tax, customer_type, customer_typeno,
        customer_contact, customer_name, customer_address,
        customer_subdist, customer_dist, customer_prov,
        customer_postal, customer_img
      FROM customers
    `)

      return NextResponse.json(result.recordset)
    } catch (error) {
      console.error('Error fetching customers:', error)

      return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
    }
  } else {
    try {
      const result = await pool.request().input('customer_id', sql.Int, putData) // Pass the customer_id
        .query(`
        SELECT
          customer_id, customer_no, customer_tax, customer_type, customer_typeno,
          customer_contact, customer_name, customer_address,
          customer_subdist, customer_dist, customer_prov,
          customer_postal, customer_img
        FROM customers
        WHERE customer_id = @customer_id
      `)

      // If customer not found, return an error
      if (result.recordset.length === 0) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
      }

      return NextResponse.json(result.recordset[0])
    } catch (error) {
      console.error('Error fetching customer:', error)

      return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
    }
  }
}
