import { Ward, Specialist, Ambulance, BedStatus, SpecialistAvailability, AmbulanceStatus, Patient } from './types';

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
        let patientData: Patient | undefined = undefined;

        const samplePatient = {
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
        };

        if (i % 2 === 0 && i < 20) {
            status = BedStatus.Occupied;
            patientData = samplePatient;
        }
        if (i % 5 === 2) {
            status = BedStatus.Cleaning;
            // A cleaning bed still has the context of the last patient
            patientData = { ...samplePatient, name: 'Jane Smith', id: `P${2000+i}`, condition: "Discharged, awaiting cleaning" };
        }
        
        return {
            id: `bed-${bedNumber}`,
            number: bedNumber,
            status: status,
            patient: patientData,
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
    { 
        id: 'amb-001', 
        vehicleNumber: 'AMB-001', 
        driverName: 'John Smith',
        driverContact: '111-222-3333',
        status: AmbulanceStatus.OnRoute, 
        patientName: 'Jane Doe',
        patientAge: 58,
        patientGender: 'Female',
        eta: 5,
        riskLevel: 'High',
        injuryDescription: 'Suspected cardiac arrest, patient is unconscious.',
        pickupLocation: '123 Maple St',
        destination: 'City General Hospital',
    },
    { 
        id: 'amb-003', 
        vehicleNumber: 'AMB-003', 
        driverName: 'Emily White',
        driverContact: '111-222-4444',
        status: AmbulanceStatus.Arrived, 
        patientName: 'Robert Brown',
        patientAge: 34,
        patientGender: 'Male',
        riskLevel: 'Medium',
        injuryDescription: 'Compound fracture in left leg.',
        pickupLocation: '456 Oak Ave',
        destination: 'City General Hospital',
    },
    { 
        id: 'amb-002', 
        vehicleNumber: 'AMB-002', 
        driverName: 'Michael Green',
        driverContact: '111-222-5555',
        status: AmbulanceStatus.Idle 
    },
    { 
        id: 'amb-004', 
        vehicleNumber: 'AMB-004', 
        driverName: 'Sarah Jones', 
        driverContact: '111-222-6666',
        status: AmbulanceStatus.OnRoute, 
        patientName: 'David Williams',
        patientAge: 72,
        patientGender: 'Male',
        eta: 12,
        riskLevel: 'High',
        injuryDescription: 'Patient experiencing severe chest pains and shortness of breath.',
        pickupLocation: '789 Pine Ln',
        destination: 'City General Hospital',
    },
];