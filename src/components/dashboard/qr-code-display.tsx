
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QrCode as QrCodeIcon } from 'lucide-react';

interface QrCodeDisplayProps {
  userId: string;
}

export default function QrCodeDisplay({ userId }: QrCodeDisplayProps) {
  if (!userId) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(userId)}&format=png&qzone=1&color=3F51B5&bgcolor=E8EAF6`;

  return (
    <Card className="shadow-lg w-full md:w-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <QrCodeIcon className="mr-2 h-6 w-6 text-primary" />
          Your Unique QR Code
        </CardTitle>
        <CardDescription>Share this QR code for easy identification.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="p-2 bg-background rounded-lg border border-border">
          <Image
            src={qrCodeUrl}
            alt="User QR Code"
            width={200}
            height={200}
            priority
            className="rounded-md"
            data-ai-hint="qr code"
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Based on User ID: {userId}</p>
      </CardContent>
    </Card>
  );
}
