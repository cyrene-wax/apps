'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDriverByPlate } from '@/hooks/display/use-current-scan.hooks';
import { useVerifyCurrentScan } from '@/hooks/display/use-verify-current-scan.hooks';
import { Camera, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { useEffect } from 'react';

export default function DriversDisplay() {
  const { state, activePlate, setState } = useVerifyCurrentScan();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white p-6">
      <div className="mb-2 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-bold tracking-widest text-green-700 uppercase">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Live Plate Verification
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          A.P.P.S.
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Automated Parking Positioning System
        </p>
      </div>

      {state === 'idle' && <IdleState />}
      {state === 'scanning' && <ScanningState plate={activePlate!} />}
      {(state === 'verified' || state === 'not-registered') && (
        <VerifyState plate={activePlate!} onResult={(r) => setState(r)} />
      )}
    </div>
  );
}

function IdleState() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Camera className="h-10 w-10 text-green-500" />
      </div>
      <p className="text-lg font-bold text-gray-600">Waiting for plate scan…</p>
    </div>
  );
}

function ScanningState({ plate }: { plate: string }) {
  return (
    <Card className="w-full max-w-sm border-green-200 shadow-md">
      <CardContent className="flex flex-col items-center gap-4 py-10">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        <div className="rounded-lg bg-gray-900 px-5 py-2 font-mono text-2xl font-black tracking-widest text-white">
          {plate}
        </div>
        <p className="text-sm font-semibold text-gray-500">
          Firebase received plate — checking registry…
        </p>
      </CardContent>
    </Card>
  );
}

function VerifyState({
  plate,
  onResult,
}: {
  plate: string;
  onResult: (r: 'verified' | 'not-registered') => void;
}) {
  const { driver, loading } = useDriverByPlate(plate);

  useEffect(() => {
    if (!loading) onResult(driver ? 'verified' : 'not-registered');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, driver]);

  if (loading) return <ScanningState plate={plate} />;

  if (driver) {
    return (
      <Card className="w-full max-w-lg border-2 border-green-300 shadow-xl">
        
        <CardContent className="p-6">
          {/* Badge */}
          <div className="mb-4 flex justify-between">
            <Badge variant="outline" className={`border ${driver.status === "Student" ? "border-blue-700 bg-blue-200 text-blue-700" : "border-purple-700 bg-purple-200 text-purple-700"}`}>
                {driver.status}
            </Badge>
            <Badge className="border border-green-300 bg-green-100 font-bold tracking-wide text-green-700">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> VERIFIED
            </Badge>
          </div>

          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-green-300 bg-green-100">
              <span className="text-4xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                {driver.driverName}
              </h2>
              <p className="text-sm text-gray-500">Registered Vehicle Owner</p>
              <Badge className="mt-1.5 border border-green-200 bg-green-100 text-xs font-bold text-green-700">
                🟢 REGISTERED & VERIFIED
              </Badge>
            </div>
          </div>

          <Separator className="mb-4 bg-green-100" />

          <div className="grid grid-cols-2 gap-3">
            <DetailBox label="Plate Number">
              <span className="inline-block rounded-md bg-gray-900 px-3 py-1 font-mono text-sm font-black tracking-widest text-white">
                {driver.plateNumber}
              </span>
            </DetailBox>
            <DetailBox label="RFID Tag">
              <span className="font-mono font-bold text-gray-900">
                {driver.rfidTag}
              </span>
            </DetailBox>
            <DetailBox label="Vehicle">
              <span className="text-sm font-bold text-gray-800">
                {driver.vehicleModel}
              </span>
            </DetailBox>
            <DetailBox label="Registered">
              <span className="text-sm font-bold text-gray-800">
                {driver?.registeredAt
                  ? new Date(driver.registeredAt).toLocaleDateString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </DetailBox>
          </div>

          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">
            ✅ This driver is <strong>registered</strong> in the A.P.P.S. system
            and is authorized to use the parking facility.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-2 border-red-200 shadow-xl">
      <CardContent className="p-8 text-center">
        <ShieldX className="mx-auto mb-3 h-14 w-14 text-red-500" />
        <h2 className="mb-2 text-2xl font-black text-red-500">
          Not Registered
        </h2>
        <div className="my-3 inline-block rounded-xl border border-red-200 bg-red-50 px-5 py-2">
          <span className="font-mono text-2xl font-black tracking-widest text-red-500">
            {plate}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          This plate number is <strong>not found</strong> in the A.P.P.S.
          system.
        </p>
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm leading-relaxed">
          <p className="mb-1 font-bold text-red-600">
            ⚠️ Notice to Driver &amp; Guard:
          </p>
          <p className="text-red-800">
            This vehicle is <strong>not authorized</strong> to park in this
            facility. The driver must register their plate number and vehicle
            details with the parking administrator before access can be granted.
          </p>
        </div>
        <p className="mt-4 text-xs font-black tracking-widest text-red-500 uppercase">
          ACCESS DENIED — CONTACT ADMIN TO REGISTER
        </p>
      </CardContent>
    </Card>
  );
}

function DetailBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <p className="mb-1.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}
