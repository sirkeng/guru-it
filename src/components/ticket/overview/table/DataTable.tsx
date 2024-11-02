import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { getStatusText } from '@/utils/status';

type DataRow = {
  ticket_id: number;
  ticket_no: string;
  customer_name: string;
  ticket_create: string;
  ticket_complete: string | null;
  ticket_status: number;
};

type DataTableProps = {
  data: DataRow[];
  order: any;
  orderBy: any;
  onRequestSort: any;
};

const DataTable: React.FC<DataTableProps> = ({ data, order, orderBy, onRequestSort }) => {
  const handleRowClick = (ticket_no: string, customer_name: string) => {
    window.location.href = `/ticket/viewdata?ticket_no=${encodeURIComponent(ticket_no)}&customer=${encodeURIComponent(customer_name)}`;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === 'ticket_id' ? order : false}>
              <TableSortLabel
                active={orderBy === 'ticket_id'}
                direction={orderBy === 'ticket_id' ? order : 'asc'}
                onClick={() => onRequestSort('ticket_id')}
              >
                Ticket ID
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'ticket_no' ? order : false}>
              <TableSortLabel
                active={orderBy === 'ticket_no'}
                direction={orderBy === 'ticket_no' ? order : 'asc'}
                onClick={() => onRequestSort('ticket_no')}
              >
                Ticket No
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'customer_name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'customer_name'}
                direction={orderBy === 'customer_name' ? order : 'asc'}
                onClick={() => onRequestSort('customer_name')}
              >
                Customer
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'ticket_create' ? order : false}>
              <TableSortLabel
                active={orderBy === 'ticket_create'}
                direction={orderBy === 'ticket_create' ? order : 'asc'}
                onClick={() => onRequestSort('ticket_create')}
              >
                Created Date
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'ticket_complete' ? order : false}>
              <TableSortLabel
                active={orderBy === 'ticket_complete'}
                direction={orderBy === 'ticket_complete' ? order : 'asc'}
                onClick={() => onRequestSort('ticket_complete')}
              >
                Completed Date
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'ticket_status' ? order : false}>
              <TableSortLabel
                active={orderBy === 'ticket_status'}
                direction={orderBy === 'ticket_status' ? order : 'asc'}
                onClick={() => onRequestSort('ticket_status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ticket_id} hover sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(row.ticket_no, row.customer_name)}>
              <TableCell>{row.ticket_id}</TableCell>
              <TableCell>{row.ticket_no}</TableCell>
              <TableCell>{row.customer_name}</TableCell>
              <TableCell>{row.ticket_create}</TableCell>
              <TableCell>{row.ticket_complete || 'N/A'}</TableCell>
              <TableCell>{getStatusText(row.ticket_status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
