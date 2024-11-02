interface MaintenanceRecord {
  no: number
  maintenanceNo: string
  customer: string
  createDate: string
  completeDate: string
  status: number // 0 = Draft, 1 = Complete
}

export const initialData: MaintenanceRecord[] = [
  {
    no: 1,
    maintenanceNo: 'MNT-001',
    customer: 'Customer A',
    createDate: '2023-08-01',
    completeDate: '2023-08-10',
    status: 0
  },
  {
    no: 2,
    maintenanceNo: 'MNT-002',
    customer: 'Customer B',
    createDate: '2023-08-02',
    completeDate: '2023-08-11',
    status: 1
  },
  {
    no: 3,
    maintenanceNo: 'MNT-003',
    customer: 'Customer A',
    createDate: '2023-08-01',
    completeDate: '2023-08-10',
    status: 0
  },
  {
    no: 4,
    maintenanceNo: 'MNT-004',
    customer: 'Customer B',
    createDate: '2023-08-02',
    completeDate: '2023-08-11',
    status: 1
  },
  {
    no: 5,
    maintenanceNo: 'MNT-005',
    customer: 'Customer A',
    createDate: '2023-08-01',
    completeDate: '2023-08-10',
    status: 0
  },
  {
    no: 6,
    maintenanceNo: 'MNT-006',
    customer: 'Customer B',
    createDate: '2023-08-02',
    completeDate: '2023-08-11',
    status: 1
  },
  {
    no: 7,
    maintenanceNo: 'MNT-007',
    customer: 'Customer A',
    createDate: '2023-08-01',
    completeDate: '2023-08-10',
    status: 0
  },
  {
    no: 8,
    maintenanceNo: 'MNT-008',
    customer: 'Customer B',
    createDate: '2023-08-02',
    completeDate: '2023-08-11',
    status: 1
  }

  // Add more records as needed
]
