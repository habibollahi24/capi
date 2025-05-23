import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { LucideProps, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  pageList: {
    id: number;
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
  }[];
};

export default function MobileNav({ pageList }: Props) {
  const [open, setOpen] = useState(false);
  const segment = useSelectedLayoutSegment();
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {pageList.map((li) => {
          return (
            <DropdownMenuItem key={li.id}>
              <Link
                href={li.href}
                className={cn('flex items-center', {
                  'text-indigo-600 font-normal':
                    segment === li.name.toLowerCase(),
                })}
                onNavigate={() => setOpen(false)}
              >
                <li.icon className="size-4 stroke-1" />
                {li.name}
              </Link>
            </DropdownMenuItem>
          );
        })}

        {/* <DropdownMenuItem>list 2</DropdownMenuItem>
        <DropdownMenuItem>list 3</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
