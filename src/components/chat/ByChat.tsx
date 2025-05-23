'use client';

import Image from 'next/image';
import { CountryData } from '../type.chat';

import React, { useEffect, useRef, useState } from 'react';

import AskMe from './AskMe';
import { LoaderCircle, UserCircle } from 'lucide-react';
import HeaderChat from './HeaderChat';
import { Message } from './type.chat';

interface CountryChatProps {
  country: CountryData;
}

export default function ByChat({ country }: CountryChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'country',
      content: `Hello! 😍 I'm your country information assistant.\n What would you like to know about ${country.name.common}?.\n You can use the button below to ask questions.`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleQuestionClick = (id: string, text: string) => {
    setIsLoading(true);
    const newMessages: Message[] = [{ from: 'user', content: text }];

    let answer: React.ReactNode = 'is loading :(';

    switch (id) {
      case 'flag':
        answer = (
          <Image
            src={country.flags.png}
            alt={country.flags.alt || 'Flag'}
            className="w-24 h-auto mt-2 rounded-2xl"
            width={200}
            height={200}
          />
        );
        break;
      case 'borders':
        answer = country.borders?.length ? (
          <ul className="grid grid-cols-3 gap-6 ps-4">
            {country.borders.map((code) => (
              <li className="list-none" key={code}>
                {code}
              </li>
            ))}
          </ul>
        ) : (
          'No Border'
        );
        break;
      case 'capital':
        answer = country.capital?.[0] || '  No Capital Find!';
        break;
      case 'currency':
        if (country.currencies) {
          const currencyCode = Object.keys(country.currencies)[0];
          const currency = country.currencies[currencyCode];
          answer = `Currency of ${country.name.common} is (${currency.name}). \n Symbol is: ${currency.symbol}`;
        }

        break;
      case 'languages':
        answer = country.languages
          ? Object.values(country.languages).join('، ')
          : 'have not lang';
        break;
      case 'population':
        answer = country.population
          ? `Population of ${
              country.name.common
            } is ${country.population.toLocaleString()}`
          : `I don't have information about the population of ${country.name.common}.`;
        break;
      case 'independent':
        answer = country.independent ? `Yes It Is ` : `No, it isn't`;
        break;
      case 'side':
        answer = country.car.side
          ? `People drive on the ${country.car.side} side of the road`
          : `I don't have information about the population of ${country.name.common}.`;
        break;
      case 'general':
        let description = '';

        if (country.name.official)
          description += `Official Name: ${country.name.official}\n`;
        if (country.region)
          description += `Region: ${country.region}${
            country.subregion ? `, ${country.subregion}` : ''
          }\n`;
        if (country.area)
          description += `Area: ${country.area.toLocaleString()} sq km\n`;
        if (country.population)
          description += `Population: ${country.population.toLocaleString()}\n`;
        if (country.capital && country.capital.length > 0)
          description += `Capital: ${country.capital[0]}\n`;
        answer = description;
        break;
    }

    newMessages.push({ from: 'country', content: answer });
    setMessages((prev) => [...prev, ...newMessages]);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <main className="flex flex-col max-w-2xl mx-auto bg-background  relative  min-h-screen rounded-3xl ">
      {/* Header */}
      <HeaderChat country={country} />

      {/* Chat section */}
      <div className=" rounded-lg p-2 space-y-2 flex-1  overflow-y-auto mt-12">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-x-1 items-end w-full my-5 ${
              msg.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.from === 'country' && (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-border z-0">
                <Image
                  src={country.flags.png || '/placeholder.svg'}
                  alt={country.name.common}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className={`p-4 text-sm font-normal rounded-2xl shadow-xl whitespace-pre-line ${
                msg.from === 'user'
                  ? 'bg-indigo-400 text-white'
                  : 'bg-secondary'
              } max-w-sm`}
            >
              {isLoading &&
              msg.from === 'country' &&
              messages.length - 1 === idx ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                msg.content
              )}
            </div>
            {msg.from === 'user' && (
              <div>
                <UserCircle className="stroke-1 size-10 opacity-70" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full sticky bottom-4 left-0 ">
        <AskMe
          country={country}
          handleQuestionClick={handleQuestionClick}
        />
      </div>
    </main>
  );
}
