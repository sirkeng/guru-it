'use client'

import React, { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Box, Container, Grid, Typography, TextField, Paper } from '@mui/material'

import CardComponent from '@/components/namelist/CardComponent'
import PaginationComponent from '@/components/namelist/PaginationComponent'
import AddButtonComponent from '@/components/namelist/AddButtonComponent'
import AddCustomerDialog from '@/components/namelist/customer/AddCustomerDialog'

interface Customer {
  customer_no: string
  customer_id: number
  customer_name: string
  customer_address: string
  customer_img: string
}

const CustomerPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [page, setPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('') // State for search term
  const [customers, setCustomers] = useState<Customer[]>([]) // Dynamic customers state

  useEffect(() => {
    const addParam = searchParams.get('add')
    const pageNoParam = searchParams.get('pageNo')

    if (addParam === 'customer') {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }

    if (pageNoParam) {
      setPage(parseInt(pageNoParam as string, 10))
    }

    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ putCustomer: 'All' })
        })

        const data = await response.json()

        setCustomers(data)
      } catch (err) {
        console.error('Failed to fetch customers:', err)
      }
    }

    fetchCustomers()
  }, [searchParams])

  const itemsPerPage = 8

  const handleAddCustomer = () => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('add', 'customer')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.delete('add')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1) // Reset to the first page when search term changes
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('pageNo', (1).toString())
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('pageNo', value.toString())
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleCardClick = (customerId: number) => {
    window.location.href = `/customer/viewdata?pageId=${customerId}`
  }

  // Filter customers based on the search term
  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedCustomers = filteredCustomers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Container>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom='20px'>
        <Typography variant='h4' component='h1' gutterBottom>
          Customers
        </Typography>
        <AddButtonComponent label='Add New Customer' onClick={handleAddCustomer} />
      </Box>
      <Box>
        <Paper elevation={3}>
          <Box sx={{ padding: 3 }}>
            <Box>
              <TextField variant='outlined' label='Search Customers' value={searchTerm} onChange={handleSearchChange} />
            </Box>
            <Grid container spacing={2}>
              {paginatedCustomers.map(customer => (
                <Grid item key={customer.customer_id} xs={6} md={3}>
                  <CardComponent
                    type='customers'
                    no={customer.customer_no}
                    id={customer.customer_id}
                    name={customer.customer_name}
                    image={customer.customer_img}
                    detail={customer.customer_address}
                    onClick={() => handleCardClick(customer.customer_id)} // Pass the onClick handler
                  />
                </Grid>
              ))}
            </Grid>
            <PaginationComponent
              count={Math.ceil(filteredCustomers.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Paper>
      </Box>
      <AddCustomerDialog open={dialogOpen} onClose={handleDialogClose} />
    </Container>
  )
}

export default CustomerPage
