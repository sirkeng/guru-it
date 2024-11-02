'use client';
import React, { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Button, Paper, TablePagination, TextField } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

import TableComponent from '@/components/maintenance/overview/table/TableComponent';
import TabsComponent from '@/components/maintenance/overview/table/TabsComponent';
import { getStatusTextMaintenance } from '@/utils/status';

type Order = 'asc' | 'desc';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentTab, setCurrentTab] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('status');
  const [maintenanceData, setMaintenanceData] = useState<any[]>([]); // เพิ่ม state สำหรับเก็บข้อมูล maintenance
  const [loading, setLoading] = useState<boolean>(true);

  // ดึงข้อมูลจาก API เมื่อ component โหลด
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenances/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ putMaintenance: 'All' }), // ส่งค่า putMaintenance = 'All'
        });

        const data = await response.json();

        if (response.ok) {
          setMaintenanceData(data); // เก็บข้อมูล maintenance ใน state
          console.log(data)
        } else {
          console.error('Error fetching maintenance data:', data);
        }
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      } finally {
        setLoading(false); // หยุดแสดง Loading
      }
    };

    fetchMaintenanceData();
  }, []);

  useEffect(() => {
    const pageNoParam = searchParams.get('pageNo');
    const perPageParam = searchParams.get('itemsPerPage');
    const stmidParam = searchParams.get('stmid');

    if (pageNoParam) {
      setCurrentPage(parseInt(pageNoParam as string, 10));
    }

    if (perPageParam) {
      setItemsPerPage(parseInt(perPageParam, 10));
    }

    if (stmidParam) {
      switch (stmidParam) {
        case '0':
          setCurrentTab('Draft');
          break;
        case '1':
          setCurrentTab('Complete');
          break;
        default:
          setCurrentTab('All');
      }
    } else {
      setCurrentTab('All');
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentPage(1); // Reset page number on tab change

    const newParams = new URLSearchParams({ pageNo: '1' });

    if (tab === 'Draft') {
      newParams.set('stmid', '0');
    } else if (tab === 'Complete') {
      newParams.set('stmid', '1');
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleAddMaintenance = () => {
    window.location.href = '/maintenance/adddata';
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage + 1); // MUI TablePagination uses zero-based index for pages
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('pageNo', (newPage + 1).toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to page 1 when items per page change
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('itemsPerPage', event.target.value);
    newParams.set('pageNo', '1');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = maintenanceData
    .filter((row) => currentTab === 'All' || getStatusTextMaintenance(row.maintenance_status) === currentTab)
    .filter((row) =>
      row.maintenance_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }

      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });

  console.log(filteredData)

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <div>Loading...</div>; // แสดงผล Loading ขณะดึงข้อมูล
  }

  return (
    <React.Fragment>
      <div className="flex justify-end item-end my-4">
        <Button
          className="px-4 py-2 rounded-md flex items-center gap-2"
          variant="contained"
          color="primary"
          onClick={handleAddMaintenance}
        >
          <Icon icon="ph:plus-fill" />
          Create Maintenance
        </Button>
      </div>
      <Paper elevation={3}>
        <Box width="100%" padding="12px">
          <TabsComponent currentTab={currentTab} onTabChange={handleTabChange} statusCounts={{}} />
          <div className="m-4">
            <TextField
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาข้อมูล"
              label="ค้นหา"
              focused
              className="border p-2 rounded"
            />
          </div>
          <TableComponent
            data={paginatedData}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TablePagination
            component="div"
            count={filteredData.length}
            page={currentPage - 1} // MUI TablePagination expects zero-based page index
            onPageChange={handlePageChange}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleItemsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]} // Customize the options as needed
          />
        </Box>
      </Paper>
    </React.Fragment>
  );
}
