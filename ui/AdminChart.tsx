'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Interface matching the data passed from AdminState
interface AdminMetrics {
  totalUsers: number;
  totalCar: number;
  totalHiredCar: number;
  serverStatus: 'Healthy' | 'Degraded' | 'Down';
}

interface AdminChartProps {
  data: AdminMetrics;
}

const AdminChart: React.FC<AdminChartProps> = ({ data }) => {
  // 1. Format data for the Bar Chart (Comparing Available vs Hired)
  const availableCars = data.totalCar - data.totalHiredCar;
  
  const barData = [
    {
      name: 'Car Fleet Status',
      'Total Fleet': data.totalCar,
      'Currently Hired': data.totalHiredCar,
      'Available': availableCars > 0 ? availableCars : 0,
    },
  ];

  // 2. Format data for a quick Pie Chart breakdown
  const pieData = [
    { name: 'Hired', value: data.totalHiredCar, color: '#6366f1' }, // Indigo
    { name: 'Available', value: availableCars > 0 ? availableCars : 0, color: '#cbd5e1' }, // Slate-300
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      {/* Main Bar Chart - Takes up 2 columns on desktop */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Fleet Utilization</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="Total Fleet" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="Currently Hired" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="Available" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">Hiring Ratio</h3>
          <p className="text-xs text-slate-500">Proportion of active road fleet.</p>
        </div>
        
        <div className="h-44 w-full relative my-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Percentage Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-800">
              {Math.round((data.totalHiredCar / data.totalCar) * 100)}%
            </span>
            <span className="text-[10px] uppercase font-medium tracking-wider text-slate-400">Hired</span>
          </div>
        </div>

        {/* Custom Legend for Pie */}
        <div className="flex justify-center gap-4 text-xs font-medium text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Hired ({data.totalHiredCar})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span>Available ({availableCars})</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminChart;