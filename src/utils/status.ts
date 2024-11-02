import type { ChipProps } from '@mui/material'

export const getStatusText = (status: any): string => {
  switch (status) {
    case 0:
      return 'Waiting'
    case 1:
      return 'On Process'
    case 2:
      return 'Complete'
    default:
      return 'Unknown'
  }
}

export const getStatusTextMaintenance = (status: any): string => {
  switch (status) {
    case 0:
      return 'Draft'
    case 1:
      return 'Complete'
    default:
      return 'Unknown'
  }
}

export const getStatusColor = (status: number): ChipProps['color'] => {
  switch (status) {
    case 0:
      return 'error'
    case 1:
      return 'warning'
    case 2:
      return 'success'
    default:
      return 'primary'
  }
}
