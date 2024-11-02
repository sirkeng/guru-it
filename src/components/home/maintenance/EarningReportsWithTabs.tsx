'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'
import type { ApexOptions } from 'apexcharts'

// Components Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@core/libs/styles/AppReactApexCharts'))

type ApexChartSeries = NonNullable<ApexOptions['series']>

// Adjusted Tab Categories
type TabCategory = 'all' | 'self'

type TabType = {
  type: TabCategory
  avatarIcon: string
  series: ApexChartSeries
}

// Vars
const tabData: TabType[] = [
  {
    type: 'all',
    avatarIcon: 'solar:document-outline',
    series: [{ data: [28, 10, 46, 38, 15, 30, 35, 28, 8, 10, 12, 49] }]
  },
  {
    type: 'self',
    avatarIcon: 'mingcute:user-1-fill',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30, 10, 12, 49] }]
  }
]

const renderTabs = (value: TabCategory) => {
  return tabData.map((item, index) => (
    <Tab
      key={index}
      value={item.type}
      className='mie-4'
      label={
        <div
          className={classnames(
            'flex flex-col items-center justify-center gap-2 is-[110px] bs-[100px] border rounded-xl',
            item.type === value ? 'border-solid border-[var(--mui-palette-primary-main)]' : 'border-dashed'
          )}
        >
          <CustomAvatar variant='rounded' skin='light' size={38} {...(item.type === value && { color: 'primary' })}>
            <Icon className={classnames('text-[22px]', { 'text-textSecondary': item.type !== value }, item.avatarIcon)} icon={item.avatarIcon} />
          </CustomAvatar>
          <Typography className='font-medium capitalize' color='text.primary'>
            {item.type}
          </Typography>
        </div>
      }
    />
  ))
}

const renderTabPanels = (value: TabCategory, theme: Theme, options: ApexOptions, colors: string[]) => {
  const currentMonth = new Date().getMonth()

  return tabData.map((item, index) => {

    const finalColors = colors.map((color, i) =>
      i === currentMonth ? 'var(--mui-palette-primary-main)' : color
    )

    return (
      <TabPanel key={index} value={item.type} className='!p-0'>
        <AppReactApexCharts
          type='bar'
          height={233}
          width='100%'
          options={{ ...options, colors: finalColors }}
          series={item.series}
        />
      </TabPanel>
    )
  })
}

const EarningReportsWithTabs = () => {
  // States
  const [value, setValue] = useState<TabCategory>('all')

  // Hooks
  const theme = useTheme()

  // Vars
  const disabledText = 'var(--mui-palette-text-disabled)'

  const handleChange = (event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue)
  }

  const colors = Array(12).fill('var(--mui-palette-primary-lightOpacity)')

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '33%',
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -11,
      formatter: val => `${val}`,
      style: {
        fontWeight: 500,
        colors: ['var(--mui-palette-text-primary)'],
        fontSize: theme.typography.body1.fontSize as string
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -19,
        left: -4,
        right: 0,
        bottom: -11
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: 'var(--mui-palette-divider)' },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -18,
        formatter: val => `${val}`,
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    responsive: [
      {
        breakpoint: 1450,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          dataLabels: {
            style: {
              fontSize: theme.typography.body2.fontSize as string
            }
          },
          plotOptions: {
            bar: { columnWidth: '58%' }
          }
        }
      },
      {
        breakpoint: 500,
        options: {
          plotOptions: {
            bar: { columnWidth: '70%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title={`Maintenance Reports - ${new Date().getFullYear()}`}
        subheader='Yearly Maintenance Overview'
        action={<OptionMenu options={['Last Week', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='earning report tabs'
            className='!border-0 mbe-10'
            sx={{
              '& .MuiTabs-indicator': { display: 'none !important' },
              '& .MuiTab-root': { padding: '0 !important', border: '0 !important' }
            }}
          >
            {renderTabs(value)}
          </TabList>
          {renderTabPanels(value, theme, options, colors)}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default EarningReportsWithTabs
