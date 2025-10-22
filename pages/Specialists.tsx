
import React, { useState } from 'react';
import { specialists as initialSpecialists } from '../constants';
import { Specialist, SpecialistAvailability } from '../types';
import { EditIcon, DeleteIcon } from '../components/icons';

const AvailabilityBadge: React.FC<{ availability: SpecialistAvailability }> = ({ availability }) => {
    const badgeStyles = {
        [SpecialistAvailability.Available]: 'bg-green-100 text-green-700',
        [SpecialistAvailability.OnCall]: 'bg-yellow-100 text-yellow-700',
        [SpecialistAvailability.OffDuty]: 'bg-gray-100 text-gray-700',
    }
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeStyles[availability]}`}>{availability}</span>
};

const AddSpecialistModal: React.FC<{ show: boolean, onClose: () => void, onAdd: (specialist: Omit<Specialist, 'id'>) => void }> = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        department: 'Cardiology',
        availability: SpecialistAvailability.Available,
        shift: 'Morning',
        contact: ''
    });

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData as Omit<Specialist, 'id'>);
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b"><h2 className="text-xl font-bold text-gray-800">Add New Specialist</h2></div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Specialist Name</label>
                            <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <select onChange={e => setFormData({...formData, department: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option>Cardiology</option><option>Neurology</option><option>Orthopedics</option><option>Pediatrics</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700">Availability</label>
                            <select onChange={e => setFormData({...formData, availability: e.target.value as SpecialistAvailability})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option>{SpecialistAvailability.Available}</option><option>{SpecialistAvailability.OnCall}</option><option>{SpecialistAvailability.OffDuty}</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Shift</label>
                            <select onChange={e => setFormData({...formData, shift: e.target.value as 'Morning' | 'Afternoon' | 'Night'})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option>Morning</option><option>Afternoon</option><option>Night</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Contact Number</label>
                            <input required type="text" onChange={e => setFormData({...formData, contact: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Add Specialist</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const Specialists: React.FC = () => {
    const [specialists, setSpecialists] = useState<Specialist[]>(initialSpecialists);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Specialist | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const departments = ['All', ...Array.from(new Set(specialists.map(s => s.department)))];

    const handleEditClick = (specialist: Specialist) => {
        setEditingId(specialist.id);
        setEditFormData(specialist);
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditFormData(null);
    };

    const handleSaveClick = (id: string) => {
        if (!editFormData) return;
        setSpecialists(prev => prev.map(s => s.id === id ? editFormData : s));
        setEditingId(null);
        setEditFormData(null);
    };

    const handleDeleteClick = (id: string) => {
        setSpecialists(prev => prev.filter(s => s.id !== id));
    }
    
    const handleAddSpecialist = (newSpecialistData: Omit<Specialist, 'id'>) => {
        const newSpecialist: Specialist = {
            id: `spec-${Date.now()}`,
            ...newSpecialistData
        };
        setSpecialists(prev => [newSpecialist, ...prev]);
    };

    const filteredSpecialists = specialists.filter(s => {
        const matchesFilter = filter === 'All' || s.department === filter;
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Specialist Schedule</h1>
                    <p className="text-gray-500">Manage and view specialist availability and scheduling.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add Specialist
                </button>
            </header>

            <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                 <div className="relative">
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search by name or department..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex space-x-2 border-b">
                    {departments.map(dep => (
                         <button 
                            key={dep} 
                            onClick={() => setFilter(dep)}
                            className={`px-4 py-2 font-medium text-sm transition-colors ${filter === dep ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                         >
                            {dep}
                        </button>
                    ))}
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-sm text-gray-500 uppercase">
                            <tr>
                                <th className="p-3">Specialist Name</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Availability</th>
                                <th className="p-3">Shift</th>
                                <th className="p-3">Contact Number</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredSpecialists.map(s => (
                                <tr key={s.id} className="text-gray-700 hover:bg-gray-50">
                                    {editingId === s.id && editFormData ? (
                                        <>
                                            <td className="p-2"><input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-1 border rounded" /></td>
                                            <td className="p-2"><input type="text" value={editFormData.department} onChange={e => setEditFormData({...editFormData, department: e.target.value})} className="w-full p-1 border rounded" /></td>
                                            <td className="p-2">...</td>
                                            <td className="p-2"><input type="text" value={editFormData.shift} onChange={e => setEditFormData({...editFormData, shift: e.target.value as 'Morning' | 'Afternoon' | 'Night'})} className="w-full p-1 border rounded" /></td>
                                            <td className="p-2"><input type="text" value={editFormData.contact} onChange={e => setEditFormData({...editFormData, contact: e.target.value})} className="w-full p-1 border rounded" /></td>
                                            <td className="p-2 flex space-x-2">
                                                <button onClick={() => handleSaveClick(s.id)} className="text-green-600 font-semibold">Save</button>
                                                <button onClick={handleCancelClick} className="text-gray-600">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-3 font-medium">{s.name}</td>
                                            <td className="p-3">{s.department}</td>
                                            <td className="p-3"><AvailabilityBadge availability={s.availability}/></td>
                                            <td className="p-3">{s.shift}</td>
                                            <td className="p-3">{s.contact}</td>
                                            <td className="p-3 flex space-x-3">
                                                <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700"><EditIcon className="w-5 h-5"/></button>
                                                <button onClick={() => handleDeleteClick(s.id)} className="text-red-500 hover:text-red-700"><DeleteIcon className="w-5 h-5"/></button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
            <AddSpecialistModal show={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddSpecialist} />
        </div>
    );
};

export default Specialists;