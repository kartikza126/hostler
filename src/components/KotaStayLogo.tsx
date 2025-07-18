import { BedDouble } from 'lucide-react';
import { cn } from '@/lib/utils';

type KotaStayLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function KotaStayLogo({ className, iconClassName, textClassName }: KotaStayLogoProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <BedDouble className={cn("h-8 w-8 text-primary", iconClassName)} />
      <span className={cn("text-3xl font-bold font-headline text-foreground", textClassName)}>
        KotaStay
      </span>
    </div>
  );
}
