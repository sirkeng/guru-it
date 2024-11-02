import React from 'react';

import { Tabs, Tab, Box } from '@mui/material';
import { Icon } from '@iconify/react';

type StatusTab = {
  label: string;
  icon: any;
  count?: number;
};

type Props = {
  currentTab: string;
  onTabChange: (tab: string) => void;
  statusCounts: { [key: string]: number };
};

const StatusTabs: React.FC<Props> = ({ currentTab, onTabChange, statusCounts }) => {
  const tabs: StatusTab[] = [
    { label: 'All', icon: 'mdi:filter-outline', count: statusCounts.All },
    { label: 'Waiting', icon: 'mdi:clock-outline', count: statusCounts.Waiting },
    { label: 'On Process', icon: 'mdi:cog-outline', count: statusCounts['On Process'] },
    { label: 'Complete', icon: 'mdi:check-circle-outline', count: statusCounts.Complete },
    { label: 'Delete', icon: 'mdi:trash-can-outline' },
  ];

  const getBadgeColor = (label: string) => {
    switch (label) {
      case 'Waiting':
        return 'red';
      case 'On Process':
        return 'orange';
      case 'Complete':
        return 'green';
      default:
        return 'inherit';
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => onTabChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="status tabs"
      >
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
    </Box>
  );
};

export default StatusTabs;
