'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CountryData } from '@/components/type.chat';
import { Earth } from 'lucide-react';
import { CustomeTooltip } from '@/components/ui/tooltip';

const continents = [
  'Asia',
  'Europe',
  'Africa',
  'Oceania',
  'Americas',
] as const;

type Region = (typeof continents)[number];

export default function ContinentFilterPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(
    'Asia'
  );

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [independentFilter, setIndependentFilter] =
    useState<string>('');
  const [subregionFilter, setSubregionFilter] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      if (!selectedRegion) return;

      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${selectedRegion}`
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  const uniqueSubregions = Array.from(
    new Set(countries.map((c) => c.subregion).filter(Boolean))
  );

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesIndependence = independentFilter
      ? independentFilter === 'yes'
        ? country.independent === true
        : country.independent === false
      : true;
    const matchesSubregion = subregionFilter
      ? country.subregion === subregionFilter
      : true;

    return matchesSearch && matchesIndependence && matchesSubregion;
  });

  const clearFilters = () => {
    setSearch('');
    setIndependentFilter('');
    setSubregionFilter('');
  };

  return (
    <div className="min-h-screen px-6 pb-16 pt-6  ">
      <h1 className="text-3xl font-extralight mb-6 text-center flex justify-center items-center gap-x-2">
        <Earth className="size-16 stroke-[.5]" /> Explore Countries{' '}
        <br /> by Continent
      </h1>

      <div className="flex flex-wrap max-w-xs mx-auto justify-center gap-3 mb-6">
        {continents.map((region) => (
          <Button
            key={region}
            variant={
              selectedRegion === region ? 'default' : 'outline'
            }
            className="border-none shadow-2xl  px-6 !py-5"
            onClick={() => {
              setSelectedRegion(region);
              clearFilters();
            }}
          >
            {region}
          </Button>
        ))}
      </div>

      {selectedRegion && (
        <div className="flex flex-wrap gap-2 mb-10 items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-red-500 text-xs"
            >
              Clear
            </Button>

            <Input
              placeholder="Search by country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <Select
            value={independentFilter}
            onValueChange={setIndependentFilter}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Independence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Independent</SelectItem>
              <SelectItem value="no">Not Independent</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={subregionFilter}
            onValueChange={setSubregionFilter}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Subregion" />
            </SelectTrigger>
            <SelectContent>
              {uniqueSubregions.map((sub) => (
                <SelectItem key={sub} value={sub!}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {filteredCountries.length === 0 &&
      selectedRegion &&
      !loading ? (
        <p className="text-center font-medium text-xl">
          No country found :(
        </p>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-5  gap-6">
          {loading
            ? Array.from({ length: 16 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full h-30 rounded-xl"
                />
              ))
            : filteredCountries.map((country) => (
                <Link
                  key={country.cca2}
                  href={`/explore/${country.cca2}`}
                >
                  <div className="shadow-2xl rounded-xl p-4 hover:shadow-md transition  text-center cursor-pointer">
                    <div className="relative w-full h-10 mb-4 grayscale-25">
                      <Image
                        src={country.flags.png}
                        alt={`${country.name.common} flag`}
                        fill
                        className="object-contain rounded"
                      />
                    </div>

                    <CustomeTooltip
                      text={country.name.common || 'message'}
                    >
                      <p className="font-semibold text-sm truncate">
                        {country.name.common}
                      </p>
                    </CustomeTooltip>

                    <CustomeTooltip
                      text={country.subregion || 'message'}
                    >
                      {country.subregion && (
                        <p className="text-xs text-muted-foreground truncate">
                          Sub: {country.subregion}
                        </p>
                      )}
                    </CustomeTooltip>
                  </div>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
