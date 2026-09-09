"use client";

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">404 - Page Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The cycle model or page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button className="rounded-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
