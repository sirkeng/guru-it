import React from 'react';

import { Tabs, Tab, Box } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

type StatusTab = {
  label: string;
  icon: any;
  count?: number;
};

interface TabsComponentProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  statusCounts: { [key: string]: number };
}

const TabsComponent: React.FC<TabsComponentProps> = ({ currentTab, onTabChange, statusCounts }) => {

  const tabs: StatusTab[] = [
    { label: 'All', icon: 'mdi:filter-outline', count: statusCounts.All },
    { label: 'Draft', icon: 'mdi:clock-outline', count: statusCounts.Draft },
    { label: 'Complete', icon: 'mdi:check-circle-outline', count: statusCounts.Complete },
    { label: 'Delete', icon: 'mdi:trash-can-outline' },
  ];

  const getBadgeColor = (label: string) => {
    switch (label) {
      case 'Draft':
        return 'red';
      case 'Complete':
        return 'green';
      default:
        return 'inherit';
    }
  };

  return (
    <Tabs
      value={currentTab}
      onChange={(e, newValue) => onTabChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="status tabs">
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={
            <Box display="flex" alignItems="center">
              <Icon icon={tab.icon} className="text-xl" />
              <Box component="span" ml={1}>
                {tab.label}
              </Box>
              {tab.count !== undefined && (
                <Box
                  component="span"
                  ml={1}
                  sx={{
                    color: getBadgeColor(tab.label),
                    fontWeight: 'bold',
                  }}
                >
                  ({tab.count})
                </Box>
              )}
            </Box>
          }
          value={tab.label}
          sx={{ textTransform: 'none' }}
        />
      ))}
    </Tabs>
  );
};

export default TabsComponent;
