'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/student', icon: Home, label: 'Home' },
  { href: '/student/search', icon: Search, label: 'Search' },
  { href: '/student/favorites', icon: Heart, label: 'Favorites' },
  { href: '/student/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary',
                  isActive && 'text-primary'
                )}
              />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
