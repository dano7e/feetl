'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
}

export function BackButton({ fallbackHref = '/admin', label = 'Go Back' }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Always navigate to the fallback URL
    router.push(fallbackHref);
  };

  return (
    <Button variant="outline" onClick={handleClick} className="gap-2">
      <ArrowLeft className="h-4 w-4" /> {label}
    </Button>
  );
}
