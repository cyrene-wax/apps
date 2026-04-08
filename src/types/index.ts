export interface Driver {
  id?: string;
  driverName: string;
  plateNumber: string;
  rfidTag: string | null;
  status: string | null;
  contactNumber: string;
  vehicleModel: string;
  registeredAt?: string;
}

export type RfidTag = {
  id?: string;
  rfidTag: string;
  status: string;
};

export type AssignedToDriverTag = {
  id: string;
  rfidTag: string;
  status: RfidTag['status'];
  driverName: Driver['driverName'];
  assignedAt: string | null;
  plateNumber?: Driver['plateNumber'];
};

export type ParkingSlot = {
  id: string;
  slotNumber: number;
  quadrant: string;
  status: string;
  driverName: Driver['driverName'];
  plateNumber: Driver['plateNumber'];
  rfidTag: Driver['rfidTag'];
  vehicleModel: Driver['vehicleModel'];
  contactNumber: Driver['contactNumber'];
  driverStatus: Driver["status"];
  time: string;
  occupancy: number;
};

export interface CurrentScan {
  plateNumber: Driver['plateNumber'];
  scannedAt: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: string;
}

export type State = 'idle' | 'scanning' | 'verified' | 'not-registered';
