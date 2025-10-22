
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';

const occupancyTrendsData = [
  { name: 'W1', value: 75 }, { name: 'W2', value: 80 }, { name: 'W3', value: 78 }, { name: 'W4', value: 82 }
];
const admissionDischargeData = [
  { name: 'W1', admission: 400, discharge: 240 }, { name: 'W2', admission: 300, discharge: 139 },
  { name: 'W3', admission: 200, discharge: 380 }, { name: 'W4', admission: 278, discharge: 390 },
];
const avgStayData = [
  { name: 'W1', value: 7.2 }, { name: 'W2', value: 6.9 }, { name: 'W3', value: 7.1 }, { name: 'W4', value: 6.8 }
];
const departmentAdmissionData = [
    { name: 'Orthopedics', value: 360 },
    { name: 'Pediatrics', value: 320 },
    { name: 'Oncology', value: 100 },
    { name: 'Neurology', value: 80 },
    { name: 'Cardiology', value: 120 },
].sort((a,b) => a.value - b.value);

// FIX: Add explicit types for the component props to resolve type errors.
// By using React.FC, we explicitly type this as a functional component, which correctly handles the 'children' prop.
const StatCard: React.FC<{ title: string; value: string; change?: string; period: string; children: React.ReactNode }> = ({ title, value, change, period, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
             {change && <span className={`text-sm font-semibold ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>}
        </div>
        <p className="text-sm text-gray-400">{period}</p>
        <div className="mt-4 h-24">
            {children}
        </div>
    </div>
);

const Statistics: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Hospital Statistics & Analytics</h1>
                <p className="text-gray-500">In-depth analysis of hospital performance metrics.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Occupancy Trends" value="82%" change="+2.5%" period="Last 30 Days">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={occupancyTrendsData}>
                           <Tooltip />
                           <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false}/>
                        </LineChart>
                     </ResponsiveContainer>
                </StatCard>
                 <StatCard title="Admission & Discharge Counts" value="1,234 / 890" change="+12%" period="Last 30 Days">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={admissionDischargeData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="admission" fill="#8884d8" />
                            <Bar dataKey="discharge" fill="#82ca9d" />
                        </BarChart>
                     </ResponsiveContainer>
                </StatCard>
                 <StatCard title="Average Stay Duration" value="6.8 Days" change="-0.2 Days" period="Last 30 Days">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={avgStayData}>
                           <Tooltip />
                           <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false}/>
                        </LineChart>
                     </ResponsiveContainer>
                </StatCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm text-center">
                    <h3 className="font-semibold text-gray-800">Ambulance Utilization Rate</h3>
                    <p className="text-sm text-gray-500 mb-4">Last 30 Days</p>
                    <p className="text-6xl font-bold text-blue-600 mt-10">76%</p>
                    <p className="text-green-500 font-semibold mt-2">+5%</p>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-gray-800">Department-wise Admission Rates</h3>
                    <p className="text-sm text-gray-500 mb-4">Last 30 Days</p>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={departmentAdmissionData} layout="vertical">
                           <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                           <XAxis type="number" hide />
                           <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                           <Tooltip />
                           <Bar dataKey="value" fill="#3b82f6" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Statistics;