import type { MaintenanceData } from '@/types/maintenance'

export const getRandomBoolean = (): boolean => Math.random() >= 0.5

export const getRandomStatus = (): number => Math.floor(Math.random() * 2)

export const generateMaintenanceData = (): MaintenanceData => ({
  maintenanceForm: {
    maintenanceNo: 'MNT-001',
    customer: 'ชื่อลูกค้า',
    date: new Date().toISOString().split('T')[0],
    address: 'MyOffice BNK48',
    admin: 'ชื่อผู้สร้าง Maintenance นี้',
    status: getRandomStatus()
  },
  serverNetworkForm: {
    Firewall: getRandomBoolean(),
    Server: getRandomBoolean(),
    Switch: getRandomBoolean(),
    NAS: getRandomBoolean(),
    UPSServer: getRandomBoolean(),
    CCTV: getRandomBoolean(),
    Printers: getRandomBoolean(),
    RouterISP: getRandomBoolean(),
    WirelessAP: getRandomBoolean(),
    firewallNote: 'Test',
    serverNote: 'Test',
    switchNote: 'Test',
    nasNote: 'Test',
    upsserverNote: 'Test',
    cctvNote: 'Test',
    printersNote: 'Test',
    routerispNote: 'Test',
    wirelessapNote: 'Test'
  },
  itMaintenanceForm: {
    maintenanceItems: [
      {
        name: 'PC-001',
        diskClean: getRandomBoolean(),
        windowUpdate: getRandomBoolean(),
        driverUpdate: getRandomBoolean(),
        virusScan: getRandomBoolean(),
        note: ''
      },
      {
        name: 'PC-002',
        diskClean: getRandomBoolean(),
        windowUpdate: getRandomBoolean(),
        driverUpdate: getRandomBoolean(),
        virusScan: getRandomBoolean(),
        note: ''
      },
      {
        name: 'PC-003',
        diskClean: getRandomBoolean(),
        windowUpdate: getRandomBoolean(),
        driverUpdate: getRandomBoolean(),
        virusScan: getRandomBoolean(),
        note: ''
      }
    ]
  }
})
