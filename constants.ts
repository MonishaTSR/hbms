
import { Ward, Specialist, Ambulance, BedStatus, SpecialistAvailability, AmbulanceStatus } from './types';

export const wards: Ward[] = [
  {
    id: 'ward-1',
    name: 'Cardiology Ward',
    type: 'Intensive Care Unit',
    floor: 3,
    nurseInCharge: 'Jane Doe, RN',
    beds: Array.from({ length: 32 }, (_, i) => {
        const bedNumber = 301 + i;
        let status = BedStatus.Available;
        if (i % 2 === 0 && i < 20) status = BedStatus.Occupied;
        if (i % 5 === 2) status = BedStatus.Cleaning;
        
        return {
            id: `bed-${bedNumber}`,
            number: bedNumber,
            status: status,
            patient: status === BedStatus.Occupied ? {
                id: `P${1000 + i}`,
                name: 'John Doe',
                age: 45,
                gender: 'Male',
                admissionDate: '2023-10-26',
                condition: 'Stable post-surgery',
                doctor: 'Dr. Emily Carter',
                medication: [{ name: 'Paracetamol 500mg', dosage: '500mg', frequency: 'twice a day' }],
                nextVisit: 'Tomorrow, 10:00 AM',
                reasonForAdmission: 'Cardiac Arrest',
                department: 'Cardiology'
            } : undefined,
        }
    }),
  },
];

export const specialists: Specialist[] = [
    { id: 'spec-1', name: 'Dr. John Smith', department: 'Cardiology', availability: SpecialistAvailability.Available, shift: 'Morning', contact: '123-456-7890' },
    { id: 'spec-2', name: 'Dr. Jane Doe', department: 'Neurology', availability: SpecialistAvailability.OnCall, shift: 'Afternoon', contact: '123-456-7891' },
    { id: 'spec-3', name: 'Dr. Peter Jones', department: 'Orthopedics', availability: SpecialistAvailability.OffDuty, shift: 'Night', contact: '123-456-7892' },
    { id: 'spec-4', name: 'Dr. Mary Williams', department: 'Pediatrics', availability: SpecialistAvailability.Available, shift: 'Morning', contact: '123-456-7893' },
    { id: 'spec-5', name: 'Dr. David Brown', department: 'Cardiology', availability: SpecialistAvailability.OnCall, shift: 'Afternoon', contact: '123-456-7894' },
];

export const ambulances: Ambulance[] = [
    { id: 'amb-124', vehicleNumber: 'MH 12 AB 3456', driverName: 'John Smith', status: AmbulanceStatus.OnRoute, patient: 'Jane Doe', eta: 5 },
    { id: 'amb-125', vehicleNumber: 'MH 12 CD 7890', driverName: 'Emily White', status: AmbulanceStatus.Arrived, patient: 'Robert Brown' },
    { id: 'amb-126', vehicleNumber: 'MH 12 EF 1234', driverName: 'Michael Green', status: AmbulanceStatus.Idle },
    { id: 'amb-127', vehicleNumber: 'MH 12 GH 5678', driverName: 'Sarah Jones', status: AmbulanceStatus.OnRoute, patient: 'David Williams', eta: 12 },
];
