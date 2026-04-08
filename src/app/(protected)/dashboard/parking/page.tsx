'use client';

import { TopDownCar } from '@/components/admin/parking-map/car-svg-template';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParkingSlots } from '@/hooks/parking/use-parking-slots.hooks';
import type { ParkingSlot } from '@/types';
import { useEffect, useRef, useState } from 'react';

const CAR_PALETTE = [
  { body: '#4A90D9', window: '#1a3a5c', detail: '#2d6aaa', shine: '#6db3f2' },
  { body: '#E8C840', window: '#5a4a00', detail: '#b89a00', shine: '#f5e070' },
  { body: '#E05A5A', window: '#4a1010', detail: '#b03030', shine: '#f08080' },
  { body: '#5DBD6E', window: '#1a4422', detail: '#3a8a4a', shine: '#80d890' },
  { body: '#E8842A', window: '#5a2a00', detail: '#b05a00', shine: '#f0aa60' },
  { body: '#8B6BE8', window: '#2a1a5a', detail: '#5a3ab0', shine: '#b090f8' },
  { body: '#DEDEDE', window: '#444', detail: '#aaa', shine: '#f8f8f8' },
  { body: '#38BDF8', window: '#0a3a4a', detail: '#0080b0', shine: '#7dd8fc' },
  { body: '#F472B6', window: '#4a0a2a', detail: '#be185d', shine: '#f9a8d4' },
];

type CarColor = (typeof CAR_PALETTE)[0];

const QUADRANT_ACCENT: Record<string, string> = {
  'Quadrant 1': '#60a5fa',
  'Quadrant 2': '#c084fc',
  'Quadrant 3': '#facc15',
};

type AnimState = 'idle-empty' | 'entering' | 'parked' | 'exiting';

interface BayProps {
  slot: ParkingSlot;
  anim: AnimState;
  carColor: CarColor;
  onClick: () => void;
  quadrant: string;
  slotNum: string;
}

function ParkingBay({
  slot,
  anim,
  carColor,
  onClick,
  quadrant,
  slotNum,
}: BayProps) {
  const isOcc = slot.status === 'occupied';
  const showCar = isOcc || anim === 'exiting';
  const showOpenDisplay = !isOcc && anim !== 'exiting';
  const accent = QUADRANT_ACCENT[slot.quadrant as string] ?? '#60a5fa';
  const [shouldShowOpen, setShouldShowOpen] = useState(showOpenDisplay);

  useEffect(() => {
    if (!isOcc && anim === 'idle-empty') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldShowOpen(true);
    } else if (isOcc) {
      setShouldShowOpen(false);
    }
  }, [isOcc, anim]);

  const carAnimStyle: React.CSSProperties =
    anim === 'entering'
      ? { animation: 'slotCarEnter 1s cubic-bezier(0.22,1,0.36,1) forwards' }
      : anim === 'exiting'
        ? {
            animation: 'slotCarExit 0.85s cubic-bezier(0.55,0,1,0.45) forwards',
          }
        : {};

  return (
    <div className="relative pt-10">
      <div
        className="flex shrink-0 cursor-pointer flex-col items-center rounded-b-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{
          width: 160,
          height: 220,
          background: `
            linear-gradient(145deg, #f8f9fa 0%, #e9ecef 25%, #dee2e6 50%, #e9ecef 75%, #f8f9fa 100%),
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)
          `,
          border: `3px solid #6c757d`,
          borderTop: `6px solid ${accent}`,
          borderRadius: '0 0 12px 12px',
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.1),
            inset 0 -1px 2px rgba(255,255,255,0.5),
            0 4px 8px rgba(0,0,0,0.15),
            0 2px 4px rgba(0,0,0,0.1)
          `,
          transform: 'perspective(1000px) rotateX(1deg)',
          transformOrigin: 'center bottom',
        }}
        onClick={isOcc ? onClick : undefined}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 15% 15%, #3a3a3a 1.5px, transparent 3px),
            radial-gradient(circle at 85% 85%, #2a2a2a 1.2px, transparent 2.5px),
            radial-gradient(circle at 45% 55%, #353535 1px, transparent 2px),
            radial-gradient(circle at 75% 25%, #2f2f2f 1.8px, transparent 3.5px),
            radial-gradient(circle at 25% 75%, #323232 1px, transparent 2px),
            linear-gradient(45deg, rgba(0,0,0,0.15) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 75%),
            linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 75%)
          `,
            backgroundSize:
              '8px 8px, 10px 10px, 6px 6px, 9px 9px, 7px 7px, 5px 5px, 4px 4px',
            opacity: 0.7,
          }}
        ></div>

        <div className="absolute top-0 right-3 left-3 h-2 border-t border-gray-300 bg-linear-to-b from-white via-gray-100 to-gray-200 opacity-95 shadow-sm"></div>
        <div className="absolute right-3 bottom-0 left-3 h-2 border-b border-gray-300 bg-linear-to-t from-white via-gray-100 to-gray-200 opacity-95 shadow-sm"></div>
        <div className="absolute top-0 bottom-0 left-0 w-2 border-l border-gray-300 bg-linear-to-r from-white via-gray-100 to-gray-200 opacity-95 shadow-sm"></div>
        <div className="absolute top-0 right-0 bottom-0 w-2 border-r border-gray-300 bg-linear-to-l from-white via-gray-100 to-gray-200 opacity-95 shadow-sm"></div>

        <div
          className="absolute right-2 bottom-4 left-2 h-4 rounded-md border-2 border-gray-700 bg-linear-to-b from-gray-300 via-gray-400 to-gray-600 opacity-90 shadow-lg"
          style={{
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        ></div>
        <div className="absolute right-2 bottom-2 left-2 h-2 rounded-md border border-gray-600 bg-linear-to-b from-gray-200 via-gray-300 to-gray-500 opacity-95 shadow-md"></div>

        <div className="absolute top-3 right-3">
          <div className="relative">
            <div className="h-8 w-1.5 rounded-full border border-gray-600 bg-linear-to-b from-gray-700 via-gray-800 to-gray-900 shadow-lg"></div>
            <div
              className={`absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full border-2 border-gray-800 ${
                isOcc ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{
                boxShadow: isOcc
                  ? '0 0 25px #ef4444, 0 0 50px #ef4444, 0 0 75px #ef4444, inset 0 0 15px rgba(255,255,255,0.4)'
                  : '0 0 25px #22c55e, 0 0 50px #22c55e, 0 0 75px #22c55e, inset 0 0 15px rgba(255,255,255,0.4)',
                filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))',
              }}
            ></div>
          </div>
        </div>

        <div className="relative flex w-full flex-1 items-center justify-center pt-8 pb-4">
          {showCar && (
            <div
              className="relative z-10 flex flex-col items-center gap-1"
              style={carAnimStyle}
            >
              <TopDownCar color={carColor} />
              {isOcc && (
                <div
                  className={`bg-opacity-70 rounded border ${(quadrant === 'Q1' && 'border-blue-950 bg-blue-700') || (quadrant === 'Q2' && 'border-purple-950 bg-purple-700') || (quadrant === 'Q3' && 'border-yellow-950 bg-yellow-700')} px-2 py-1 font-mono text-xs font-bold text-white`}
                >
                  {slot.plateNumber}
                </div>
              )}
            </div>
          )}
          {shouldShowOpen && (
            <div className="flex flex-col items-center gap-1.5 pt-16">
              <div className="w-16 overflow-hidden rounded-md border-2 border-blue-700 shadow-md">
                <div className="bg-blue-700 py-1 text-center">
                  <span className="font-mono text-4xl leading-none font-black text-white">
                    P
                  </span>
                </div>
                <div className="bg-green-600 py-0.5 text-center">
                  <span className="font-mono text-[10px] font-bold text-white">
                    AVAILABLE
                  </span>
                </div>
              </div>
              <div className="-mt-1.5 h-11 w-1 bg-slate-700" />
              <div className="-mt-1.5 h-2 w-8 rounded bg-slate-600" />
            </div>
          )}
        </div>

        <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform">
          <div
            className={`relative inline-flex items-center overflow-hidden rounded border-2 px-2.5 py-1 ${(quadrant === 'Q1' && 'bg-blue-700') || (quadrant === 'Q2' && 'bg-purple-700') || (quadrant === 'Q3' && 'bg-yellow-700')} ${(quadrant === 'Q1' && 'border-blue-950') || (quadrant === 'Q2' && 'border-purple-950') || (quadrant === 'Q3' && 'border-yellow-950')} whitespace-nowrap shadow-[2px_3px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]`}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'repeating-linear-gradient(135deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 2px,transparent 2px,transparent 8px)',
              }}
            />

            <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

            <span
              className="relative font-mono text-[11px] font-black tracking-widest text-white"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              {quadrant} — Slot {slotNum}
            </span>

            <span
              className={`absolute top-0.5 left-0.5 h-1 w-1 rounded-full opacity-70 ${quadrant === 'Q1' ? 'bg-blue-400' : quadrant === 'Q2' ? 'bg-purple-400' : 'bg-yellow-400'}`}
            />
            <span
              className={`absolute top-0.5 right-0.5 h-1 w-1 rounded-full opacity-70 ${quadrant === 'Q1' ? 'bg-blue-400' : quadrant === 'Q2' ? 'bg-purple-400' : 'bg-yellow-400'}`}
            />
            <span
              className={`absolute bottom-0.5 left-0.5 h-1 w-1 rounded-full opacity-70 ${quadrant === 'Q1' ? 'bg-blue-400' : quadrant === 'Q2' ? 'bg-purple-400' : 'bg-yellow-400'}`}
            />
            <span
              className={`absolute right-0.5 bottom-0.5 h-1 w-1 rounded-full opacity-70 ${quadrant === 'Q1' ? 'bg-blue-400' : quadrant === 'Q2' ? 'bg-purple-400' : 'bg-yellow-400'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Placard({ type }: { type: 'entrance' | 'exit' }) {
  const isEntrance = type === 'entrance';
  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-1 py-1.5">
      <span
        className={`font-mono text-xs ${isEntrance ? 'text-green-500' : 'text-red-400'}`}
      >
        {isEntrance ? '▼' : '▲'}
      </span>
      <div
        className={`flex items-center gap-1.5 rounded px-2 py-1 ${
          isEntrance
            ? 'border-2 border-green-500 bg-green-950'
            : 'border-2 border-red-500 bg-red-950'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isEntrance
              ? 'bg-green-400 shadow-[0_0_6px_#4ade80]'
              : 'bg-red-400 shadow-[0_0_6px_#f87171]'
          }`}
        />
        <span
          className={`font-mono text-[9px] font-bold tracking-[0.15em] ${
            isEntrance ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isEntrance ? 'ENTRANCE' : 'EXIT'}
        </span>
      </div>
    </div>
  );
}

export default function ParkingPage() {
  const { slots, loading, available, occupied } = useParkingSlots();
  const [selected, setSelected] = useState<ParkingSlot | null>(null);
  const [animMap, setAnimMap] = useState<Record<string, AnimState>>({});
  const prevRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!slots.length) return;
    const prev = prevRef.current;
    const entering: string[] = [];
    const exiting: string[] = [];

    slots.forEach((s) => {
      const slotKey = `${s.quadrant}-${s.slotNumber}`;
      const p = prev[slotKey];
      if (p === 'available' && s.status === 'occupied') entering.push(slotKey);
      if (p === 'occupied' && s.status === 'available') exiting.push(slotKey);
      prev[slotKey] = s.status;
    });

    if (!entering.length && !exiting.length) return;

    const initialTimer = setTimeout(() => {
      setAnimMap((cur) => {
        const next = { ...cur };
        entering.forEach((key) => (next[key] = 'entering'));
        exiting.forEach((key) => (next[key] = 'exiting'));
        return next;
      });
    }, 0);

    const enterTimer = entering.length
      ? setTimeout(() => {
          setAnimMap((cur) => {
            const next = { ...cur };
            entering.forEach((key) => (next[key] = 'parked'));
            return next;
          });
        }, 1050)
      : undefined;

    const exitTimer = exiting.length
      ? setTimeout(() => {
          setAnimMap((cur) => {
            const next = { ...cur };
            exiting.forEach((key) => (next[key] = 'idle-empty'));
            return next;
          });
        }, 900)
      : undefined;

    return () => {
      clearTimeout(initialTimer);
      if (enterTimer) clearTimeout(enterTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [slots]);

  const getAnim = (s: ParkingSlot): AnimState =>
    animMap[`${s.quadrant}-${s.slotNumber}`] ??
    (s.status === 'occupied' ? 'parked' : 'idle-empty');

  const quadrants = Array.from(
    new Set(slots.map((s) => s.quadrant as string)),
  ).sort();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
 
      `}</style>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Live Parking Map
          </h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Real-time slot status from Firebase
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge className="border-gray-200 bg-gray-100 font-bold text-gray-600">
            {slots.length} Total
          </Badge>
          <Badge className="border-red-200 bg-red-100 font-bold text-red-600">
            {occupied} Occupied
          </Badge>
          <Badge className="border-green-200 bg-green-100 font-bold text-green-700">
            {available} Available
          </Badge>
        </div>
      </div>

      <div className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
        💡
        <span>
          <strong>Free Slot Choice:</strong> Any registered driver can park in
          any available slot. They tap their RFID at the slot reader — Firebase
          instantly links that slot to their profile. Tap again to free the
          slot.
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-5">
        {[
          { cls: 'bg-green-400', label: 'Available' },
          { cls: 'bg-red-400', label: 'Occupied' },
          { cls: 'bg-blue-400', label: 'Quadrant 1 - Students' },
          { cls: 'bg-purple-400', label: 'Quadrant 2 - Faculty' },
          { cls: 'bg-yellow-400', label: 'Quadrant 3 - Visitors' },
        ].map(({ cls, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500"
          >
            <span className={`inline-block h-3 w-3 rounded ${cls}`} />
            {label}
          </div>
        ))}
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-400">
          Loading slots from Firebase…
        </p>
      ) : (
        <div>
          {quadrants.map((q) => {
            const qSlots = slots.filter((s) => s.quadrant === q);
            if (!qSlots.length) return null;

            return (
              <div
                key={q}
                className="relative z-10 mb-6 w-full rounded-lg p-4"
                style={{
                  background:
                    q === 'Q1'
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)'
                      : q === 'Q2'
                        ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 50%, rgba(245, 158, 11, 0.1) 100%)',
                  border: `2px solid ${q === 'Q1' ? '#3b82f6' : q === 'Q2' ? '#9333ea' : '#f59e0b'}`,
                  borderRadius: '12px',
                  boxShadow: `
                       inset 0 2px 4px rgba(0,0,0,0.1),
                       0 4px 8px rgba(0,0,0,0.2)
                     `,
                }}
              >
                <div className="flex items-center gap-3 px-0.5 pt-2 pb-1">
                  <Placard type="entrance" />
                </div>

                <div className="relative mx-2 mb-4">
                  <div className="flex items-center">
                    <div
                      className="h-10 w-3 rounded-t-lg border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    ></div>

                    <div
                      className="h-8 flex-1 bg-linear-to-b from-gray-600 via-gray-700 to-gray-800 shadow-inner"
                      style={{
                        backgroundImage: `
                             radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 2px),
                             radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 1px, transparent 2px),
                             linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)
                           `,
                        backgroundSize: '6px 6px, 8px 8px, 4px 4px',
                        boxShadow:
                          'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)',
                      }}
                    ></div>

                    <div
                      className="relative h-10 w-4 border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    >
                      <div className="absolute top-1 left-1/2 h-2 w-1 -translate-x-1/2 transform rounded-sm bg-yellow-400 shadow-sm"></div>
                      <div className="absolute bottom-1 left-1/2 h-2 w-1 -translate-x-1/2 transform rounded-sm bg-yellow-400 shadow-sm"></div>
                    </div>

                    <div
                      className="h-8 flex-1 bg-linear-to-b from-gray-600 via-gray-700 to-gray-800 shadow-inner"
                      style={{
                        backgroundImage: `
                             radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 2px),
                             radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 1px, transparent 2px),
                             linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)
                           `,
                        backgroundSize: '6px 6px, 8px 8px, 4px 4px',
                        boxShadow:
                          'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)',
                      }}
                    ></div>

                    <div
                      className="h-10 w-3 rounded-t-lg border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '-2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    ></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-1 w-full"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, #22c55e 0px, #22c55e 12px, transparent 12px, transparent 24px)',
                        opacity: 0.9,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 px-0.5">
                  {qSlots.map((slot) => (
                    <ParkingBay
                      key={slot.slotNumber}
                      slot={slot}
                      anim={getAnim(slot)}
                      carColor={
                        CAR_PALETTE[slot.slotNumber % CAR_PALETTE.length]
                      }
                      onClick={() => setSelected(slot)}
                      quadrant={slot.quadrant as string}
                      slotNum={String(slot.slotNumber).padStart(2, '0')}
                    />
                  ))}
                </div>

                <div className="relative mx-2 mt-4 mb-2">
                  <div className="flex items-center">
                    <div
                      className="h-10 w-3 rounded-t-lg border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    ></div>

                    <div
                      className="h-8 flex-1 bg-linear-to-b from-gray-600 via-gray-700 to-gray-800 shadow-inner"
                      style={{
                        backgroundImage: `
                             radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 2px),
                             radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 1px, transparent 2px),
                             linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)
                           `,
                        backgroundSize: '6px 6px, 8px 8px, 4px 4px',
                        boxShadow:
                          'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)',
                      }}
                    ></div>

                    <div
                      className="relative h-10 w-4 border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    >
                      <div className="absolute top-1 left-1/2 h-2 w-1 -translate-x-1/2 transform rounded-sm bg-yellow-400 shadow-sm"></div>
                      <div className="absolute bottom-1 left-1/2 h-2 w-1 -translate-x-1/2 transform rounded-sm bg-yellow-400 shadow-sm"></div>
                    </div>

                    <div
                      className="h-8 flex-1 bg-linear-to-b from-gray-600 via-gray-700 to-gray-800 shadow-inner"
                      style={{
                        backgroundImage: `
                             radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 2px),
                             radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 1px, transparent 2px),
                             linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)
                           `,
                        backgroundSize: '6px 6px, 8px 8px, 4px 4px',
                        boxShadow:
                          'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)',
                      }}
                    ></div>

                    <div
                      className="h-10 w-3 rounded-t-lg border-2 border-gray-600 bg-linear-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg"
                      style={{
                        boxShadow:
                          '-2px 0 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    ></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-1 w-full"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, #ef4444 0px, #ef4444 12px, transparent 12px, transparent 24px)',
                        opacity: 0.9,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-1 flex items-center gap-3 border-b border-gray-200 px-0.5 pt-1 pb-3">
                  <Placard type="exit" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-gray-400">
        Click an occupied slot to view driver details · Live via{' '}
        <code className="rounded bg-green-50 px-1 py-0.5 text-[10px] text-green-700">
          Firebase RealTime database details from stored driver profiles.
        </code>
      </p>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="px-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black tracking-widest text-green-700 uppercase">
                  {selected?.quadrant} - Slot{' '}
                  {selected && String(selected.slotNumber).padStart(2, '0')} —
                  Driver Details
                </p>
                {selected && (
                  <Badge
                    variant="default"
                    className="font-mono text-xs font-medium text-white"
                  >
                    {selected.time
                      ? new Date(selected.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Unknown time'}
                  </Badge>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-4 p-2 pt-1">
              <div className="flex w-full items-center gap-3">
                <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                  👤
                </div>
                </div>
                <div className='flex items-center w-full justify-between'>
                  <div className='w-full'>
                    <p className="font-black text-gray-900">
                      {selected.driverName || 'Visitor'}
                    </p>
                    <p className="font-mono text-sm text-gray-500">
                      {selected.plateNumber}
                    </p>
                  </div>
                  {selected.driverStatus && (
                      <Badge variant="outline" className={`border ${selected.driverStatus === "Student" ? "border-blue-700 bg-blue-200 text-blue-700" : "border-purple-700 bg-purple-200 text-purple-700"}`}>
                          {selected.driverStatus}
                      </Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'RFID Tag', val: selected.rfidTag },
                  { label: 'Contact', val: selected.contactNumber || 'N/A' },
                  {
                    label: 'Vehicle Model',
                    val: selected.vehicleModel || 'N/A',
                  },
                  { label: 'Status', val: 'OCCUPIED' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-2.5"
                  >
                    <p className="mb-1 text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                      {item.label}
                    </p>
                    <p
                      className={`font-mono text-sm font-semibold text-gray-900 ${
                        item.label === 'Status' ? 'text-red-600' : ''
                      }`}
                    >
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-center text-xs text-gray-400">
                  Data from Firebase RealTime Database linked to driver profiles
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
