
import React, { useState } from 'react';
import { ambulances as initialAmbulances } from '../constants';
import { Ambulance, AmbulanceStatus } from '../types';

const AmbulanceDetailModal: React.FC<{ ambulance: Ambulance | null, onClose: () => void }> = ({ ambulance, onClose }) => {
    if (!ambulance) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex" onClick={(e) => e.stopPropagation()}>
                <div className="w-1/3 bg-gray-100 rounded-l-lg p-6 flex flex-col items-center justify-center">
                    <img src={`https://picsum.photos/seed/${ambulance.id}/200`} alt="Ambulance" className="w-48 h-48 rounded-full object-cover shadow-md" />
                </div>
                <div className="w-2/3 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Ambulance {ambulance.vehicleNumber}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">Driver Details</h3>
                            <p><strong className="text-gray-500 w-24 inline-block">Name:</strong> {ambulance.driverName}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Contact:</strong> {ambulance.driverContact}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">Patient Details</h3>
                            <p><strong className="text-gray-500 w-24 inline-block">Name:</strong> {ambulance.patientName || 'N/A'}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Age:</strong> {ambulance.patientAge || 'N/A'}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Gender:</strong> {ambulance.patientGender || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">Emergency Details</h3>
                            <p><strong className="text-gray-500 w-24 inline-block">Risk Level:</strong> {ambulance.riskLevel || 'N/A'}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Description:</strong> {ambulance.injuryDescription || 'N/A'}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Pickup:</strong> {ambulance.pickupLocation || 'N/A'}</p>
                            <p><strong className="text-gray-500 w-24 inline-block">Destination:</strong> {ambulance.destination || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddAmbulanceModal: React.FC<{ show: boolean, onClose: () => void, onAdd: (ambulance: Omit<Ambulance, 'id' | 'status'>) => void }> = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({ patientName: '', riskLevel: 'Low', injuryDescription: '' });

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simplified version. A real app would have more fields.
        const newAmbulanceData = {
            ...formData,
            vehicleNumber: `AMB-${Math.floor(Math.random() * 900) + 100}`,
            driverName: 'New Driver',
            driverContact: '123-456-7890',
            riskLevel: formData.riskLevel as 'High' | 'Medium' | 'Low',
        };
        onAdd(newAmbulanceData);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Add New Ambulance</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Patient Name</label>
                            <input type="text" onChange={e => setFormData({...formData, patientName: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Risk Level</label>
                            <select onChange={e => setFormData({...formData, riskLevel: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700">Injury Description</label>
                            <textarea onChange={e => setFormData({...formData, injuryDescription: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm h-24"></textarea>
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-700">Add Images</label>
                             <input type="file" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AmbulanceCard: React.FC<{ ambulance: Ambulance, onClick: () => void }> = ({ ambulance, onClick }) => {
    const statusInfo = {
        [AmbulanceStatus.OnRoute]: { color: 'yellow-500', text: 'On route' },
        [AmbulanceStatus.Arrived]: { color: 'red-500', text: 'Arrived' },
        [AmbulanceStatus.Idle]: { color: 'green-500', text: 'Idle' },
    };

    return (
        <div onClick={onClick} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-400 cursor-pointer transition-all">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-800">{ambulance.vehicleNumber}</h3>
                <div className="flex items-center text-sm font-semibold">
                    <span className={`w-2.5 h-2.5 rounded-full mr-2 bg-${statusInfo[ambulance.status].color}`}></span>
                    <span className={`text-${statusInfo[ambulance.status].color}`}>{statusInfo[ambulance.status].text}</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{ambulance.id}</p>
            <div className="space-y-2 text-sm">
                <p><strong className="text-gray-600 w-20 inline-block">Driver:</strong> {ambulance.driverName}</p>
                <p><strong className="text-gray-600 w-20 inline-block">Patient:</strong> {ambulance.patientName || 'N/A'}</p>
                {ambulance.eta && <p className="font-semibold"><strong className="text-gray-600 w-20 inline-block">ETA:</strong> {ambulance.eta} mins</p>}
            </div>
        </div>
    );
}

const Ambulances: React.FC = () => {
    const [ambulances, setAmbulances] = useState<Ambulance[]>(initialAmbulances);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);

    const handleAddAmbulance = (newAmbulanceData: Omit<Ambulance, 'id' | 'status'>) => {
        const newAmbulance: Ambulance = {
            id: `amb-${Date.now()}`,
            status: AmbulanceStatus.OnRoute,
            ...newAmbulanceData,
        };
        setAmbulances(prev => [newAmbulance, ...prev]);
    };

    const filteredAmbulances = ambulances.filter(amb => 
        amb.id.toLowerCase().includes(search.toLowerCase()) ||
        amb.driverName.toLowerCase().includes(search.toLowerCase()) ||
        (amb.vehicleNumber && amb.vehicleNumber.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Ambulance Fleet Status</h1>
            <p className="text-gray-500">Live tracking and status of all hospital ambulances.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Ambulance
        </button>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
                type="text" 
                placeholder="Search by ambulance ID, driver name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAmbulances.map(ambulance => (
              <AmbulanceCard key={ambulance.id} ambulance={ambulance} onClick={() => setSelectedAmbulance(ambulance)} />
          ))}
      </div>
      <AddAmbulanceModal show={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddAmbulance} />
      <AmbulanceDetailModal ambulance={selectedAmbulance} onClose={() => setSelectedAmbulance(null)} />
    </div>
  );
};

export default Ambulances;