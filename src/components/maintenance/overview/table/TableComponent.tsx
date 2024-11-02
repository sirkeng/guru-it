import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';

interface MaintenanceRecord {
  maintenance_id: number;
  maintenance_no: string;
  customer_name: string;
  maintenance_create: string;
  maintenance_complete: string;
  maintenance_status: number; // 0 = Draft, 1 = Complete
}

interface TableComponentProps {
  data: MaintenanceRecord[];
  order: any;
  orderBy: any;
  onRequestSort: any;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, order, orderBy, onRequestSort }) => {
  const handleRowClick = (documentNo: string, customer: string) => {
    window.location.href = `/maintenance/viewdata?documentNo=${encodeURIComponent(documentNo)}&customer=${encodeURIComponent(customer)}`;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === 'no' ? order : false}>
              <TableSortLabel
                active={orderBy === 'no'}
                direction={orderBy === 'no' ? order : 'asc'}
                onClick={() => onRequestSort('no')}
              >
                No
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'maintenanceNo' ? order : false}>
              <TableSortLabel
                active={orderBy === 'maintenanceNo'}
                direction={orderBy === 'maintenanceNo' ? order : 'asc'}
                onClick={() => onRequestSort('maintenanceNo')}
              >
                Maintenance No
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'customer' ? order : false}>
              <TableSortLabel
                active={orderBy === 'customer'}
                direction={orderBy === 'customer' ? order : 'asc'}
                onClick={() => onRequestSort('customer')}
              >
                Customer
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'createdDate' ? order : false}>
              <TableSortLabel
                active={orderBy === 'createdDate'}
                direction={orderBy === 'createdDate' ? order : 'asc'}
                onClick={() => onRequestSort('createdDate')}
              >
                Created Date
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'completedDate' ? order : false}>
              <TableSortLabel
                active={orderBy === 'completedDate'}
                direction={orderBy === 'completedDate' ? order : 'asc'}
                onClick={() => onRequestSort('completedDate')}
              >
                Completed Date
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'status' ? order : false}>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? order : 'asc'}
                onClick={() => onRequestSort('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow
              key={record.maintenance_id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(record.maintenance_no, record.customer_name)}
            >
              <TableCell>{record.maintenance_id}</TableCell>
              <TableCell>{record.maintenance_no}</TableCell>
              <TableCell>{record.customer_name}</TableCell>
              <TableCell>{record.maintenance_create}</TableCell>
              <TableCell>{record.maintenance_complete || 'N/A'}</TableCell>
              <TableCell>{record.maintenance_status === 0 ? 'Draft' : 'Complete'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
