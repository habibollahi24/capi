'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { useState } from 'react';
import { CountryData } from '../type.chat';

type Props = {
  country: CountryData;
  handleQuestionClick: (id: string, text: string) => void;
};

export default function AskMe({
  country,
  handleQuestionClick,
}: Props) {
  const [open, setOpen] = useState(false);

  const defaultQuestions = [
    {
      id: 'general',
      text: `General information about ${country.name.common}`,
    },
    {
      id: 'capital',
      text: `What is the capital of ${country.name.common}?`,
    },
    {
      id: 'population',
      text: `What is the population of ${country.name.common}?`,
    },
    {
      id: 'flag',
      text: `Show me the flag of ${country.name.common}`,
    },
    {
      id: 'borders',
      text: `What countries border ${country.name.common}?`,
    },
    {
      id: 'languages',
      text: `What languages are spoken in ${country.name.common}?`,
    },
    {
      id: 'currency',
      text: `What is the currency of ${country.name.common}?`,
    },
    {
      id: 'side',
      text: `Which side of the road do people drive on in ${country.name.common}?`,
    },
    {
      id: 'independent',
      text: `Is ${country.name.common} Is an independent state?`,
    },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex justify-center">
          <Button
            variant={'secondary'}
            className="w-3/4 py-6 shadow-2xl "
          >
            Ask Me
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-w-xl mx-auto ">
        <DrawerHeader>
          <DrawerTitle className="px-2 text-center">
            Choose your question
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <div className="p-2 mb-8 flex flex-col gap-2 ">
          {defaultQuestions.map((question) => (
            <Button
              key={question.id}
              variant={'secondary'}
              className="whitespace-nowrap  shadow-sm !py-5 font-medium"
              onClick={() => {
                handleQuestionClick(question.id, question.text);
                setOpen(false);
              }}
            >
              <span className="ml-2">{question.text}</span>
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
