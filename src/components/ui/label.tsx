'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function Feature() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-green-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-green-700">A.P.P.S. System</h1>
      <p className="text-lg text-green-600">
        The A.P.P.S. system is currently unavailable. Please contact the
        developer.
      </p>
    </div>
  );
}

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Feature, Label };
