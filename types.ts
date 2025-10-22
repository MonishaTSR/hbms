
export enum BedStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Cleaning = 'Cleaning',
}

export enum SpecialistAvailability {
    Available = 'Available',
    OnCall = 'On-Call',
    OffDuty = 'Off-Duty',
}

export enum AmbulanceStatus {
    OnRoute = 'On route',
    Arrived = 'Arrived',
    Idle = 'Idle',
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  condition: string;
  doctor: string;
  medication: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  nextVisit: string;
  reasonForAdmission: string;
  department: string;
}

export interface Bed {
  id: string;
  number: number;
  status: BedStatus;
  patient?: Patient;
}

export interface Ward {
  id: string;
  name: string;
  type: string;
  floor: number;
  nurseInCharge: string;
  beds: Bed[];
}

export interface Specialist {
    id: string;
    name: string;
    department: string;
    availability: SpecialistAvailability;
    shift: 'Morning' | 'Afternoon' | 'Night';
    contact: string;
}

export interface Ambulance {
    id: string;
    vehicleNumber: string;
    driverName: string;
    driverContact: string;
    status: AmbulanceStatus;
    patientName?: string;
    patientAge?: number;
    patientGender?: string;
    eta?: number;
    riskLevel?: 'High' | 'Medium' | 'Low';
    injuryDescription?: string;
    pickupLocation?: string;
    destination?: string;
}