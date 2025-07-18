import { KotaStayLogo } from '@/components/KotaStayLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
             <KotaStayLogo iconClassName="h-6 w-6" textClassName="text-2xl" />
          </Link>
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Owner" data-ai-hint="user avatar" />
                <AvatarFallback>O</AvatarFallback>
            </Avatar>
             <Link href="/">
                <Button variant="outline">Sign Out</Button>
             </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
