import ByChat from '@/components/chat/ByChat';
import SearchCountry from '@/components/chat/SearchCountry';
// import Chat from '@/components/chat/Chat';
import React from 'react';

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const query = await searchParams;

  const country = query.country;

  if (!country) return <SearchCountry />;

  const response = await fetch(
    // 'https://restcountries.com/v3.1/name/United+States?fullText=true'
    `https://restcountries.com/v3.1/alpha/${country}`
  );
  const data = await response.json();

  return (
    <div>
      <ByChat country={data[0]} />
    </div>
  );
}
