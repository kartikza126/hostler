'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Building, User, LogIn, TriangleAlert } from 'lucide-react';
import { KotaStayLogo } from '@/components/KotaStayLogo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = (role: 'student' | 'owner') => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    router.push(`/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md">
            <Card className="w-full shadow-lg">
                <CardHeader className="items-center text-center">
                    <KotaStayLogo className="w-48 h-auto mb-4" />
                    <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to continue to KotaStay</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {error && (
                      <Alert variant="destructive">
                        <TriangleAlert className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="student@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <Button className="w-full" size="lg" onClick={() => handleSignIn('student')}>
                        <LogIn className="mr-2" /> Sign in as Student
                      </Button>
                      <Button className="w-full" size="lg" variant="secondary" onClick={() => handleSignIn('owner')}>
                        <LogIn className="mr-2" /> Sign in as Owner
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center">
                        <Separator className="flex-1" />
                        <span className="px-4 text-xs text-muted-foreground">OR</span>
                        <Separator className="flex-1" />
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Sign in with your social account
                    </p>

                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="w-1/2">
                            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.84-4.32 1.84-3.6 0-6.52-3.02-6.52-6.72s2.92-6.72 6.52-6.72c2.03 0 3.36.79 4.29 1.72l2.4-2.4C16.97 4.01 14.95 3 12.48 3c-5.22 0-9.48 4.26-9.48 9.5s4.26 9.5 9.48 9.5c2.58 0 4.76-.84 6.4-2.42 1.7-1.63 2.58-3.92 2.58-6.18 0-.54-.05-.98-.12-1.4H12.48z"></path></svg>
                            Google
                        </Button>
                        <Button variant="outline" className="w-1/2">
                            <Phone className="mr-2 h-4 w-4" />
                            Phone
                        </Button>
                    </div>

                     <p className="text-center text-sm text-muted-foreground mt-4">
                        Don't have an account? <Link href="#" className="text-primary hover:underline">Sign up</Link>
                    </p>

                </CardContent>
            </Card>
        </div>
    </div>
  );
}
