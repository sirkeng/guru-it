// data.ts

export interface DocumentData {
  no: number
  documentNo: string
  customer: string
  createdDate: string
  completedDate: string
  status: any
}

export const initialData: DocumentData[] = [
  {
    no: 1,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 2
  },
  {
    no: 2,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 1
  },
  {
    no: 3,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 0
  },
  {
    no: 4,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 1
  },
  {
    no: 5,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 2
  },
  {
    no: 6,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 0
  },
  {
    no: 7,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 2
  },
  {
    no: 8,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 1
  },
  {
    no: 9,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 0
  },
  {
    no: 10,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 1
  },
  {
    no: 11,
    documentNo: 'DOC123',
    customer: 'Customer A',
    createdDate: '2023-08-19',
    completedDate: '2023-08-20',
    status: 2
  },
  {
    no: 12,
    documentNo: 'DOC124',
    customer: 'Customer B',
    createdDate: '2023-08-18',
    completedDate: '2023-08-19',
    status: 0
  }
]
