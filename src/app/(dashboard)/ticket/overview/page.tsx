'use client'
import React, { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Box, Button, Paper, TablePagination, TextField } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import StatusTabs from '@/components/ticket/overview/table/StatusTabs'
import DataTable from '@/components/ticket/overview/table/DataTable'
import TicketModal from '@/components/ticket/add/modal'
import { getStatusText } from '@/utils/status'

type Order = 'asc' | 'desc'

type TicketData = {
  ticket_id: number
  ticket_no: string
  ticket_title: string
  ticket_detail: string
  ticket_file: string
  ticket_create: string
  ticket_accept: string | null
  ticket_complete: string | null
  ticket_status: number
  customer_name: string
  customer_address: string
  customer_prov: string
  customer_img: string
  user_firstname: string | null
  user_lastname: string | null
  user_email: string | null
  user_phone: string | null
}

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [currentTab, setCurrentTab] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof TicketData>('ticket_no')

  const [ticketData, setTicketData] = useState<TicketData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    const fetchTicketData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ putTicket: 'All' }) // ส่งค่า putTicket = 'All'
        })

        const data = await response.json()

        if (response.ok) {
          setTicketData(data)
        } else {
          console.error('Error fetching ticket data:', data)
        }
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTicketData()
  }, [])

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    setCurrentPage(1) // Reset page number on tab change

    const newParams = new URLSearchParams({ pageNo: '1' })

    if (tab === 'Waiting') {
      newParams.set('sttkid', '0')
    } else if (tab === 'On Process') {
      newParams.set('sttkid', '1')
    } else if (tab === 'Complete') {
      newParams.set('sttkid', '2')
    }

    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage + 1) // MUI TablePagination uses zero-based index for pages
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('pageNo', (newPage + 1).toString())
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1) // Reset to page 1 when items per page change
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('itemsPerPage', event.target.value)
    newParams.set('pageNo', '1')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('add', 'ticket')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.delete('add')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleModalSubmit = (data: { ticketTitle: string; ticketDescription: string; ticketFile: File | null }) => {
    console.log('Ticket Created:', data)
  }

  const handleRequestSort = (property: keyof TicketData) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const sortedData = [...ticketData]
    .filter(row => currentTab === 'All' || getStatusText(row.ticket_status) === currentTab)
    .filter(
      row =>
        (row.ticket_no?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (row.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    )
    .sort((a, b) => {
      // ตรวจสอบว่า a[orderBy] และ b[orderBy] มีค่าหรือไม่ก่อนที่จะเปรียบเทียบ
      const aValue = a[orderBy] ?? ''
      const bValue = b[orderBy] ?? ''

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1
      }

      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1
      }

      return 0
    })

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <React.Fragment>
      <div className='flex justify-end item-end my-4'>
        <Button
          className='px-4 py-2 rounded-md flex items-center gap-2'
          variant='contained'
          color='primary'
          onClick={handleOpenModal}
        >
          <Icon icon='ph:plus-fill' />
          Create Ticket
        </Button>
      </div>
      <Paper elevation={3}>
        <Box width='100%' padding='12px'>
          <StatusTabs currentTab={currentTab} onTabChange={handleTabChange} statusCounts={{}} />
          <div className='m-4'>
            <TextField
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='ค้นหาข้อมูล'
              label='ค้นหา'
              focused
              className='border p-2 rounded'
            />
          </div>
          <DataTable data={paginatedData} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TablePagination
            component='div'
            count={sortedData.length}
            page={currentPage - 1} // MUI TablePagination expects zero-based page index
            onPageChange={handlePageChange}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleItemsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]} // Customize the options as needed
          />
        </Box>
      </Paper>
      <TicketModal isOpen={isModalOpen} closeModal={handleCloseModal} onSubmit={handleModalSubmit} />
    </React.Fragment>
  )
}
