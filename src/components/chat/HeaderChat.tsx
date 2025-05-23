'use client';

import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import { CountryData } from '../type.chat';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HeaderChat({
  country,
}: {
  country: CountryData;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleNewChat() {
    const params = new URLSearchParams(searchParams);
    const hasCountry = params.has('country');

    if (hasCountry) {
      console.log('cvcxvcxv');
      params.delete('country');
      router.push(`?${params.toString()}`);
    }
  }

  return (
    <header className="flex sticky z-10 top-1 shadow-2xl items-center justify-between p-4  rounded-3xl bg-background">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-border">
          <Image
            src={country.flags.png || '/placeholder.svg'}
            alt={country.name.common}
            fill
            className="object-cover "
            priority
          />
        </div>
        <div>
          <h1 className="font-bold">{country.name.common} </h1>
          <p className="text-xs text-muted-foreground">
            Country Information Assistant
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant="default"
          className="flex items-center gap-1 py-2 rounded-xl bg-indigo-500 px-3 cursor-pointer"
          onClick={handleNewChat}
        >
          New Chat
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 py-2 rounded-xl"
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Online
        </Badge>
      </div>
    </header>
  );
}
