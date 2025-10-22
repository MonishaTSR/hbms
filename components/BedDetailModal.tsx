import React, { useState, useEffect } from 'react';
import { Bed, Patient, BedStatus } from '../types';

interface BedDetailModalProps {
  bed: Bed | null;
  onClose: () => void;
  onDischarge: (bedId: string) => void;
  onAssignPatient: (bedId: string, patient: Patient) => void;
  onMarkAsClean: (bedId: string) => void;
}

const BedDetailModal: React.FC<BedDetailModalProps> = ({ bed, onClose, onDischarge, onAssignPatient, onMarkAsClean }) => {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [reason, setReason] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [doctor, setDoctor] = useState('Dr. Emily Carter');

  useEffect(() => {
    if (bed && bed.status === BedStatus.Available) {
        setPatientName('');
        setPatientId('');
        setReason('');
        setDepartment('Cardiology');
        setDoctor('Dr. Emily Carter');
    }
  }, [bed]);

  if (!bed) return null;

  const hasPatientDetails = (bed.status === BedStatus.Occupied || bed.status === BedStatus.Cleaning) && bed.patient;

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bed) return;

    const newPatient: Patient = {
      id: patientId || `P${Math.floor(1000 + Math.random() * 9000)}`,
      name: patientName,
      age: 30, 
      gender: 'Not specified',
      admissionDate: new Date().toISOString().split('T')[0],
      condition: 'Newly Admitted',
      doctor: doctor,
      medication: [],
      nextVisit: 'Tomorrow, 10:00 AM',
      reasonForAdmission: reason,
      department: department,
    };

    onAssignPatient(bed.id, newPatient);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Ward A, Bed {bed.number}
              <span className={`ml-3 text-sm font-semibold px-2.5 py-1 rounded-full ${
                bed.status === BedStatus.Occupied ? 'bg-red-100 text-red-700' :
                bed.status === BedStatus.Available ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {bed.status}
              </span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        
        {hasPatientDetails ? (
          <div className="p-6">
            <div className="flex items-center mb-6">
                <img src={`https://i.pravatar.cc/80?u=${bed.patient.id}`} alt="Patient" className="w-20 h-20 rounded-full" />
                <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{bed.patient.name}</h3>
                    <p className="text-gray-600">{bed.patient.age}, {bed.patient.gender}</p>
                    <p className="text-sm text-gray-500">Patient ID: {bed.patient.id}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div><strong className="text-gray-600 block">Assigned Doctor</strong>{bed.patient.doctor}</div>
                <div><strong className="text-gray-600 block">Condition Summary</strong>{bed.patient.condition}</div>
                <div><strong className="text-gray-600 block">Current Medication</strong>{bed.patient.medication.length > 0 ? bed.patient.medication[0].name : 'N/A'}</div>
                <div><strong className="text-gray-600 block">Next Doctor's visit</strong>{bed.patient.nextVisit}</div>
            </div>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex justify-between items-center text-gray-700 font-semibold">
                View Medical Reports
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="mt-6 flex space-x-3">
                <button onClick={onClose} className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Close</button>
                {bed.status === BedStatus.Occupied && (
                  <button onClick={() => bed && onDischarge(bed.id)} className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Discharge Patient</button>
                )}
                {bed.status === BedStatus.Cleaning && (
                  <button onClick={() => bed && onMarkAsClean(bed.id)} className="flex-1 py-2 px-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600">Mark as Clean</button>
                )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Assign a new patient to this bed.</h3>
            <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Patient Name</label>
                    <input type="text" placeholder="Enter patient's full name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Patient ID</label>
                    <input type="text" placeholder="Enter patient's ID (optional)" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Reason for Admission</label>
                    <textarea placeholder="Briefly describe the reason for admission" value={reason} onChange={(e) => setReason(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm h-24"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"><option>Cardiology</option><option>Neurology</option></select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Assign Doctor</label>
                        <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"><option>Dr. Emily Carter</option><option>Dr. John Smith</option></select>
                    </div>
                </div>
                 <div className="mt-6 flex space-x-3">
                    <button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Book Bed</button>
                </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedDetailModal;