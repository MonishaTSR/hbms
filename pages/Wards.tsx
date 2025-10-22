import React, { useState } from 'react';
import { wards } from '../constants';
import { Bed, BedStatus, Patient } from '../types';
import BedDetailModal from '../components/BedDetailModal';

const WardBed: React.FC<{ bed: Bed; onClick: () => void }> = ({ bed, onClick }) => {
  const statusClasses = {
    [BedStatus.Available]: 'bg-green-500 hover:bg-green-600',
    [BedStatus.Occupied]: 'bg-red-500 hover:bg-red-600',
    [BedStatus.Cleaning]: 'bg-yellow-400 hover:bg-yellow-500',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full h-16 rounded-md flex items-center justify-center font-bold text-white transition-colors duration-200 ${statusClasses[bed.status]}`}
    >
      {bed.number}
    </button>
  );
};

const Wards: React.FC = () => {
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [ward, setWard] = useState(wards[0]); // Using first ward from dummy data

  const handleBedClick = (bed: Bed) => {
    setSelectedBed(bed);
  };
  
  const handleCloseModal = () => {
    setSelectedBed(null);
  };

  const handleDischargePatient = (bedId: string) => {
    setWard(prevWard => {
        const updatedBeds = prevWard.beds.map(bed => {
            if (bed.id === bedId) {
                return { ...bed, status: BedStatus.Cleaning };
            }
            return bed;
        });
        return { ...prevWard, beds: updatedBeds };
    });
    handleCloseModal();
  };

  const handleMarkAsClean = (bedId: string) => {
    setWard(prevWard => {
        const updatedBeds = prevWard.beds.map(bed => {
            if (bed.id === bedId) {
                return { ...bed, status: BedStatus.Available, patient: undefined };
            }
            return bed;
        });
        return { ...prevWard, beds: updatedBeds };
    });
    handleCloseModal();
  }

  const handleAssignPatient = (bedId: string, patient: Patient) => {
    setWard(prevWard => {
        const updatedBeds = prevWard.beds.map(bed => {
            if (bed.id === bedId) {
                return { ...bed, status: BedStatus.Occupied, patient: patient };
            }
            return bed;
        });
        return { ...prevWard, beds: updatedBeds };
    });
    handleCloseModal();
  };


  return (
    <div className="space-y-8">
        <header>
            <h1 className="text-3xl font-bold text-gray-800">{ward.name} - Floor {ward.floor}</h1>
            <p className="text-gray-500">Real-time bed availability and patient allocation</p>
        </header>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ward Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><strong className="block text-gray-500">Ward Name:</strong> {ward.name}</div>
                <div><strong className="block text-gray-500">Total Beds:</strong> {ward.beds.length} Beds</div>
                <div><strong className="block text-gray-500">Nurse-in-Charge:</strong> {ward.nurseInCharge}</div>
                <div><strong className="block text-gray-500">Type:</strong> {ward.type}</div>
            </div>
            <div className="mt-6 border-t pt-4">
                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Status</h3>
                 <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Free</div>
                    <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span> Occupied</div>
                    <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span> Cleaning</div>
                 </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                {ward.beds.map((bed) => (
                    <WardBed key={bed.id} bed={bed} onClick={() => handleBedClick(bed)} />
                ))}
            </div>
        </div>
        
        <BedDetailModal 
          bed={selectedBed} 
          onClose={handleCloseModal} 
          onDischarge={handleDischargePatient}
          onAssignPatient={handleAssignPatient}
          onMarkAsClean={handleMarkAsClean}
        />
    </div>
  );
};

export default Wards;