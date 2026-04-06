'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDrivers } from '@/hooks/drivers/use-driver-details.hooks';
import { useParkingSlots } from '@/hooks/parking/use-parking-slots.hooks';
import { useRfidTags } from '@/hooks/rfid-tags/use-rfid-tags.hooks';
import { ParkingSquare, Tag, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function DashboardPage() {
  const { rfidTags, loading: rfidTagsLoading } = useRfidTags();
  const { totalDrivers } = useDrivers();
  const { slots, occupied, loading } = useParkingSlots();

  const available = slots.length - occupied;
  const utilizationData = [
    { name: 'Occupied', value: occupied, color: '#22c55e' },
    { name: 'Available', value: available, color: '#e5e7eb' },
  ];

  const occupancyData = Array.from({ length: 24 }, (_, hour) => {
    const hourKey = String(hour).padStart(2, '0');
    const count = slots.filter((s) => {
      if (!s.time) return false;
      const slotHour = new Date(s.time).getHours();
      return slotHour === hour;
    }).length;

    return {
      time: `${hourKey}:00`,
      occupied: count,
    };
  });

  const stats = [
    {
      label: 'Registered Drivers',
      value: totalDrivers,
      icon: Users,
      color: 'border-t-green-500',
      iconColor: 'text-green-500',
      bgHighlight: 'bg-green-500/10',
    },
    {
      label: 'Available RFIDs',
      value: rfidTags.filter((t) => t.status === 'available').length,
      icon: Tag,
      color: 'border-t-teal-500',
      iconColor: 'text-teal-500',
      bgHighlight: 'bg-teal-500/10',
    },
    {
      label: 'Slots Occupied',
      value: `${occupied} / ${slots.length}`,
      icon: ParkingSquare,
      color: 'border-t-amber-500',
      iconColor: 'text-amber-500',
      bgHighlight: 'bg-amber-500/10',
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900">
          Dashboard Overview
        </h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Welcome, Admin · Updated just now
        </p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className={`border border-t-4 border-gray-200 ${s.bgHighlight} ${s.color} shadow-sm`}
          >
            <CardContent className="p-4">
              <s.icon className={`mb-2 h-5 w-5 ${s.iconColor}`} />
              <p className="font-mono text-2xl font-black text-gray-900">
                {s.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-gray-400">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-2">
        <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase">
          📊 Statistics
        </h2>
      </div>

      <div className="mb-4 grid grid-cols-[1.5fr_1fr] gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black tracking-widest text-green-700 uppercase">
              🅿️ Slot Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-1">
            {loading && (
              <p className="py-6 text-center text-sm text-gray-400">Loading…</p>
            )}

            {!loading && (
              <>
                <div className="relative flex items-center justify-center">
                  <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                      <Pie
                        data={utilizationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={48}
                        outerRadius={68}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {utilizationData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute flex flex-col items-center">
                    <span className="font-mono text-xl font-black text-gray-900">
                      {slots.length > 0
                        ? Math.round((occupied / slots.length) * 100)
                        : 0}
                      %
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">
                      {slots.length === 0
                        ? 'No slots'
                        : `${occupied} of ${slots.length} occupied`}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex gap-4">
                  {utilizationData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-xs font-semibold text-gray-500">
                        {d.name}{' '}
                        <span className="font-mono font-black text-gray-900">
                          {d.value}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black tracking-widest text-green-700 uppercase">
              📡 RFID Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-1">
            {rfidTagsLoading && (
              <p className="py-6 text-center text-sm text-gray-400">Loading…</p>
            )}

            {!rfidTagsLoading && (
              <>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-2.5">
                    <p className="font-mono text-xl font-black text-gray-900">
                      {rfidTags.length}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                      Total
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-100 bg-green-50 px-2 py-2.5">
                    <p className="font-mono text-xl font-black text-green-600">
                      {rfidTags.filter((t) => t.status === 'available').length}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-green-400 uppercase">
                      Available
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-100 bg-red-50 px-2 py-2.5">
                    <p className="font-mono text-xl font-black text-red-500">
                      {rfidTags.filter((t) => t.status === 'assigned').length}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-red-400 uppercase">
                      In Use
                    </p>
                  </div>
                </div>

                {rfidTags.length > 0 && (
                  <div>
                    <div className="mb-1 flex justify-between text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                      <span>Usage</span>
                      <span className="font-mono text-gray-600">
                        {Math.round(
                          (rfidTags.filter((t) => t.status === 'assigned')
                            .length /
                            rfidTags.length) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-green-400 to-green-600 transition-all duration-500"
                        style={{
                          width: `${Math.round((rfidTags.filter((t) => t.status === 'assigned').length / rfidTags.length) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                        Available
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                        In Use
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <Card className="mb-4 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black tracking-widest text-green-700 uppercase">
              🕒 Recent Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto p-0">
            {loading && (
              <p className="py-6 text-center text-sm text-gray-400">Loading…</p>
            )}

            {!loading && (
              <>
                <div className="divide-y divide-gray-100">
                  {slots.map((log, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-gray-50 ${log.quadrant === 'Q1' ? 'bg-blue-200' : log.quadrant === 'Q2' ? 'bg-purple-200' : log.quadrant === 'Q3' ? 'bg-yellow-200' : 'bg-purple-50'}`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          log.status === 'available'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {log.status === 'occupied' ? '↓' : '↑'}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {log.driverName}
                        </p>
                        <p className="font-mono text-xs text-gray-400">
                          {log.plateNumber}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className="shrink-0 border-gray-200 text-xs text-gray-500"
                      >
                        {log.quadrant} - Slot {log.slotNumber}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs ${
                          log.status === 'available'
                            ? 'border-green-200 bg-green-50 text-green-600'
                            : 'border-red-200 bg-red-50 text-red-500'
                        }`}
                      >
                        {log.status === 'available' ? 'Available' : 'Occupied'}
                      </Badge>

                      <span className="shrink-0 font-mono text-xs text-gray-400">
                        {log.time
                          ? new Date(log.time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '00:00 --'}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="max-h-82 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black tracking-widest text-green-700 uppercase">
              📈 Parking Occupancy Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={occupancyData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="occupancyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  formatter={(value) => [`${value} vehicles`, 'Occupied']}
                />
                <Area
                  type="monotone"
                  dataKey="occupied"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#occupancyGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#22c55e' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
