'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { CodeXmlIcon, EarthIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ModeToggle';
import MobileNav from './MobileNav';

const pageList = [
  { id: 1, name: 'Chat', href: '/chat', icon: MessageCircle },
  { id: 2, name: 'Explore', href: '/explore', icon: EarthIcon },
  { id: 3, name: 'About', href: '/about', icon: CodeXmlIcon },
];

export default function MainHeader() {
  const segment = useSelectedLayoutSegment();
  return (
    <header className="max-w-4xl mx-auto flex justify-between items-center py-4 font-extralight px-2">
      <Link href="/">
        <h1 className="text-2xl font-medium flex items-center">
          cAPI
          <EarthIcon
            className={cn('stroke-1 size-10', {
              'text-indigo-600': segment === null,
            })}
          />
        </h1>
      </Link>
      <ModeToggle />
      <ul className="hidden md:flex space-x-6 items-center">
        {pageList.map((li) => {
          return (
            <li key={li.id}>
              <Link
                href={li.href}
                className={cn('flex items-center', {
                  'text-indigo-600 font-normal':
                    segment === li.name.toLowerCase(),
                })}
              >
                <li.icon className="size-3 stroke-1" /> {li.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <MobileNav pageList={pageList} />
    </header>
  );
}
