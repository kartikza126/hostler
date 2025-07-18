import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Building, User } from 'lucide-react';
import { KotaStayLogo } from '@/components/KotaStayLogo';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col items-center text-center mb-12">
        <KotaStayLogo className="w-48 h-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Welcome to KotaStay</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          Your one-stop solution for finding the perfect hostel near your coaching center in Kota.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <User className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline">For Students</CardTitle>
            <CardDescription>Browse, filter, and find your ideal stay.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-sm text-center text-muted-foreground px-4">
              Explore hundreds of verified hostels with detailed information and genuine reviews.
            </p>
            <Link href="/student" passHref>
              <Button className="w-full" size="lg">I'm a Student</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <Building className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline">For Hostel Owners</CardTitle>
            <CardDescription>List your property and reach thousands of students.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
             <p className="text-sm text-center text-muted-foreground px-4">
              Manage your listings, connect with students, and grow your business with ease.
            </p>
            <Link href="/owner" passHref>
              <Button className="w-full" size="lg">I'm a Hostel Owner</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 w-full max-w-md text-center">
        <p className="text-sm text-muted-foreground mb-4">Or sign in with</p>
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
      </div>
    </div>
  );
}
