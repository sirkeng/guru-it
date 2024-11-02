'use client'
import React, { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Container, Grid, Typography } from '@mui/material';

import PaginationComponent from '@/components/namelist/PaginationComponent';
import CardComponent from '@/components/namelist/CardComponent';
import AddButtonComponent from '@/components/namelist/AddButtonComponent';
import AddEngineerDialog from '@/components/namelist/engineer/AddEngineerDialog';

const EngineerPage = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [engineers, setEngineers] = useState<any[]>([]); // Dynamic customers state

  useEffect(() => {
    const addParam = searchParams.get('add');
    const pageNoParam = searchParams.get('pageNo');

    if (addParam === 'engineer') {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }

    if (pageNoParam) {
      setPage(parseInt(pageNoParam as string, 10));
    }

    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ putEngineer: 'All' }),
        });

        const data = await response.json();

        setEngineers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };

    fetchCustomers();

  }, [searchParams]);

  const itemsPerPage = 8;

  const handleAddEngineer = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('add', 'engineer');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('add');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCardClick = (customerId: number) => {
    window.location.href = `/engineer/viewdata?pageId=${customerId}`;
  };

  const paginatedEngineers = engineers?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Typography variant="h4" component="h1" gutterBottom>
          Engineers
        </Typography>
        <AddButtonComponent label="Add New Engineer" onClick={handleAddEngineer} />
      </Box>
      <Grid container spacing={2}>
        {paginatedEngineers.map((engineer) => (
          <Grid item key={engineer.user_id} xs={6} md={3}>
            <CardComponent
              type='engineers'
              no={engineer.user_no}
              id={engineer.user_id}
              name={engineer.user_firstname}
              image={engineer.user_img}
              detail={engineer.user_jobtitle}
              onClick={() => handleCardClick(engineer.user_id)}
            />
          </Grid>
        ))}
      </Grid>
      <PaginationComponent
        count={Math.ceil(engineers.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
      />
      <AddEngineerDialog open={dialogOpen} onClose={handleDialogClose} />
    </Container>
  );
};

export default EngineerPage;
