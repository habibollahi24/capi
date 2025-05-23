'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { CountryData } from '../type.chat';
import Image from 'next/image';

export default function SearchCountry() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (input.length < 2) return setCountries([]);

    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${input}?fields=name,cca2`
        );
        const data = await res.json();
        // console.log(data);
        console.log(countries);
        router.refresh();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
        }
      } catch (e) {
        console.log(e);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleSelect = (cca2: string, name: string) => {
    setSelected(name);
    setOpen(false);

    const params = new URLSearchParams(searchParams);
    params.set('country', cca2);
    router.push(`?${params.toString()}`);
  };

  console.log(countries);

  return (
    <div className="flex flex-col items-center gap-y-20 py-18">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-72 justify-between"
          >
            {selected ?? 'Select a country'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <Command>
            <CommandInput
              placeholder="Search countries..."
              value={input}
              onValueChange={setInput}
            />
            <CommandList>
              {isLoading ? (
                <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading countries...
                </div>
              ) : (
                <>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.name.common}
                        value={country.name.common}
                        onSelect={() =>
                          handleSelect(
                            country.cca2,
                            country.name.common
                          )
                        }
                        className={cn(
                          selected === country.name.common &&
                            'bg-muted'
                        )}
                      >
                        {country.name.common}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Image
        src="/chat.png"
        alt="chat image by earth"
        width={300}
        height={300}
        className="rounded-2xl animate-bounce "
        style={{ animationDuration: '2s' }}
      />
    </div>
  );
}
