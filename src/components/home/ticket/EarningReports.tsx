// Next Imports
import { useState } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// Third Party Imports
import classnames from 'classnames'
import type { ApexOptions } from 'apexcharts'

// Types Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { calculatePercentage } from '@/utils/math'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@core/libs/styles/AppReactApexCharts'))

type DataType = {
  stats: string
  title: string
  progress: number
  avatarIcon: string
  avatarColor?: ThemeColor
  progressColor?: ThemeColor
}

// Vars
const series = [{ data: [37, 76, 65, 41, 50] }]

const fetchDataForPeriod = (period: string): DataType[] => {
  switch (period) {
    case 'Today':
      return [
        {
          title: 'Waiting',
          progress: 59,
          stats: '59 tickets',
          progressColor: 'error',
          avatarColor: 'error',
          avatarIcon: 'tabler-ticket'
        },
        {
          title: 'On Process',
          progress: 44,
          stats: '44 tickets',
          progressColor: 'warning',
          avatarColor: 'warning',
          avatarIcon: 'tabler-clock'
        },
        {
          title: 'Complete',
          progress: 61,
          stats: '61 tickets',
          progressColor: 'success',
          avatarColor: 'success',
          avatarIcon: 'mdi:check'
        }
      ];
    case 'Last Week':
      return [
        {
          title: 'Waiting',
          progress: 159,
          stats: '159 tickets',
          progressColor: 'error',
          avatarColor: 'error',
          avatarIcon: 'tabler-ticket'
        },
        {
          title: 'On Process',
          progress: 144,
          stats: '144 tickets',
          progressColor: 'warning',
          avatarColor: 'warning',
          avatarIcon: 'tabler-clock'
        },
        {
          title: 'Complete',
          progress: 161,
          stats: '161 tickets',
          progressColor: 'success',
          avatarColor: 'success',
          avatarIcon: 'mdi:check'
        }
      ];
    case 'Last Month':
      return [
        {
          title: 'Waiting',
          progress: 259,
          stats: '259 tickets',
          progressColor: 'error',
          avatarColor: 'error',
          avatarIcon: 'tabler-ticket'
        },
        {
          title: 'On Process',
          progress: 244,
          stats: '244 tickets',
          progressColor: 'warning',
          avatarColor: 'warning',
          avatarIcon: 'tabler-clock'
        },
        {
          title: 'Complete',
          progress: 261,
          stats: '261 tickets',
          progressColor: 'success',
          avatarColor: 'success',
          avatarIcon: 'mdi:check'
        }
      ];
    case 'Last Year':
      return [
        {
          title: 'Waiting',
          progress: 559,
          stats: '559 tickets',
          progressColor: 'error',
          avatarColor: 'error',
          avatarIcon: 'tabler-ticket'
        },
        {
          title: 'On Process',
          progress: 544,
          stats: '544 tickets',
          progressColor: 'warning',
          avatarColor: 'warning',
          avatarIcon: 'tabler-clock'
        },
        {
          title: 'Complete',
          progress: 561,
          stats: '561 tickets',
          progressColor: 'success',
          avatarColor: 'success',
          avatarIcon: 'mdi:check'
        }
      ];
    default:
      return [];
  }
};

const EarningReports = () => {
  // Vars
  const primaryColorWithOpacity = 'var(--mui-palette-primary-lightOpacity)'
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const handleSelect = (period: string) => {
    setSelectedPeriod(period);

    // Optionally, you can fetch or filter data based on the selected period here
  };

  // Get the data based on the selected period
  const currentData = fetchDataForPeriod(selectedPeriod);

  // Calculate the total progress
  const totalProgress = currentData.reduce((total, item) => total + item.progress, 0);

  //ฝั่งกราฟ
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Define days of the week, excluding Saturday and Sunday
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Get the index of today in the week
  const todayIndex = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust for offset

  // Remove the current day from the array
  const categories = [
    ...daysOfWeek.slice(0, todayIndex), // Days before today
    ...daysOfWeek.slice(todayIndex), // Days after today
  ];

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    grid: {
      show: false,
      padding: {
        top: -31,
        left: 0,
        right: 0,
        bottom: -9
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '42%'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      ...daysOfWeek.map((_, index) =>
        index === todayIndex ? 'var(--mui-palette-primary-main)' : primaryColorWithOpacity
      )
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          fontSize: '13px',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        title='Tickets Reports'
        subheader={`${selectedPeriod} Tickets Overview`}
        action={<OptionMenu options={['Today', 'Last Week', 'Last Month', 'Last Year']} onSelect={handleSelect} />}
        className='pbe-0'
      />
      <CardContent className='flex flex-col gap-5 max-md:gap-5 max-[1015px]:gap-[62px] max-[1051px]:gap-10 max-[1200px]:gap-5 max-[1310px]:gap-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col gap-3 is-full sm:is-[unset]'>
            <div className='flex items-center gap-2.5'>
              <Typography variant='h2'>{totalProgress}</Typography>
            </div>
            <Typography variant='body2' className='text-balance'>
              Tickets of this {selectedPeriod}
            </Typography>
          </div>
          <AppReactApexCharts type='bar' height={163} width='100%' series={series} options={options} />
        </div>
        <div className='flex flex-col sm:flex-row gap-6 p-5 border rounded'>
          {currentData.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 is-full'>
              <div className='flex items-center gap-2'>
                <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={26}>
                  <Icon className={classnames(item.avatarIcon, 'text-lg')} icon={item.avatarIcon} />
                </CustomAvatar>
                <Typography variant='h6' className='leading-6 font-normal'>
                  {item.title}
                </Typography>
              </div>
              <Typography variant='h4'>{item.stats}</Typography>
              <LinearProgress
                value={calculatePercentage(item.progress, totalProgress)}
                variant='determinate'
                color={item.progressColor}
                className='max-bs-1'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningReports
