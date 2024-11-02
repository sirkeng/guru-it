'use client'

import React, { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Box, Tab, Tabs, Typography } from "@mui/material";

import DashboardTicket from "@/components/home/DashboardTicket";
import DashboardMaintenance from "@/components/home/DashboardMaintenance";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Page() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const tabdbidParam = searchParams.get('tabdbid');

    if (tabdbidParam) {
      switch (tabdbidParam) {
        case '0':
          setValue(0);
          break;
        case '1':
          setValue(1);
          break;
        default:
          setValue(0);
      }
    } else {
      setValue(0);
    }
  }, [searchParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    const newParams = new URLSearchParams();

    if (newValue === 0) {
      newParams.set('tabdbid', '0');
    } else if (newValue === 1) {
      newParams.set('tabdbid', '1');
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h3" component='h2'>Dashboard</Typography>
      </Box>
      <Box>
        <Tabs sx={{ borderBlockEnd: '0px !important' }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ticket" {...a11yProps(0)} />
          <Tab label="Maintenance" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DashboardTicket />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DashboardMaintenance />
      </CustomTabPanel>
    </Box>
  )
}
