export interface MaintenanceForm {
  maintenance_no: string
  customer_name: string
  maintenance_create: string
  customer_address: string
  admin: string
  status: number
}

export interface ServerNetworkForm {
  Firewall: boolean
  Server: boolean
  Switch: boolean
  NAS: boolean
  UPSServer: boolean
  CCTV: boolean
  Printers: boolean
  RouterISP: boolean
  WirelessAP: boolean
  firewallNote: string
  serverNote: string
  switchNote: string
  nasNote: string
  upsserverNote: string
  cctvNote: string
  printersNote: string
  routerispNote: string
  wirelessapNote: string
}

export interface MaintenanceItem {
  name: string
  diskClean: boolean
  windowUpdate: boolean
  driverUpdate: boolean
  virusScan: boolean
  note: string
}

export interface ITMaintenanceForm {
  maintenanceItems: MaintenanceItem[]
}

export interface MaintenanceData {
  maintenanceForm: MaintenanceForm
  serverNetworkForm: ServerNetworkForm
  itMaintenanceForm: ITMaintenanceForm
}
