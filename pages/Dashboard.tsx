import React from 'react';
import { NavLink } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const overviewData = [
    { title: "Total Wards", value: "12" },
    { title: "Total Patients", value: "256" },
    { title: "Total Beds", value: "250", subValue: "/ 50 Free" },
    { title: "Ambulances", value: "15", subValue: "/ 5 En Route" },
];

const occupancyData = [
  { name: 'Mon', value: 180 }, { name: 'Tue', value: 220 }, { name: 'Wed', value: 200 },
  { name: 'Thu', value: 240 }, { name: 'Fri', value: 210 }, { name: 'Sat', value: 230 }, { name: 'Sun', value: 250 },
];

const patientTypesData = [
  { name: 'Inpatient', value: 180 },
  { name: 'Outpatient', value: 60 },
  { name: 'Emergency', value: 16 },
];
const PATIENT_COLORS = ['#3B82F6', '#F97316', '#EF4444'];

const arrivingAmbulancesData = [
    { id: 'AMB-001', eta: 5 },
    { id: 'AMB-003', eta: 12 },
]

const emergencyRequestsData = [
    { id: 'ER-9845', condition: 'Cardiac Arrest', time: 2 },
    { id: 'ER-9844', condition: 'Major Trauma', time: 8 },
    { id: 'ER-9842', condition: 'Stroke', time: 15 },
]

const wardSummaryData = [
    { name: 'General Ward A', type: 'General', total: 40, occupied: 35, available: 5},
    { name: 'ICU', type: 'Intensive Care', total: 20, occupied: 18, available: 2},
    { name: 'Maternity Ward', type: 'Maternity', total: 30, occupied: 22, available: 8},
    { name: 'Pediatric Ward', type: 'Pediatrics', total: 25, occupied: 15, available: 10},
];

// FIX: Add explicit types for the component props to resolve type errors.
const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-lg">
        <p className="font-semibold">{`${label}`}</p>
        <p className="text-sm">{`Occupancy: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Hospital Overview</h1>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewData.map(item => (
                    <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-500 font-medium text-sm">{item.title}</p>
                        <div className="mt-2">
                            <span className="text-3xl font-bold text-gray-800">{item.value}</span>
                            {item.subValue && <span className="text-gray-500 ml-1">{item.subValue}</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Bed Occupancy */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-800">Bed Occupancy</h3>
                                <p className="text-sm text-gray-500">Last 7 days</p>
                            </div>
                             <div className="flex items-center text-sm font-semibold text-green-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                +5%
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300}}>
                            <ResponsiveContainer>
                                <AreaChart data={occupancyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Ward Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4">Ward Summary</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-xs text-gray-500 uppercase border-b">
                                    <tr>
                                        <th className="p-3 font-medium">Ward Name</th>
                                        <th className="p-3 font-medium">Ward Type</th>
                                        <th className="p-3 font-medium">Total Beds</th>
                                        <th className="p-3 font-medium">Occupied</th>
                                        <th className="p-3 font-medium">Available</th>
                                        <th className="p-3 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wardSummaryData.map(ward => (
                                        <tr key={ward.name} className="border-b last:border-0">
                                            <td className="p-3 font-medium text-gray-800">{ward.name}</td>
                                            <td className="p-3 text-gray-600">{ward.type}</td>
                                            <td className="p-3 text-gray-600">{ward.total}</td>
                                            <td className="p-3 text-red-500 font-semibold">{ward.occupied}</td>
                                            <td className="p-3 text-green-500 font-semibold">{ward.available}</td>
                                            <td className="p-3"><NavLink to="/wards" className="font-semibold text-blue-600 hover:underline text-sm">View Details</NavLink></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* Patient Types */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-800">Patient Types</h3>
                                <p className="text-sm text-gray-500">All Time</p>
                            </div>
                            <div className="flex items-center text-sm font-semibold text-green-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                +2%
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300}} className="relative flex flex-col items-center justify-center">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={patientTypesData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" paddingAngle={5} dataKey="value" cornerRadius={8}>
                                        {patientTypesData.map((entry, index) => <Cell key={`cell-${index}`} fill={PATIENT_COLORS[index % PATIENT_COLORS.length]} stroke={PATIENT_COLORS[index % PATIENT_COLORS.length]} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-bold text-gray-800">256</span>
                                <span className="text-sm text-gray-500">Patients</span>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            {patientTypesData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center text-sm">
                                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{backgroundColor: PATIENT_COLORS[index]}}></span>
                                    <span className="text-gray-600">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Ambulance & Emergency */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4">Ambulance & Emergency</h3>
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Arriving Ambulances</p>
                            <div className="space-y-3">
                                {arrivingAmbulancesData.map(amb => (
                                    <div key={amb.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{amb.id}</p>
                                            <p className="text-xs text-gray-500">ETA: {amb.eta} mins</p>
                                        </div>
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">En Route</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="mt-6 border-t pt-4">
                            <p className="text-sm font-medium text-gray-600 mb-2">Recent Emergency Requests</p>
                            <div className="space-y-3">
                                {emergencyRequestsData.map(req => (
                                    <div key={req.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{req.id}</p>
                                            <p className="text-xs text-gray-500">{req.condition}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{req.time} mins ago</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;