
"use client";

import Link from 'next/link';
import { QrCode, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({ variant: "destructive", title: 'Logout Failed', description: 'Could not log you out. Please try again.' });
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={user ? "/dashboard" : "/login"} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <QrCode className="h-7 w-7" />
          <h1 className="text-2xl font-headline font-bold">Qredentials</h1>
        </Link>
        <div>
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary hover:text-primary/80 hover:bg-primary/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
