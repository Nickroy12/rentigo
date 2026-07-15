'use client'
import AdminChart from '@/ui/AdminChart';
import React, { useState } from 'react';

export interface AdminMetrics {
  totalCar: number;
  pendingCar: number;
  totalHiredCar: number;
  serverStatus: 'Healthy' | 'Degraded' | 'Down';
  totalUsers: number; // 1. Added here to satisfy the type requirement
}

interface AdminStateProps {
  availableCount: number;
  pendingCount: number;
  rentCount: number;
  totalCars?: any[];
  totalCount?: number;
  totalUsersCount?: number; // 2. Added optional prop to pass user count dynamically
}

const AdminState: React.FC<AdminStateProps> = ({ 
  availableCount, 
  pendingCount, 
  rentCount, 
  totalCount,
  totalUsersCount = 0 // 3. Destructured with a default value fallback
}) => {

  const [data] = useState<AdminMetrics>({
    totalCar: totalCount || 0,
    pendingCar: pendingCount,
    totalHiredCar: rentCount,
    serverStatus: 'Healthy',
    totalUsers: totalUsersCount, // 4. Provided to the state object
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Fleet System Overview</h1>
          <p className="text-sm text-slate-500">Real-time car availability and hiring statistics.</p>
        </div>
        <button 
          onClick={() => alert('Refreshing fleet data...')}
          className="self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Car</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{data.totalCar}</p>
          <span className="mt-2 inline-flex items-center text-xs font-medium text-blue-600">
            Active in system (Available: {availableCount})
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Hired Car</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{data.totalHiredCar}</p>
          <span className="mt-2 inline-flex items-center text-xs font-medium text-indigo-600 animate-pulse">
            ● Currently on road
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Server Status</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{data.serverStatus}</p>
          <span className="mt-2 inline-flex items-center text-xs font-medium text-slate-500">
            Uptime: 99.9%
          </span>
        </div>

      </div>

      <AdminChart data={data}/>
    </div>
  );
};

export default AdminState;