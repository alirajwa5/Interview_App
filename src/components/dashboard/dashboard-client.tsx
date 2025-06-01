
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { generateUniqueFact } from '@/ai/flows/generate-unique-fact';
import LoadingSpinner from '@/components/shared/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, CalendarDays, Wand2 } from 'lucide-react';
import QrCodeDisplay from './qr-code-display';
import { Separator } from '../ui/separator';

export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [fact, setFact] = useState<string | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.email && user.uid && user.metadata.creationTime) {
      const fetchFact = async () => {
        setIsLoadingFact(true);
        try {
          const result = await generateUniqueFact({
            email: user.email!,
            userId: user.uid,
            accountCreationDate: new Date(user.metadata.creationTime!).toISOString(),
          });
          setFact(result.fact);
        } catch (error) {
          console.error("Error generating fact:", error);
          setFact("Could not generate a unique fact at this time.");
        }
        setIsLoadingFact(false);
      };
      fetchFact();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : '?';
  const accountCreationDate = user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary">Your Dashboard</h1>
        <p className="text-lg text-muted-foreground">Welcome back, {user.email || 'User'}!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <UserIcon className="mr-2 h-6 w-6 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-medium">{userInitial}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.displayName || 'Valued User'}</p>
                <p className="text-sm text-muted-foreground">Qredentials Member</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center text-sm">
              <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>Joined: {accountCreationDate}</span>
            </div>
             <div className="flex items-center text-sm">
              <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="truncate" title={user.uid}>User ID: {user.uid.substring(0,10)}...</span>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 flex flex-col items-center justify-center">
           <QrCodeDisplay userId={user.uid} />
        </div>
      </div>
      
      <Card className="shadow-lg bg-accent/10 border-accent">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-headline text-accent">
            <Wand2 className="mr-2 h-6 w-6" />
            AI-Powered Unique Fact
          </CardTitle>
          <CardDescription className="text-accent/80">A little something interesting, just for you!</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingFact ? (
             <div className="flex items-center space-x-2">
                <div className="animate-pulse bg-accent/30 h-4 w-4 rounded-full"></div>
                <p className="text-sm text-accent/70">Generating your unique fact...</p>
              </div>
          ) : (
            <p className="text-foreground italic">"{fact || 'No fact available at the moment.'}"</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
