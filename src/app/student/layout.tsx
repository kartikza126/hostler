import { BottomNav } from '@/components/BottomNav';
import { KotaStayLogo } from '@/components/KotaStayLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function StudentLayout({
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
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="Student" data-ai-hint="user avatar" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
